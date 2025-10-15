import Image from 'next/image'
import {Card, CardHeader, CardDescription, CardContent, CardTitle, CardFooter} from './ui/card'

interface ProductCard {
  image?: string | null
  productTitle?: string | null
  artist?: string | null
  price?: number | null
  category?: string[] | null
  altText?: string | null
}

export default function ProductCard({
  image,
  altText,
  productTitle,
  artist,
  price,
  category,
}: ProductCard) {
  let categories = category?.join(', ')

  return (
    <Card className="h-full flex flex-col justify-between p-0 rounded-none border-none shadow-none">
      <div>
        <CardContent className="w-full p-0">
          <Image
            src={`${image}`}
            width={200}
            height={200}
            alt={`${altText}`}
            className="w-auto h-auto"
            priority={true}
          />
        </CardContent>
      </div>
      <div>
        <CardHeader className="p-0 pt-4">
          <CardTitle className="flex flex-col">
            <p className="">{productTitle}</p>
            <p className="text-sm font-mono font-normal mt-1">{artist}</p>
          </CardTitle>
          <CardDescription>{categories}</CardDescription>
        </CardHeader>
        <CardFooter className="rounded-none p-0 pt-4">
          <p>${price}</p>
        </CardFooter>
      </div>
    </Card>
  )
}

// import Link from 'next/link'
// import {notFound} from 'next/navigation'

// import {sanityFetch} from '@/sanity/lib/live'
// import {allProductsQuery, moreProductsQuery} from '@/sanity/lib/queries'
// // import type {AllProductsQueryResult} from '@/sanity.types'

// import ProductCard from './ProductCard'

// export const AllProducts = async () => {
//   const {data} = await sanityFetch({query: allProductsQuery})

//   if (!data || data.length === 0) {
//     return notFound()
//   }

//   return (
//     <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 md:align-bottom">
//       {data.map((product) => (
//         <Link href={`/products/${product.slug}`} key={product._id}>
//           <ProductCard
//             productTitle={product.productTitle}
//             artist={product.artist}
//             price={product.price}
//             category={product.category}
//             image={product.image}
//           />
//         </Link>
//       ))}
//     </div>
//   )
// }
