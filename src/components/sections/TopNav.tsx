import type { SiteSettings } from "@/lib/sanity/types";

export function TopNav({ siteSettings }: { siteSettings: SiteSettings }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--paper)",
        borderBottom: "1px solid var(--rule)"
      }}
    >
      <div
        className="container"
        style={{ display: "flex", justifyContent: "space-between", padding: "1rem 1.25rem" }}
      >
        <a href="/" style={{ textDecoration: "none", fontWeight: 700 }}>
          {siteSettings.siteTitle} - <span className="muted">{siteSettings.siteTagline}</span>
        </a>
        <nav style={{ display: "flex", gap: "1rem" }}>
          {siteSettings.navLinks.map((link) => (
            <a key={link.label} href={link.href} style={{ textDecoration: "none" }}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
