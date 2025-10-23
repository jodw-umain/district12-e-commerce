import { defineField, defineType } from "sanity"

export default defineType({
  name: "filterSection",
  title: "Filter Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Displayed next to the category buttons, e.g. 'Shop by category'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "filters",
      title: "Category Filters",
      type: "array",
      description: "Select which categories should appear as buttons.",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }], 
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})