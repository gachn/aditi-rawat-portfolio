import { SiteFooter } from "@/components/sections/SiteFooter";
import { TopNav } from "@/components/sections/TopNav";
import { fetchHomePageData } from "@/lib/sanity/fetchHomePageData";
import { fetchProjectBySlug, fetchProjectSlugs } from "@/lib/sanity/fetchProjectData";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ProjectPageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

function getEmbedVideoUrl(videoUrl?: string) {
  if (!videoUrl) return null;
  if (videoUrl.includes("youtube.com/watch?v=")) {
    const id = videoUrl.split("v=")[1]?.split("&")[0];
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }
  if (videoUrl.includes("youtu.be/")) {
    const id = videoUrl.split("youtu.be/")[1]?.split("?")[0];
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }
  if (videoUrl.includes("vimeo.com/")) {
    const id = videoUrl.split("vimeo.com/")[1]?.split("?")[0];
    return id ? `https://player.vimeo.com/video/${id}` : null;
  }
  return null;
}

export async function generateStaticParams() {
  const slugs = await fetchProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  const homeData = await fetchHomePageData(false);
  if (!project) {
    return {
      title: "Project Not Found"
    };
  }

  return {
    title: `${project.title} | ${homeData.siteSettings.siteTitle}`,
    description: project.description || project.note
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  const homeData = await fetchHomePageData(false);

  if (!project) {
    notFound();
  }
  const embedUrl = getEmbedVideoUrl(project.videoUrl);

  return (
    <main>
      <TopNav siteSettings={homeData.siteSettings} />
      <section className="section" style={{ borderTop: "none" }}>
        <div className="container">
          <p className="muted" style={{ textTransform: "uppercase", fontSize: 12 }}>
            {project.category}
          </p>
          <h1 style={{ fontSize: "3rem", margin: "0.25rem 0 1rem" }}>{project.title}</h1>
          <p className="muted" style={{ fontSize: "1.1rem", maxWidth: 760 }}>
            {project.description || project.note}
          </p>
          {project.client ? (
            <p style={{ marginTop: "1rem" }}>
              <strong>Client:</strong> {project.client}
            </p>
          ) : null}
          {project.roles?.length ? (
            <p>
              <strong>Roles:</strong> {project.roles.join(", ")}
            </p>
          ) : null}
          {project.projectBrief ? (
            <p className="muted" style={{ maxWidth: 900, whiteSpace: "pre-line" }}>
              {project.projectBrief}
            </p>
          ) : null}

          {embedUrl ? (
            <div style={{ marginTop: "1.5rem", maxWidth: 960 }}>
              <iframe
                src={embedUrl}
                title={`${project.title} video`}
                style={{ width: "100%", minHeight: 420, border: "1px solid var(--rule)" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : null}

          {!embedUrl && project.videoFileUrl ? (
            <video
              controls
              style={{ width: "100%", maxWidth: 960, marginTop: "1.5rem" }}
              src={project.videoFileUrl}
            >
              <track kind="captions" srcLang="en" label="English captions" />
            </video>
          ) : null}

          {project.gallery?.length ? (
            <div
              style={{
                marginTop: "1rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1rem"
              }}
            >
              {project.gallery.map((image) => (
                <img
                  key={image.url}
                  src={image.url}
                  alt={image.alt || `${project.title} gallery image`}
                  style={{ width: "100%", border: "1px solid var(--rule)" }}
                />
              ))}
            </div>
          ) : null}

          <p style={{ marginTop: "1.5rem" }}>
            <strong>Project note:</strong> {project.note}
          </p>
        </div>
      </section>
      <SiteFooter siteSettings={homeData.siteSettings} />
    </main>
  );
}
