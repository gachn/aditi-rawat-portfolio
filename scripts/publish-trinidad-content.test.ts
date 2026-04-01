import { describe, expect, it } from "vitest";
import { extractProjectContent } from "./publish-trinidad-content.mjs";

describe("publish project content parser", () => {
  it("extracts generic project fields from project page html", () => {
    const html = `
      <h1>Trinidad and Tobago</h1>
      <h2>Documentary</h2>
      <p><strong>Roles:</strong> Animation</p>
      <p><strong>Client:</strong> Tarek Mohammed (U.S)</p>
      <p><strong>Project Brief:</strong></p>
      <p>A documentary on Trinidad and Tobago national football team.</p>
      <p>A 25-second mixed media animation inspired by a rotoscope-driven workflow, combining hand-drawn frames with digitally manipulated textures.</p>
      <p>The process focused on expressive mark-making, texture layering, and maintaining fluid motion.</p>
      <p>Previous</p>
    `;

    const parsed = extractProjectContent(html);

    expect(parsed.slug.current).toBe("trinidad-and-tobago");
    expect(parsed.title).toBe("Trinidad and Tobago");
    expect(parsed.category).toBe("Documentary");
    expect(parsed.client).toBe("Tarek Mohammed (U.S)");
    expect(parsed.roles).toEqual(["Animation"]);
    expect(parsed.note).toBe("trinidad and tobago project");
    expect(parsed.projectBrief).toContain("A documentary on Trinidad and Tobago national football team.");
    expect(parsed.projectUrl).toBe("https://www.aditirawat.com/animations/trinidad-and-tobago");
    expect(parsed.description).toBe("A documentary on Trinidad and Tobago national football team.");
  });

  it("derives slug from any source url", () => {
    const html = `
      <h1>Proposal Memory Animatic</h1>
      <p><strong>Roles:</strong> Direction, Animation</p>
      <p><strong>Client:</strong> Vania</p>
      <p><strong>Project Brief:</strong></p>
      <p>This animatic captured a proposal day.</p>
      <p>Previous</p>
    `;

    const parsed = extractProjectContent(
      html,
      "https://www.aditirawat.com/animations/proposal-memory-animatic"
    );

    expect(parsed.slug.current).toBe("proposal-memory-animatic");
    expect(parsed.roles).toEqual(["Direction", "Animation"]);
    expect(parsed.client).toBe("Vania");
    expect(parsed.title).toBe("Proposal Memory Animatic");
  });
});
