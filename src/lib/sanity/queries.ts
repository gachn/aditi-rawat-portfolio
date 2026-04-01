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
    description,
    client,
    roles,
    projectBrief,
    "gallery": gallery[]{
      "url": asset->url,
      "alt": alt
    },
    videoUrl,
    "videoFileUrl": videoFile.asset->url,
    projectUrl,
    featured,
    washColor,
    order
  },
  "about": *[_type == "about"][0],
  "contact": *[_type == "contact"][0],
  "seo": *[_type == "seo"][0]
}`;

export const PROJECT_SLUGS_QUERY = groq`*[_type == "project" && defined(slug.current)]{
  "slug": slug.current
}`;

export const PROJECT_BY_SLUG_QUERY = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  category,
  note,
  description,
  client,
  roles,
  projectBrief,
  "gallery": gallery[]{
    "url": asset->url,
    "alt": alt
  },
  videoUrl,
  "videoFileUrl": videoFile.asset->url,
  projectUrl,
  featured,
  washColor,
  order
}`;
