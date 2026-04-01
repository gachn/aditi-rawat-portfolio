import type { ContactSectionData } from "@/lib/sanity/types";

export function ContactSection({ data }: { data: ContactSectionData }) {
  return (
    <section id="contact" className="section">
      <div className="container">
        <p className="muted">{data.closing}</p>
        <h2 style={{ fontSize: "2.5rem", margin: "0 0 1rem" }}>
          {data.headlineTop}
          <br />
          {data.headlineBottom}
          <br />
          <em style={{ color: "var(--rose)" }}>{data.headlineEmphasis}</em>
        </h2>
        <p className="muted" style={{ maxWidth: 600 }}>
          {data.body}
        </p>
        <div>
          {data.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderTop: "1px solid var(--rule)",
                padding: "0.75rem 0",
                textDecoration: "none"
              }}
            >
              <span className="muted">{link.type}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
        <p style={{ marginTop: "1rem" }}>
          {data.signoff}
          <br />
          <strong>{data.signature}</strong>
        </p>
      </div>
    </section>
  );
}
