import { getSanityClient } from "./client";
import { fallbackHomePageData } from "./fallbackData";
import { HOME_PAGE_QUERY } from "./queries";
import type { HomePageData } from "./types";

export async function fetchHomePageData(preview = false): Promise<HomePageData> {
  try {
    const sanityClient = getSanityClient();
    const data = await sanityClient.fetch<HomePageData>(HOME_PAGE_QUERY, {}, {
      perspective: preview ? "previewDrafts" : "published"
    });
    if (!data) {
      return fallbackHomePageData;
    }
    return {
      ...fallbackHomePageData,
      ...data
    };
  } catch (error) {
    console.error("Sanity fetch failed, using fallback data", error);
    return fallbackHomePageData;
  }
}
