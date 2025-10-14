import Image from 'next/image'
import {Card, CardHeader, CardDescription, CardContent, CardTitle, CardFooter} from './ui/card'

interface ProductCard {
  image?: string | null
  productTitle?: string
  artist?: string | null
  price?: number
  category?: string[]
}

export default function ProductCard({image, productTitle, artist, price, category}: ProductCard) {
  return (
    <Card className="p-0 rounded-none border-none shadow-none">
      <CardContent className="p-0">
        {/* <Image src={`${image}`} fill alt={`Art made by ${artist}`} /> */}
        <img src={`${image}`} />
      </CardContent>
      <CardHeader className="p-0 pt-4">
        <CardTitle>
          {productTitle}, {artist}
        </CardTitle>
        <CardDescription>{category}</CardDescription>
      </CardHeader>
      <CardFooter className="rounded-none p-0 pt-4">
        <p>${price}</p>
      </CardFooter>
    </Card>
  )
}
