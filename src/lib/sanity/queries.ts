import groq from "groq";

export const HOME_PAGE_QUERY = groq`{
  "siteSettings": *[_type == "siteSettings"][0]{
    siteTitle,
    siteTagline,
    navLinks,
    footerCopy
  },
  "homeHero": *[_type == "homeHero"][0],
  "workTitle": *[_type == "siteSettings"][0].workTitle,
  "workEmphasizedTitle": *[_type == "siteSettings"][0].workEmphasizedTitle,
  "workViewAllHref": *[_type == "siteSettings"][0].workViewAllHref,
  "projects": *[_type == "project"] | order(order asc){
    _id,
    title,
    "slug": slug.current,
    category,
    note,
    projectUrl,
    featured,
    washColor,
    order
  },
  "about": *[_type == "about"][0],
  "contact": *[_type == "contact"][0],
  "seo": *[_type == "seo"][0]
}`;
