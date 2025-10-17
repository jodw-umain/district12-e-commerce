import {defineType, defineField} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      description: 'Only used inside Sanity Studio (not visible on the site).',
      initialValue: 'Home page',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'string',
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {hotspot: true},
        }),
      ],
      options: {collapsible: true, collapsed: false},
    }),
  ],
  preview: {
    select: {title: 'title', media: 'hero.backgroundImage'},
    prepare({title, media}) {
      return {title, subtitle: 'Landing Page', media}
    },
  },
})
