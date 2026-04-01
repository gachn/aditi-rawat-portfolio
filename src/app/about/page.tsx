import { AboutSection } from "@/components/sections/AboutSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { TopNav } from "@/components/sections/TopNav";
import { fetchHomePageData } from "@/lib/sanity/fetchHomePageData";

export default async function AboutPage() {
  const data = await fetchHomePageData(false);

  return (
    <main>
      <TopNav siteSettings={data.siteSettings} />
      <AboutSection data={data.about} />
      <SiteFooter siteSettings={data.siteSettings} />
    </main>
  );
}
