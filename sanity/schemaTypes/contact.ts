import { defineField, defineType } from "sanity";

export const contact = defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    defineField({ name: "closing", type: "string", validation: (r) => r.required() }),
    defineField({ name: "headlineTop", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "headlineBottom",
      type: "string",
      validation: (r) => r.required()
    }),
    defineField({
      name: "headlineEmphasis",
      type: "string",
      validation: (r) => r.required()
    }),
    defineField({ name: "body", type: "text", validation: (r) => r.required() }),
    defineField({
      name: "links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "type", type: "string", validation: (r) => r.required() },
            { name: "label", type: "string", validation: (r) => r.required() },
            { name: "href", type: "url", validation: (r) => r.required() }
          ]
        }
      ],
      validation: (r) => r.required()
    }),
    defineField({ name: "signoff", type: "string", validation: (r) => r.required() }),
    defineField({ name: "signature", type: "string", validation: (r) => r.required() })
  ]
});
