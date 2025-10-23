import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Logo image shown in the navbar',
    }),

    defineField({
      name: "shoppingBagIcon",
      title: "Shopping Bag Icon",
      type: "image",
      description: 'Shopping bag icon shown in the navbar',
    }),

    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Nav Item',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Link', value: 'link'},
                  {title: 'Dropdown', value: 'dropdown'},
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'url',
              title: 'URL (for Link type)',
              type: 'string',
              hidden: false,
            }),
            defineField({
              name: 'dropdownItems',
              title: 'Dropdown Items (for Dropdown type)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'dropdownItem',
                  title: 'Dropdown Item',
                  fields: [
                    {name: 'label', title: 'Label', type: 'string'},
                    {name: 'url', title: 'URL', type: 'string'},
                  ],
                },
              ],
              hidden: false,
            }),
          ],
        },
      ],
    }),
  ],
})