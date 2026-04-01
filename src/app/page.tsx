import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { TopNav } from "@/components/sections/TopNav";
import { WorkSection } from "@/components/sections/WorkSection";
import { fetchHomePageData } from "@/lib/sanity/fetchHomePageData";

export default async function HomePage() {
  const data = await fetchHomePageData(false);

  return (
    <main>
      <TopNav siteSettings={data.siteSettings} />
      <HeroSection data={data.homeHero} />

      <section style={{ background: "var(--ink)", color: "var(--paper)", padding: "2rem 0" }}>
        <div className="container">
          <p style={{ margin: 0 }}>
            "Can't draw, but I trace and manipulate like a pro - a work in progress,
            forever evolving."
          </p>
        </div>
      </section>

      <WorkSection
        title={data.workTitle}
        emphasizedTitle={data.workEmphasizedTitle}
        viewAllHref={data.workViewAllHref}
        projects={data.projects}
      />
      <AboutSection data={data.about} />
      <ContactSection data={data.contact} />
      <SiteFooter siteSettings={data.siteSettings} />
    </main>
  );
}
