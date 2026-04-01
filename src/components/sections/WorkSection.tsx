import React from "react";
import type { ProjectItem } from "@/lib/sanity/types";
import Link from "next/link";

interface WorkSectionProps {
  title: string;
  emphasizedTitle: string;
  viewAllHref: string;
  projects: ProjectItem[];
}

export function WorkSection({
  title,
  emphasizedTitle,
  viewAllHref,
  projects
}: Readonly<WorkSectionProps>) {
  return (
    <section id="work" className="section">
      <div className="container">
        <div
          style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}
        >
          <h2 style={{ fontSize: "2.5rem", margin: 0 }}>
            {title}
            <br />
            <em style={{ color: "var(--rose)" }}>{emphasizedTitle}</em>
          </h2>
          <Link href={viewAllHref}>
            full portfolio
          </Link>
        </div>

        <div
          style={{
            marginTop: "2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem"
          }}
        >
          {projects.map((project) => (
            <Link
              key={project._id}
              href={`/work/${project.slug}`}
              style={{
                border: "1px solid var(--rule)",
                padding: "1rem",
                textDecoration: "none",
                background: "var(--paper2)"
              }}
            >
              <div className="muted" style={{ textTransform: "uppercase", fontSize: 12 }}>
                {project.category}
              </div>
              <h3 style={{ margin: "0.25rem 0 0.5rem" }}>{project.title}</h3>
              <p className="muted" style={{ margin: 0 }}>
                {project.note}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
