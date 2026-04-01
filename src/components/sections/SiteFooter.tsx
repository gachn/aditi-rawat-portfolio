import type { SiteSettings } from "@/lib/sanity/types";

export function SiteFooter({ siteSettings }: { siteSettings: SiteSettings }) {
  return (
    <footer style={{ background: "var(--ink)", color: "var(--paper)", padding: "1.5rem 0" }}>
      <div
        className="container"
        style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}
      >
        <span>{siteSettings.siteTitle}</span>
        <span>{siteSettings.footerCopy}</span>
      </div>
    </footer>
  );
}
