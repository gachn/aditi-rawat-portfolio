import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleTop", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleEmphasis", type: "string", validation: (r) => r.required() }),
    defineField({ name: "marginNote", type: "text", validation: (r) => r.required() }),
    defineField({ name: "portraitCaption", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "portraitPlaceholder",
      type: "string",
      validation: (r) => r.required()
    }),
    defineField({
      name: "paragraphs",
      type: "array",
      of: [{ type: "text" }],
      validation: (r) => r.required().min(1)
    }),
    defineField({ name: "postscript", type: "text", validation: (r) => r.required() }),
    defineField({
      name: "skills",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().min(1)
    })
  ]
});
