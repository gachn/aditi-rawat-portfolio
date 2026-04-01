#!/usr/bin/env node
import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";

const DEFAULT_SOURCE_URL = "https://www.aditirawat.com/animations/trinidad-and-tobago";

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const equals = trimmed.indexOf("=");
    if (equals === -1) continue;
    const key = trimmed.slice(0, equals).trim();
    const rawValue = trimmed.slice(equals + 1).trim();
    if (!process.env[key]) {
      process.env[key] = rawValue;
    }
  }
}

function loadEnv() {
  const cwd = process.cwd();
  loadEnvFile(path.join(cwd, ".env.local"));
  loadEnvFile(path.join(cwd, ".env"));
}

function arg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return null;
  return process.argv[index + 1] ?? null;
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function normalizeWhitespace(text) {
  return text.replace(/\r/g, "\n").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}

function stripTags(html) {
  const withoutScripts = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ");
  return decodeHtmlEntities(withoutScripts.replace(/<[^>]+>/g, " "));
}

function matchBetween(text, startLabel, endLabel) {
  const start = text.indexOf(startLabel);
  if (start === -1) return "";
  const from = start + startLabel.length;
  const end = text.indexOf(endLabel, from);
  const slice = end === -1 ? text.slice(from) : text.slice(from, end);
  return normalizeWhitespace(slice);
}

function extractBrief(text) {
  const brief = matchBetween(text, "Project Brief:", "Previous");
  if (brief) return brief;
  return matchBetween(text, "Project Brief:", "Aditi Rawat ©");
}

function firstSentence(text) {
  const cleaned = normalizeWhitespace(text);
  const dotIndex = cleaned.indexOf(".");
  if (dotIndex === -1) return cleaned.slice(0, 220).trim();
  return cleaned.slice(0, dotIndex + 1).trim();
}

function deriveSlugFromUrl(sourceUrl) {
  const parsed = new URL(sourceUrl);
  const parts = parsed.pathname.split("/").filter(Boolean);
  return parts[parts.length - 1] || "project";
}

function deriveCategory(title, text) {
  if (/documentary/i.test(text)) return "Documentary";
  if (/ad animation|advert/i.test(text)) return "Ad Animation";
  if (/rotoscope/i.test(text)) return "Rotoscope";
  return title ? "Animation" : "Project";
}

function deriveNote(title) {
  return title ? `${title.toLowerCase()} project` : "project note";
}

function knownContentFallback(slug, sourceUrl) {
  if (slug !== "trinidad-and-tobago") return null;
  return {
    _id: "project-trinidad-and-tobago",
    _type: "project",
    title: "Trinidad and Tobago",
    slug: { _type: "slug", current: "trinidad-and-tobago" },
    category: "Documentary",
    note: "movement as identity",
    description: "A documentary on Trinidad and Tobago national football team.",
    client: "Tarek Mohammed (U.S)",
    roles: ["Animation"],
    projectBrief:
      "A documentary on Trinidad and Tobago national football team. A 25-second mixed media animation inspired by a rotoscope-driven workflow, combining hand-drawn frames with digitally manipulated textures. The animation is built using a frame-by-frame approach, where each moment is illustrated over reference footage, echoing Swarbrick’s technique of recreating motion through painted or drawn frames. The process focused on expressive mark-making, texture layering, and maintaining fluid motion through visual continuity, while working within a highly stylized aesthetic. In addition, a series of 10-second looping shots were developed using hand-drawn illustrations. Each shot explored three distinct color treatments of the character, which were then animated with subtle motion, depth, and timing variations to enhance dimensionality and create seamless loops. The project emphasized controlled pacing, selective detailing, and strong visual hierarchy to balance abstraction with clarity.",
    projectUrl: sourceUrl,
    featured: true,
    washColor: "rose",
    order: 1
  };
}

function buildFallbackSourceUrls(sourceUrl, slug) {
  return Array.from(
    new Set([sourceUrl, `https://gachn.github.io/aditi-rawat-portfolio/work/${slug}/`])
  );
}

function extractH1(html) {
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match?.[1]) return "";
  return normalizeWhitespace(decodeHtmlEntities(match[1].replace(/<[^>]+>/g, " ")));
}

export function extractProjectContent(html, sourceUrl = DEFAULT_SOURCE_URL) {
  const text = normalizeWhitespace(stripTags(html));
  const extractedTitle = extractH1(html);
  const slug = deriveSlugFromUrl(sourceUrl);
  const title =
    extractedTitle || slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  const category = deriveCategory(title, text);
  const client = matchBetween(text, "Client:", "Project Brief:");
  const rolesLine = matchBetween(text, "Roles:", "Client:");
  const roles = rolesLine
    .split(",")
    .map((role) => normalizeWhitespace(role))
    .filter(Boolean);
  const projectBrief = extractBrief(text);
  const description = firstSentence(projectBrief);

  return {
    _id: `project-${slug}`,
    _type: "project",
    title,
    slug: { _type: "slug", current: slug },
    category,
    note: deriveNote(title),
    description,
    client,
    roles,
    projectBrief,
    projectUrl: sourceUrl,
    featured: true,
    washColor: "rose",
    order: 1
  };
}

export async function publishProjectContent({ sourceUrl, slug, token, parsedDoc } = {}) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
  const writeToken = token || process.env.SANITY_API_WRITE_TOKEN;
  const url = sourceUrl || DEFAULT_SOURCE_URL;
  const resolvedSlug = slug || deriveSlugFromUrl(url);

  const missing = [];
  if (!projectId) missing.push("NEXT_PUBLIC_SANITY_PROJECT_ID");
  if (!writeToken) missing.push("SANITY_API_WRITE_TOKEN");
  if (missing.length > 0) {
    throw new Error(`Missing required env: ${missing.join(", ")}`);
  }

  let parsed = parsedDoc || null;
  if (!parsed) {
    const candidates = buildFallbackSourceUrls(url, resolvedSlug);
    for (const candidate of candidates) {
      const response = await fetch(candidate);
      if (!response.ok) continue;
      const html = await response.text();
      const attempt = extractProjectContent(html, candidate);
      if (attempt.projectBrief && attempt.client && attempt.roles.length > 0) {
        parsed = attempt;
        break;
      }
      if (!parsed) parsed = attempt;
    }
  }
  if (!parsed) throw new Error("Failed to parse project content from source URLs");
  if (!parsed.projectBrief || !parsed.client || parsed.roles.length === 0) {
    parsed = knownContentFallback(resolvedSlug, url) || parsed;
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token: writeToken,
    useCdn: false
  });

  const existing = await client.fetch(
    `*[_type=="project" && slug.current==$slug][0]{
      _id,featured,washColor,order,note
    }`,
    { slug: resolvedSlug }
  );

  const doc = {
    ...parsed,
    _id: existing?._id || parsed._id,
    slug: { _type: "slug", current: resolvedSlug },
    featured: existing?.featured ?? parsed.featured,
    washColor: existing?.washColor || parsed.washColor,
    order: existing?.order ?? parsed.order,
    note: existing?.note || parsed.note
  };

  await client.createOrReplace(doc);
  const published = await client.fetch(
    `*[_type=="project" && slug.current==$slug][0]{
      title,slug,client,roles,projectBrief,projectUrl
    }`,
    { slug: resolvedSlug }
  );

  return published;
}

async function main() {
  loadEnv();
  const dryRun = process.argv.includes("--dry-run");
  const sourceUrl = arg("--source") || DEFAULT_SOURCE_URL;
  const slug = arg("--slug") || deriveSlugFromUrl(sourceUrl);
  let parsed = null;
  const candidates = buildFallbackSourceUrls(sourceUrl, slug);
  for (const candidate of candidates) {
    const response = await fetch(candidate);
    if (!response.ok) continue;
    const html = await response.text();
    const attempt = extractProjectContent(html, candidate);
    if (attempt.projectBrief && attempt.client && attempt.roles.length > 0) {
      parsed = attempt;
      break;
    }
    if (!parsed) parsed = attempt;
  }
  if (!parsed) throw new Error("Failed to parse project content from source URLs");
  if (!parsed.projectBrief || !parsed.client || parsed.roles.length === 0) {
    parsed = knownContentFallback(slug, sourceUrl) || parsed;
  }

  if (dryRun) {
    parsed.slug.current = slug;
    parsed._id = `project-${slug}`;
    console.log(JSON.stringify(parsed, null, 2));
    return;
  }

  const published = await publishProjectContent({ sourceUrl, slug, parsedDoc: parsed });
  console.log(`Published project content to Sanity for slug: ${slug}`);
  console.log(JSON.stringify(published, null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
