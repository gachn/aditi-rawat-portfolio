"use client";

import React, { useEffect, useRef } from "react";
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
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || sectionRef.current === null) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = sectionRef.current.querySelectorAll(".reveal, .reveal-fast");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" className="work-section section" ref={sectionRef}>
      <div className="container">
        <div className="work-kicker reveal-fast">
          <span className="kicker-line" />
          <span className="kicker-text">selected work</span>
          <span className="kicker-line" />
        </div>

        <div className="work-header-row reveal">
          <h2 className="work-section-title">
            {title}
            <br />
            <em>{emphasizedTitle}</em>
          </h2>
          <Link href={viewAllHref} className="view-all-link">
            full portfolio →
          </Link>
        </div>

        <div className="work-grid reveal">
          {projects.map((project, index) => {
            const isFeatured = project.featured || index === 0;
            const washClass = project.washColor ? `wash-${project.washColor}` : "wash-rose";

            return (
              <Link
                key={project._id}
                href={`/work/${project.slug}`}
                className={`work-card ${isFeatured ? "featured" : ""}`.trim()}
              >
                <div className={`wash ${washClass}`} />
                <div className="work-card-inner">
                  <span className="card-type">{project.category}</span>
                  <h3 className={`card-title ${isFeatured ? "" : "card-title-sm"}`.trim()}>
                    {project.title}
                  </h3>
                  <p className="card-note">{project.note}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
