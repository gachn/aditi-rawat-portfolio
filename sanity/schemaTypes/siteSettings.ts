import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", type: "string", validation: (r) => r.required() }),
    defineField({ name: "siteTagline", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", validation: (r) => r.required() },
            { name: "href", type: "string", validation: (r) => r.required() }
          ]
        }
      ]
    }),
    defineField({ name: "workTitle", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "workEmphasizedTitle",
      type: "string",
      validation: (r) => r.required()
    }),
    defineField({ name: "workViewAllHref", type: "url", validation: (r) => r.required() }),
    defineField({ name: "footerCopy", type: "string", validation: (r) => r.required() })
  ]
});
