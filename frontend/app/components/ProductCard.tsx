import Image from 'next/image'
import {Card, CardHeader, CardDescription, CardContent, CardTitle, CardFooter} from './ui/card'
import {Product as ProductType, AllProductsQueryResult} from '@/sanity.types'
import Link from 'next/link'

export default function ProductCard({product}: {product: AllProductsQueryResult[number]}) {
  const {productName, productPrice, productImage, productImageAlt, author, categories, slug, _id} =
    product

  const categoriesString = Array.isArray(categories) ? categories.join(', ') : String(categories)

  return (
    <Link
      className="hover:text-brand underline transition-colors"
      href={`/products/${slug}`}
      key={_id}
    >
      <span className="absolute inset-0 z-10" />

      <Card className="h-full flex flex-col justify-between p-0 rounded-none border-none shadow-none">
        <div>
          <CardContent className="w-full p-0">
            {productImage?.url && (
              <Image
                src={productImage.url}
                width={200}
                height={200}
                alt={productImageAlt || productName || 'Product image'}
                className="w-auto h-auto"
                priority={true}
              />
            )}
          </CardContent>
        </div>
        <div>
          <CardHeader className="p-0 pt-4">
            <CardTitle className="flex flex-col">
              <p className="">{productName}</p>
              {author && <p className="text-sm font-mono font-normal mt-1">{author}</p>}
            </CardTitle>
            {categoriesString && <CardDescription>{categoriesString}</CardDescription>}
          </CardHeader>
          <CardFooter className="rounded-none p-0 pt-4">
            {productPrice && <p>${productPrice}</p>}
          </CardFooter>
        </div>
      </Card>
    </Link>
  )
}
