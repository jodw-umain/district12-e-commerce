import {author} from './documents/author'
import {page} from './documents/page'
import {post} from './documents/post'
import {product} from './documents/product'
import {category} from './documents/category'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import {heroSection} from './objects/heroSection'
import {artistCard} from './objects/artistCard'
import {productDetails} from './objects/productDetails'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  author,
  product,
  category,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  heroSection,
  artistCard,
  link,
  productDetails,
]
