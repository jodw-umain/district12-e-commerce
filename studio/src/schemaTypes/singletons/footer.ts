import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      description: 'Columns of navigation links (left side)',
      of: [
        {
          type: 'object',
          name: 'footerColumn',
          title: 'Footer Column',
          fields: [
            defineField({ name: 'title', title: 'Column Title', type: 'string' }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                defineField({
                  type: 'object',
                  name: 'footerLink',
                  title: 'Footer Link',
                  fields: [
                    { name: 'label', title: 'Label', type: 'string' },
                    { name: 'url', title: 'URL', type: 'string' },
                  ],
                }),
              ],
            }),
          ],
        },
      ],
    }),

    defineField({
    name: 'contact',
    title: 'Contact',
    type: 'object',
    fields: [
      defineField({
        name: 'title',
        title: 'Heading (e.g. Contact us)',
        type: 'string',
      }),

      defineField({
        name: 'contactItems',
        title: 'Contact Items',
        type: 'array',
        of: [
          defineField({
            type: 'object',
            name: 'contactItem',
            title: 'Contact Item',
            fields: [
              {
                name: 'label',
                title: 'Label',
                type: 'string', 
              },
              {
                name: 'value',
                title: 'Value',
                type: 'string', 
              },
              {
                name: 'url',
                title: 'URL (optional)',
                type: 'url', 
              },
            ],
          }),
        ],
      }),

        defineField({
          name: 'socialLinks',
          title: 'Social Links',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'socialLink',
              title: 'Social Link',
              fields: [
                { name: 'platform', title: 'Platform', type: 'string' },
                { name: 'url', title: 'URL', type: 'url' },
                {
                  name: 'icon',
                  title: 'Icon Image',
                  type: 'image',
                  options: { hotspot: true },
                },
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'object',
      fields: [
        {
          name: 'logo',
          title: 'Logo',
          type: 'image',
          options: { hotspot: true },
          description: 'Company logo on footer right side',
        },
        {
          name: 'description',
          title: 'Description / About',
          type: 'text',
        },
      ],
    }),
  ],
})