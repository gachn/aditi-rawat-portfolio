import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aditi Rawat - Animator & Illustrator",
  description: "Portfolio revamp with headless CMS editing."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
