import Image from 'next/image'
import {Card, CardHeader, CardDescription, CardContent, CardTitle, CardFooter} from './ui/card'

interface ProductCard {
  image?: string | null
  productTitle?: string | null
  artist?: string | null
  price?: number | null
  category?: string[] | null
}

export default function ProductCard({image, productTitle, artist, price, category}: ProductCard) {
  let categories = category?.join(', ')

  return (
    <Card className="h-full flex flex-col justify-between p-0 rounded-none border-none shadow-none">
      <div>
        <CardContent className="w-full p-0">
          <Image
            src={`${image}`}
            width={200}
            height={200}
            alt={`Art made by ${artist}`}
            className="w-auto h-auto"
            priority={true}
          />
          {/* <img src={`${image}`} /> */}
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
