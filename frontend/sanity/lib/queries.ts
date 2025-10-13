import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)
// Fetch all products
export const allProductsQuery = `
  *[_type == "product"]{
    _id,
    productName,
    slug,
    author->{firstName, lastName, image},
    productDescription
  } | order(_createdAt desc)
`

// Fetch "more" products with pagination
export const moreProductsQuery = `
  *[_type == "product"] | order(_createdAt desc) [$skip...($skip + $limit)]{
    _id,
    productName,
    slug,
    author->{firstName, lastName, image},
    productDescription
  }
`

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

export const getProductsByCategoryQuery = defineQuery(`
  *[
    _type == "product" &&
    (
      !defined($category)
      || count(categories[@->slug.current == $category]) > 0
    )
  ] | order(_createdAt desc) {
    _id,
    _type,
    productName,
    "slug": slug.current,
    productPrice,
    productDescription,
    picture{
      alt,
      "url": asset->url
    },
    format,
    author->{
      firstName,
      lastName,
      image
    },
    categories[]->{
      title,
      "slug": slug.current
    }
  }
`)

export const getCategoriesQuery = defineQuery(`
  *[_type == "category"]{
    title,
    "slug": slug.current
  }
`);