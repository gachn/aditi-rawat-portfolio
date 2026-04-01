#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

function arg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return null;
  return process.argv[index + 1] ?? null;
}

function cleanUrl(url) {
  return url.replace(/[,\s]+$/g, "");
}

function extractWixMediaUrls(html) {
  const imageRegex =
    /https:\/\/static\.wixstatic\.com\/media\/[^"'\s)]+(?:png|jpg|jpeg|webp)[^"'\s)]*/gi;
  const videoRegex =
    /https:\/\/video\.wixstatic\.com\/[^"'\s)]+(?:mp4|mov|webm)[^"'\s)]*/gi;
  return {
    images: Array.from(new Set(html.match(imageRegex) ?? [])).map(cleanUrl),
    videos: Array.from(new Set(html.match(videoRegex) ?? [])).map(cleanUrl)
  };
}

function pickBestImageVariants(urls) {
  const byAsset = new Map();
  for (const raw of urls) {
    const url = cleanUrl(raw);
    const assetIdMatch = url.match(/\/media\/([^/]+)/);
    const widthMatch = url.match(/w_(\d+)/);
    if (!assetIdMatch) continue;
    const assetId = assetIdMatch[1];
    const width = widthMatch ? Number(widthMatch[1]) : 0;
    const existing = byAsset.get(assetId);
    if (!existing || width > existing.width) byAsset.set(assetId, { url, width });
  }
  return Array.from(byAsset.values()).map((v) => v.url);
}

async function downloadFile(url, filePath) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed ${response.status} for ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(filePath, bytes);
}

async function main() {
  const slug = arg("--slug");
  const sourceUrl = arg("--source");
  if (!slug || !sourceUrl) {
    throw new Error("Usage: npm run migrate:wix -- --slug <slug> --source <url>");
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) {
    throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in env");
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false
  });

  const projectDoc = await client.fetch(
    `*[_type=="project" && slug.current==$slug][0]{_id,title,slug,projectBrief}`,
    { slug }
  );
  if (!projectDoc?._id) throw new Error(`Project doc not found for slug: ${slug}`);

  const html = await (await fetch(sourceUrl)).text();
  const media = extractWixMediaUrls(html);
  const bestImages = pickBestImageVariants(media.images);
  const outputDir = path.join(process.cwd(), "assets", slug);
  fs.mkdirSync(outputDir, { recursive: true });

  const downloadedImages = [];
  for (let i = 0; i < bestImages.length; i += 1) {
    const localPath = path.join(outputDir, `image-${i + 1}.png`);
    await downloadFile(bestImages[i], localPath);
    downloadedImages.push(localPath);
  }

  const imageAssetIds = [];
  for (const filePath of downloadedImages) {
    const stream = fs.createReadStream(filePath);
    const asset = await client.assets.upload("image", stream, {
      filename: path.basename(filePath)
    });
    imageAssetIds.push(asset._id);
  }

  let videoAssetId = null;
  let videoFileUrl = null;
  if (media.videos[0]) {
    const videoPath = path.join(outputDir, "video-1.mp4");
    await downloadFile(media.videos[0], videoPath);
    const stream = fs.createReadStream(videoPath);
    const videoAsset = await client.assets.upload("file", stream, {
      filename: path.basename(videoPath),
      contentType: "video/mp4"
    });
    videoAssetId = videoAsset._id;
    videoFileUrl = media.videos[0];
  }

  const patch = {
    coverImage: imageAssetIds[0]
      ? {
          _type: "image",
          asset: { _type: "reference", _ref: imageAssetIds[0] },
          alt: `${projectDoc.title} cover image`
        }
      : undefined,
    gallery: imageAssetIds.slice(1).map((id, idx) => ({
      _type: "image",
      _key: `img-${idx + 1}`,
      asset: { _type: "reference", _ref: id },
      alt: `${projectDoc.title} gallery image ${idx + 1}`
    })),
    videoFile: videoAssetId
      ? { _type: "file", asset: { _type: "reference", _ref: videoAssetId } }
      : undefined
  };

  await client.patch(projectDoc._id).set(patch).commit();

  console.log("Migrated project:", slug);
  console.log("Downloaded images:", downloadedImages.length);
  console.log("Uploaded video:", Boolean(videoAssetId), videoFileUrl || "");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
