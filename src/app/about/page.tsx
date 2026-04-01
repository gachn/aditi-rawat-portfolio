import { AboutSection } from "@/components/sections/AboutSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { TopNav } from "@/components/sections/TopNav";
import { fetchHomePageData } from "@/lib/sanity/fetchHomePageData";
import { draftMode } from "next/headers";

export const revalidate = 120;

export default async function AboutPage() {
  const { isEnabled } = await draftMode();
  const data = await fetchHomePageData(isEnabled);

  return (
    <main>
      <TopNav siteSettings={data.siteSettings} />
      <AboutSection data={data.about} />
      <SiteFooter siteSettings={data.siteSettings} />
    </main>
  );
}
