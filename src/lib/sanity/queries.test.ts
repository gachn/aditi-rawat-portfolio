import { describe, expect, it } from "vitest";
import { HOME_PAGE_QUERY } from "./queries";

describe("sanity queries", () => {
  it("contains required sections for homepage", () => {
    expect(HOME_PAGE_QUERY).toContain("siteSettings");
    expect(HOME_PAGE_QUERY).toContain("homeHero");
    expect(HOME_PAGE_QUERY).toContain("projects");
    expect(HOME_PAGE_QUERY).toContain("about");
    expect(HOME_PAGE_QUERY).toContain("contact");
    expect(HOME_PAGE_QUERY).toContain("seo");
  });

  it("includes only required project media fields", () => {
    expect(HOME_PAGE_QUERY).not.toContain("coverImage");
    expect(HOME_PAGE_QUERY).toContain("gallery");
    expect(HOME_PAGE_QUERY).toContain("videoUrl");
    expect(HOME_PAGE_QUERY).toContain("videoFile");
  });
});
