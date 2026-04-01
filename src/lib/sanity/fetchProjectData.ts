import { getSanityClient } from "./client";
import { fallbackHomePageData } from "./fallbackData";
import { PROJECT_BY_SLUG_QUERY, PROJECT_SLUGS_QUERY } from "./queries";
import type { ProjectItem } from "./types";

export async function fetchProjectBySlug(slug: string): Promise<ProjectItem | null> {
  try {
    const client = getSanityClient();
    const project = await client.fetch<ProjectItem | null>(PROJECT_BY_SLUG_QUERY, { slug });
    if (project) {
      return project;
    }
  } catch (error) {
    console.error("Sanity project fetch failed, using fallback", error);
  }

  return fallbackHomePageData.projects.find((project) => project.slug === slug) ?? null;
}

export async function fetchProjectSlugs(): Promise<string[]> {
  try {
    const client = getSanityClient();
    const rows = await client.fetch<Array<{ slug: string }>>(PROJECT_SLUGS_QUERY);
    if (rows?.length) {
      return rows.map((row) => row.slug).filter(Boolean);
    }
  } catch (error) {
    console.error("Sanity project slugs fetch failed, using fallback", error);
  }

  return fallbackHomePageData.projects.map((project) => project.slug);
}
