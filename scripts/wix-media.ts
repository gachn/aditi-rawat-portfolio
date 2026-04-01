export function extractWixMediaUrls(html: string): { images: string[]; videos: string[] } {
  const imageRegex =
    /https:\/\/static\.wixstatic\.com\/media\/[^"'\\s)]+(?:png|jpg|jpeg|webp)[^"'\\s)]*/gi;
  const videoRegex =
    /https:\/\/video\.wixstatic\.com\/[^"'\\s)]+(?:mp4|mov|webm)[^"'\\s)]*/gi;

  const images = Array.from(new Set(html.match(imageRegex) ?? [])).map(cleanUrl);
  const videos = Array.from(new Set(html.match(videoRegex) ?? [])).map(cleanUrl);

  return { images, videos };
}

export function pickBestImageVariants(urls: string[]): string[] {
  const byAsset = new Map<string, { url: string; width: number }>();

  for (const raw of urls) {
    const url = cleanUrl(raw);
    const assetIdMatch = url.match(/\/media\/([^/]+)/);
    const widthMatch = url.match(/w_(\d+)/);
    if (!assetIdMatch) continue;
    const assetId = assetIdMatch[1];
    const width = widthMatch ? Number(widthMatch[1]) : 0;

    const existing = byAsset.get(assetId);
    if (!existing || width > existing.width) {
      byAsset.set(assetId, { url, width });
    }
  }

  return Array.from(byAsset.values()).map((v) => v.url);
}

function cleanUrl(url: string): string {
  return url.replace(/[,\s]+$/g, "");
}
