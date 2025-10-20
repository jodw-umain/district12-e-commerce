import {sanityFetch} from '@/sanity/lib/live'
import {productQuery} from '@/sanity/lib/queries'
import {notFound} from 'next/navigation'

type Props = {
  params: Promise<{slug: string}>
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const [{data: product}] = await Promise.all([
    sanityFetch({
      query: productQuery,
      params,
    }),
  ])

  if (!product?._id) {
    return notFound()
  }
  return (
    <div>
      <p>{product._id}</p>
      <p>{product.productName}</p>
      <p>{product.productPrice}</p>
      <p>{product.date}</p>
      <p>{product.author.name}</p>
      <p>{product.categories}</p>
      <p>{product.productImageAlt}</p>
    </div>
  )
}
