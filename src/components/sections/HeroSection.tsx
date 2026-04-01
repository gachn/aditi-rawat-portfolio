import React from "react";
import type { HomeHero } from "@/lib/sanity/types";

export function HeroSection({ data }: { data: HomeHero }) {
  return (
    <section className="section" style={{ borderTop: "none", minHeight: "70vh" }}>
      <div className="container">
        <p className="muted">{data.dateline}</p>
        <p>{data.salutation}</p>
        <h1 style={{ fontSize: "4rem", lineHeight: 1, margin: "1rem 0" }}>
          {data.headlineTop}
          <br />
          <em style={{ color: "var(--rose)" }}>{data.headlineEmphasis}</em>
          <br />
          {data.headlineBottom}
        </h1>
        <p className="muted">{data.headlineSubline}</p>
        <p style={{ maxWidth: 640 }}>{data.opening}</p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <a href={data.ctaPrimaryHref}>{data.ctaPrimaryLabel}</a>
          <a href={data.ctaSecondaryHref}>{data.ctaSecondaryLabel}</a>
        </div>
      </div>
    </section>
  );
}
