import { defineField, defineType } from "sanity";

export const homeHero = defineType({
  name: "homeHero",
  title: "Home Hero",
  type: "document",
  fields: [
    defineField({ name: "dateline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "salutation", type: "string", validation: (r) => r.required() }),
    defineField({ name: "headlineTop", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "headlineEmphasis",
      type: "string",
      validation: (r) => r.required()
    }),
    defineField({ name: "headlineBottom", type: "string", validation: (r) => r.required() }),
    defineField({ name: "headlineSubline", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "opening",
      type: "text",
      rows: 4,
      validation: (r) => r.required().max(420)
    }),
    defineField({
      name: "ctaPrimaryLabel",
      type: "string",
      validation: (r) => r.required().max(32)
    }),
    defineField({ name: "ctaPrimaryHref", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "ctaSecondaryLabel",
      type: "string",
      validation: (r) => r.required().max(32)
    }),
    defineField({ name: "ctaSecondaryHref", type: "string", validation: (r) => r.required() }),
    defineField({ name: "annotation", type: "string", validation: (r) => r.required() })
  ]
});
