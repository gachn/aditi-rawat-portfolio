import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroSection } from "./HeroSection";
import { WorkSection } from "./WorkSection";

describe("home sections", () => {
  it("renders hero section content", () => {
    render(
      <HeroSection
        data={{
          dateline: "India, 2026",
          salutation: "dear world,",
          headlineTop: "I bring",
          headlineEmphasis: "things",
          headlineBottom: "to life.",
          headlineSubline: "frame by frame",
          opening:
            "My name is Aditi. I am an animator and illustrator from India.",
          ctaPrimaryLabel: "read my work",
          ctaPrimaryHref: "#work",
          ctaSecondaryLabel: "write back",
          ctaSecondaryHref: "#contact",
          annotation: "relentlessly curious"
        }}
      />
    );

    expect(screen.getByText("dear world,")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /I bring/i })).toBeInTheDocument();
    expect(screen.getByText("things")).toBeInTheDocument();
    expect(screen.getByText("read my work")).toBeInTheDocument();
  });

  it("renders work cards", () => {
    render(
      <WorkSection
        title="things I've"
        emphasizedTitle="made move"
        viewAllHref="https://www.aditirawat.com/projects"
        projects={[
          {
            _id: "1",
            title: "Trinidad and Tobago",
            slug: "trinidad-and-tobago",
            category: "rotoscope",
            note: "movement as identity",
            projectUrl: "https://www.example.com",
            featured: true,
            washColor: "rose",
            order: 1
          }
        ]}
      />
    );

    expect(screen.getByText("Trinidad and Tobago")).toBeInTheDocument();
    expect(screen.getByText("rotoscope")).toBeInTheDocument();
    const cardLink = screen.getByRole("link", { name: /Trinidad and Tobago/i });
    expect(cardLink).toHaveAttribute("href", "/work/trinidad-and-tobago");
    expect(cardLink).toHaveClass("work-card");
    expect(cardLink).toHaveClass("featured");
    expect(screen.getByText("selected work")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /full portfolio/i })).toHaveClass("view-all-link");
  });
});
