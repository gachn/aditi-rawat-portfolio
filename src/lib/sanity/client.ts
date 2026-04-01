import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "7pwbbr1l";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
const token = process.env.SANITY_API_READ_TOKEN;

export function getSanityClient() {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
    perspective: "published"
  });
}
