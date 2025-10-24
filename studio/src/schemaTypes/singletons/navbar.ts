// navbar.ts (Enhanced version)
import {defineType, defineField} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export const navbar = defineType({
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  icon: MenuIcon,

  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Logo image shown in the navbar',
      // validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'shoppingBagIcon',
      title: 'Shopping Cart Icon',
      type: 'image',
      description: 'Shopping cart icon shown in the navbar',
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
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Link', value: 'link'},
                  {title: 'Dropdown', value: 'dropdown'},
                  {title: 'Artists Dropdown', value: 'artists'},
                  {title: 'Categories Dropdown', value: 'categories'},
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL (for Link type)',
              type: 'string',
              hidden: ({parent}) => parent?.type !== 'link',
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
              hidden: ({parent}) => parent?.type !== 'dropdown',
            }),
            defineField({
              name: 'showAllArtists',
              title: 'Show All Artists',
              type: 'boolean',
              description: 'Show all artists in dropdown or select specific ones',
              hidden: ({parent}) => parent?.type !== 'artists',
              initialValue: true,
            }),
            defineField({
              name: 'selectedArtists',
              title: 'Selected Artists',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'author'}]}],
              hidden: ({parent}) => parent?.type !== 'artists' || parent?.showAllArtists,
            }),
            defineField({
              name: 'showAllCategories',
              title: 'Show All Categories',
              type: 'boolean',
              description: 'Show all categories in dropdown or select specific ones',
              hidden: ({parent}) => parent?.type !== 'categories',
              initialValue: true,
            }),
            defineField({
              name: 'selectedCategories',
              title: 'Selected Categories',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'category'}]}],
              hidden: ({parent}) => parent?.type !== 'categories' || parent?.showAllCategories,
            }),
          ],
        },
      ],
    }),
  ],
})
