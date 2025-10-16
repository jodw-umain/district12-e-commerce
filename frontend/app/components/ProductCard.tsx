import Image from 'next/image'
import {Card, CardHeader, CardDescription, CardContent, CardTitle, CardFooter} from './ui/card'
import {GetPageQueryResult} from '@/sanity.types'

// Extract the product type from the productsBlock
type PageBuilderArray = NonNullable<NonNullable<GetPageQueryResult>['pageBuilder']>
type ProductsBlockType = Extract<PageBuilderArray[number], {_type: 'productsBlock'}>
type ProductType = ProductsBlockType['allProducts'][number]

export default function ProductCard({product}: {product: ProductType}) {
  const {productName, productPrice, productImage, productImageAlt, author, categories} = product

  const categoriesString = Array.isArray(categories) ? categories.join(', ') : String(categories)

  return (
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
  )
}
