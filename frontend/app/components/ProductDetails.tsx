'use client'

import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import ResolvedLink from '@/app/components/ResolvedLink'
import {Button} from '@/app/components/ui/button'
import {Card, CardHeader, CardDescription, CardContent, CardTitle,} from './ui/card'


type Product = {
  productName?: string
    artist?:string
   productDescription?: string
    productPrice?: number
    categories?: {title: string}[]
      picture?: any
     button?:{
       buttonText?: string
       link?: string
       buttonVariant?: 'default' | 'secondary' | 'ghost' | 'destructive'
       _type: 'button'
       _key: string
     }
    }
  


export default function ProductDetails({product
}:{product:Product}) {

  if (!product) {
    return (
      <section className="container py-12 text-center">
        <p>No product data found. Sorry</p>
      </section>
    )
  }

  const {
    picture,
    productName,
    artist,
    productDescription,
    productPrice,
    categories,
    button,
  } = product

  return (
    <Card className="flex items-center">
      <CardContent className="container flex flex-col md:flex-row items-center justify-center gap-8 py-6 px-2 sm:px-6">
        {picture && (
          <Image
            src={picture}
            alt={picture.alt || picture.title}
            width={400}
            height={400}
            className="rounded-lg object-cover"
            priority
          />
        )}

        <div className="flex flex-col gap-3 max-w-lg">
          <CardTitle className="text-4xl font-bold">
            {productName}
          </CardTitle>

          {artist && <h2 className="text-gray-500 text-xl">{artist}</h2>}
 <CardDescription>
 {Array.isArray(productDescription) ? (
            <PortableText value={productDescription} />
            
          ) : productDescription ? (
            
            <p>{productDescription}</p>
          ) : null}

          {productPrice !== undefined && (
            <p className="text-2xl font-semibold mt-3">
              ${productPrice}
            </p>
          )}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded"
                >
                  {cat.title}
                </span>
              ))}
            </div>
          
          )}
            </CardDescription>

          {button?.link && (
            <ResolvedLink link={button.link}>
              <Button
                variant={button.buttonVariant || 'default'}
                className="mt-4"
              >
                {button.buttonText || 'Buy now'}
              </Button>
            </ResolvedLink>
          )}
        </div>
      </CardContent>
    </Card>
  )
}