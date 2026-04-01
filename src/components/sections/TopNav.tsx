import type { SiteSettings } from "@/lib/sanity/types";
import Link from "next/link";

function normalizeNavHref(href: string, label: string) {
  if (href === "#work") return "/work";
  if (href === "#about") return "/about";
  if (href === "#contact") return "/contact";
  if (href.startsWith("#")) return `/${label.toLowerCase()}`;
  return href;
}

export function TopNav({ siteSettings }: Readonly<{ siteSettings: SiteSettings }>) {
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
        <Link href="/" style={{ textDecoration: "none", fontWeight: 700 }}>
          {siteSettings.siteTitle} - <span className="muted">{siteSettings.siteTagline}</span>
        </Link>
        <nav style={{ display: "flex", gap: "1rem" }}>
          {siteSettings.navLinks.map((link) => (
            <Link
              key={link.label}
              href={normalizeNavHref(link.href, link.label)}
              style={{ textDecoration: "none" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
