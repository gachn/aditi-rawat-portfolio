import { SiteFooter } from "@/components/sections/SiteFooter";
import { TopNav } from "@/components/sections/TopNav";
import { fetchHomePageData } from "@/lib/sanity/fetchHomePageData";
import Link from "next/link";

export default async function WorkPage() {
  const data = await fetchHomePageData(false);

  return (
    <main>
      <TopNav siteSettings={data.siteSettings} />
      <section className="section" style={{ borderTop: "none" }}>
        <div className="container">
          <h1 style={{ fontSize: "3rem", margin: 0 }}>
            {data.workTitle} <em style={{ color: "var(--rose)" }}>{data.workEmphasizedTitle}</em>
          </h1>
          <p className="muted" style={{ marginTop: "0.75rem" }}>
            All project pages now live inside this website.
          </p>
          <div
            style={{
              marginTop: "2rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem"
            }}
          >
            {data.projects.map((project) => (
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
                <h2 style={{ margin: "0.25rem 0 0.5rem", fontSize: "1.35rem" }}>{project.title}</h2>
                <p className="muted" style={{ margin: 0 }}>
                  {project.note}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter siteSettings={data.siteSettings} />
    </main>
  );
}
