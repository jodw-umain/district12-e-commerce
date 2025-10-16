import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'
import {client} from '@/sanity/lib/client'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import ProductDetails from '@/app/components/ProductDetails'

type Props = {
  params: {slug: string}
}
//params for the slug
export async function generateStaticParams() {
  const data = await client.fetch(`*[_type == "product" && defined(slug.current)]{
    "slug": slug.current
  }`)
  return data.map((item: {slug: string}) => ({slug: item.slug}))
}
//Metadata
export async function generateMetadata(
  {params}: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      productName,
      productDescription,
      productPrice,
      picture,
      "artist": author->name
    }`,
    {slug: params.slug}
  )

  if (!product) return {}

  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(product.picture)

  return {
    title: product.productName,
    description:
      typeof product.productDescription === 'string'
        ? product.productDescription
        : undefined,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  }
}


//Product page component

export default async function ProductPage({params}: Props) {
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      _id,
      productName,
      productDescription,
      productPrice,
      "categories": categories[]->title,
      picture,
      "artist": author->name
    }`,
    {slug: params.slug}
  )

  if (!product?._id) return notFound()

  return (
 <ProductDetails product={product} />
  )
}