import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import ProductDetails from '@/app/components/ProductDetails'
import {productDetailsPageSlug, productQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'

type Props = {
  params: Promise<{slug: string}>
}

//params for the slug
export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: productDetailsPageSlug,
    perspective: 'published',
    stega: false,
  })
  return data
}

//Metadata
export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const {data: product} = await sanityFetch({
    query: productQuery,
    params,
    stega: false,
  })

  if (!product) return {}

  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(product.picture)

  return {
    title: product.productName,
    description:
      typeof product.productDescription === 'string' ? product.productDescription : undefined,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata
}

export default async function ProductPage({params}: Props) {
  const [{data: product}] = await Promise.all([sanityFetch({query: productQuery, params})])

  if (!product?._id) return notFound()

  return <ProductDetails product={product} />
}
