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
       _type == "artistCard" => {
        ...,
        artist->{
          _id,
          _type,
          name,
          picture{
            "url": asset->url,  // Get the direct URL
            alt
          }
        }
      },
      _type == "productDetails" => {
      overrideTitle,
      overrideDescription,
      button,
      product->{
        productName,
        "artist": author->name,
        productDescription,
        productPrice,
        "categories": categories[]->{
          title
        },
        picture
      }
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
export const allProductsQuery = defineQuery(`
  *[_type=="product"]{
  _id,
  "slug":slug.current, 
  "productTitle": productName,
  "price": productPrice, 
  "artist": author->name,
  "category": categories[]->title,
  "image": picture.asset->url
} | order(_createdAt desc)
`)

// fetch single product
export const oneProductQuery = defineQuery(`
*[_type=="product"][0]{
  _id,
  "slug":slug.current, 
  "productTitle": productName,
  "price": productPrice, 
  "artist": author->name,
  "category": categories[]->title,
  "image": picture.asset->url
}
`)

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

export const allArtists = defineQuery(`
*
[_type=="author"]
{
  _id,
  name, 
  "authorImg":picture.asset->url
}
| order(_createdAt asc)
`)

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
