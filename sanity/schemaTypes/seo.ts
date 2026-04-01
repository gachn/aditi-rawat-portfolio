import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required().max(70) }),
    defineField({
      name: "description",
      type: "text",
      validation: (r) => r.required().max(160)
    })
  ]
});
