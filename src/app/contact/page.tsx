import { ContactSection } from "@/components/sections/ContactSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { TopNav } from "@/components/sections/TopNav";
import { fetchHomePageData } from "@/lib/sanity/fetchHomePageData";
import { draftMode } from "next/headers";

export const revalidate = 120;

export default async function ContactPage() {
  const { isEnabled } = await draftMode();
  const data = await fetchHomePageData(isEnabled);

  return (
    <main>
      <TopNav siteSettings={data.siteSettings} />
      <ContactSection data={data.contact} />
      <SiteFooter siteSettings={data.siteSettings} />
    </main>
  );
}
