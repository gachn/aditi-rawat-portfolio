import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("ProjectPage", () => {
  it("does not include the view original link label in the page template", () => {
    const pagePath = path.resolve(process.cwd(), "src/app/work/[slug]/page.tsx");
    const content = fs.readFileSync(pagePath, "utf8");
    expect(content).not.toContain("View original link");
  });
});
