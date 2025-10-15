import Image from 'next/image'
import {Card, CardHeader, CardDescription, CardContent, CardTitle, CardFooter} from './ui/card'
import {GetPageQueryResult} from '@/sanity.types'

type PageBuilderArray = NonNullable<NonNullable<GetPageQueryResult>['pageBuilder']>
type ProductCardBlock = Extract<PageBuilderArray[number], {_type: 'productCard'}>

interface ProductCardProps {
  block: ProductCardBlock
  index: number
}

export default function ProductCardComponent({block}: ProductCardProps) {
  const product = block.product
  let categories = product?.categories.join(', ')

  return (
    <Card className="h-full flex flex-col justify-between p-0 rounded-none border-none shadow-none">
      <div>
        <CardContent className="w-full p-0">
          <Image
            src={`${product?.picture.url}`}
            width={200}
            height={200}
            alt={`${product?.picture.alt}`}
            className="w-auto h-auto"
            priority={true}
          />
        </CardContent>
      </div>
      <div>
        <CardHeader className="p-0 pt-4">
          <CardTitle className="flex flex-col">
            <p className="">{product?.productName}</p>
            <p className="text-sm font-mono font-normal mt-1">{product?.author?.name}</p>
          </CardTitle>
          <CardDescription>{categories}</CardDescription>
        </CardHeader>
        <CardFooter className="rounded-none p-0 pt-4">
          <p>${product?.productPrice}</p>
        </CardFooter>
      </div>
    </Card>
  )
}
