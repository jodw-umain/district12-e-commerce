import Image from 'next/image'
import {Card, CardHeader, CardDescription, CardContent, CardTitle, CardFooter} from './ui/card/card'
import {Product as ProductType, GetAllProductsQueryResult} from '@/sanity.types'
import Link from 'next/link'
import {urlForImage} from '@/sanity/lib/utils'

export default function ProductCard({product}: {product: GetAllProductsQueryResult[number]}) {
  const {productName, picture, productPrice, author, categories, slug, _id} = product

  const productImage = urlForImage(picture)?.url()

  const categoriesString = Array.isArray(categories) ? categories.join(', ') : String(categories)

  return (
    <Link href={`/allproducts/${slug}`}>
      <Card className="clickable-card flex flex-col p-4 mb-10 [break-inside:avoid] ">
        <CardContent>
          {productImage && (
            <Image
              src={productImage}
              width={200}
              height={200}
              alt={picture?.alt || productName || 'Product image'}
              className="w-full h-full "
              priority={true}
            />
          )}

          <div className="flex justify-between w-full">
            <CardHeader className="pt-1">
              <CardTitle>
                <p>{productName}</p>
                {author && <p className="mt-1">{author}</p>}
              </CardTitle>
              {categoriesString && <CardDescription>{categoriesString}</CardDescription>}
            </CardHeader>
            <CardFooter className="pt-4">{productPrice && <p>${productPrice}</p>}</CardFooter>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
