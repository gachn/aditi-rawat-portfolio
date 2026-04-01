import type { AboutSectionData } from "@/lib/sanity/types";

export function AboutSection({ data }: { data: AboutSectionData }) {
  return (
    <section id="about" className="section">
      <div className="container">
        <p className="muted">{data.label}</p>
        <h2 style={{ fontSize: "2.5rem", margin: "0 0 1rem" }}>
          {data.titleTop} <em style={{ color: "var(--rose)" }}>{data.titleEmphasis}</em>
        </h2>
        <p>{data.marginNote}</p>
        {data.paragraphs.map((paragraph) => (
          <p key={paragraph} className="muted">
            {paragraph}
          </p>
        ))}
        <p>
          <strong>p.s.</strong> {data.postscript}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {data.skills.map((skill) => (
            <span
              key={skill}
              style={{ border: "1px solid var(--rule)", padding: "0.25rem 0.5rem" }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
