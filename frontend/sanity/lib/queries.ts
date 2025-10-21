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
            "url": asset->url,
            alt
          }
        }
      },
      _type == "productsBlock" => {
        ...,
        "allProducts": *[_type == "product"]{
          _id,
          slug,
          productName,
          productPrice,
          "author": author->name,
          "productImage": picture.asset->{url},
          "productImageAlt": picture.alt,
          "categories": categories[]->title
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
    }
  }
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

export const getAllProductsQuery = defineQuery(`
*[_type=="product"]
{
  _id,
  "slug":slug.current,
  productName,
  "author":author->authorName,
  productPrice,
  picture,
  "categories":categories[]->title
}
  `)

export const getAuthorsQuery = defineQuery(`
  *[_type == "author"] | order(_createdAt desc) {
    _id,
    authorName,
    picture,
    "slug":slug.current
  }
`)

export const getLandingPage = defineQuery(`
    *[_type == "landingPage"][0]{
      hero {
        heading,
        subheading,
        backgroundImage
      }
    }
  `)

const productFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "slug": slug.current,
  productName,
  productPrice,
  "date": coalesce(date, _updatedAt),
  "author": author->{name, picture},
  picture,
  "categories": categories[]->title,
  productDescription,
`

export const productQuery = defineQuery(`
  *[_type == "product" && slug.current == $slug] [0] {
    ${productFields}
  }
`)

export const productDetailsPageSlug = defineQuery(`
  *[_type == "product" && defined(slug.current)]
  {"slug": slug.current}
`)
export const getProductsByCategoryQuery = defineQuery(`
  *[
    _type == "product" &&
    (
      !defined($category)
      || category->slug.current == $category
      || $category in categories[]->slug.current
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
    category->{
      title,
      "slug": slug.current
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
`)

export const getArtistsQuery = defineQuery(`
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    picture {
      "url": asset->url,
      alt
    }
  }
`)

export const getProductsByArtistQuery = defineQuery(`
 *[
  _type == "product" &&
  (
    !defined($artist) || author->authorName == $artist
  )
] | order(_createdAt desc) {
  _id,
  productName,
  productPrice,
  picture {
    "url": asset->url,
    alt
  },
  "slug": slug.current,
  author->{
    authorName,
    "slug": slug.current,
    picture {
      alt,
      "url": asset->url
    }
  },
  categories[]->{
    title,
    "slug": slug.current
  }
}
`)

export const navbarQuery = defineQuery(`
  *[_type == "navbar"][0]{
    logo,
    items[]{
      label,
      type,
      url,
      dropdownItems[]{label, url}
    }
  }
`)
