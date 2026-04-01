import { getSanityClient } from "./client";
import { fallbackHomePageData } from "./fallbackData";
import { HOME_PAGE_QUERY } from "./queries";
import type { HomePageData } from "./types";

export async function fetchHomePageData(preview = false): Promise<HomePageData> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return fallbackHomePageData;
  }

  try {
    const sanityClient = getSanityClient();
    if (!sanityClient) {
      return fallbackHomePageData;
    }

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
  } catch {
    return fallbackHomePageData;
  }
}
