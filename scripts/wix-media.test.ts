import { describe, expect, it } from "vitest";
import { extractWixMediaUrls, pickBestImageVariants } from "./wix-media";

describe("wix media extraction", () => {
  it("extracts image and video urls from wix html", () => {
    const html = `
      <img src="https://static.wixstatic.com/media/abc~mv2.png/v1/fill/w_324,h_323/file.png" />
      <img src="https://static.wixstatic.com/media/abc~mv2.png/v1/fill/w_648,h_646/file.png" />
      <video src="https://video.wixstatic.com/video/demo/1080p/mp4/file.mp4"></video>
    `;

    const media = extractWixMediaUrls(html);
    expect(media.images.length).toBe(2);
    expect(media.videos.length).toBe(1);
  });

  it("keeps best variant per wix asset id", () => {
    const urls = [
      "https://static.wixstatic.com/media/abc~mv2.png/v1/fill/w_324,h_323/file.png",
      "https://static.wixstatic.com/media/abc~mv2.png/v1/fill/w_648,h_646/file.png",
      "https://static.wixstatic.com/media/def~mv2.png/v1/fill/w_200,h_200/file.png"
    ];

    const best = pickBestImageVariants(urls);
    expect(best.length).toBe(2);
    expect(best.find((u) => u.includes("abc~mv2"))).toContain("w_648");
  });
});
