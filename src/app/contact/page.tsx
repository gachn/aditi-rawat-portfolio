import { ContactSection } from "@/components/sections/ContactSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { TopNav } from "@/components/sections/TopNav";
import { fetchHomePageData } from "@/lib/sanity/fetchHomePageData";

export default async function ContactPage() {
  const data = await fetchHomePageData(false);

  return (
    <main>
      <TopNav siteSettings={data.siteSettings} />
      <ContactSection data={data.contact} />
      <SiteFooter siteSettings={data.siteSettings} />
    </main>
  );
}
