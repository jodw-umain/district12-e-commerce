import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Logo that appears in the footer',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'columns',
      title: 'Footer Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'footerColumn',
          title: 'Footer Column',
          fields: [
            {
              name: 'title',
              title: 'Column Title',
              type: 'string',
            },
            {
              name: 'links',
              title: 'Links / Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'footerLink',
                  title: 'Footer Link',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                    },
                    {
                      name: 'url',
                      title: 'URL',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
})