import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required()
    }),
    defineField({ name: "category", type: "string", validation: (r) => r.required() }),
    defineField({ name: "note", type: "string", validation: (r) => r.required() }),
    defineField({ name: "projectUrl", type: "url", validation: (r) => r.required() }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({
      name: "washColor",
      type: "string",
      options: {
        list: ["rose", "sage", "gold", "ink"]
      },
      validation: (r) => r.required()
    }),
    defineField({ name: "order", type: "number", validation: (r) => r.required() })
  ]
});
