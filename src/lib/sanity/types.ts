export type WashColor = "rose" | "sage" | "gold" | "ink";

export interface SiteSettings {
  siteTitle: string;
  siteTagline: string;
  navLinks: Array<{ label: string; href: string }>;
  footerCopy: string;
}

export interface HomeHero {
  dateline: string;
  salutation: string;
  headlineTop: string;
  headlineEmphasis: string;
  headlineBottom: string;
  headlineSubline: string;
  opening: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  annotation: string;
}

export interface ProjectItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  note: string;
  projectUrl: string;
  featured: boolean;
  washColor: WashColor;
  order: number;
}

export interface AboutSectionData {
  label: string;
  titleTop: string;
  titleEmphasis: string;
  marginNote: string;
  portraitCaption: string;
  portraitPlaceholder: string;
  paragraphs: string[];
  postscript: string;
  skills: string[];
}

export interface ContactLink {
  type: string;
  label: string;
  href: string;
}

export interface ContactSectionData {
  closing: string;
  headlineTop: string;
  headlineBottom: string;
  headlineEmphasis: string;
  body: string;
  links: ContactLink[];
  signoff: string;
  signature: string;
}

export interface SeoData {
  title: string;
  description: string;
}

export interface HomePageData {
  siteSettings: SiteSettings;
  homeHero: HomeHero;
  workTitle: string;
  workEmphasizedTitle: string;
  workViewAllHref: string;
  projects: ProjectItem[];
  about: AboutSectionData;
  contact: ContactSectionData;
  seo: SeoData;
}
