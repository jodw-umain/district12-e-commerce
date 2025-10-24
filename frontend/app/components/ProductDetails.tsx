import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import {Card, CardDescription, CardContent, CardTitle} from './ui/card/card'
import {urlForImage} from '@/sanity/lib/utils'
import {ProductQueryResult} from '@/sanity.types'
import AddToCartButton from './AddToCartButton'

type Product = NonNullable<ProductQueryResult>

export default function ProductDetails({product}: {product: Product}) {
  if (!product) {
    return (
      <section className="container py-12 text-center">
        <p>No product data found. Sorry</p>
      </section>
    )
  }
  const {productName, author, categories, picture, productDescription, productPrice} = product

  const productImage = urlForImage(picture)?.url()

  return (
    <section className="flex justify-center sm:py-12 ">
      <Card className="!border-none ">
        <CardContent className="flex flex-col h-full md:flex-row items-center gap-8 py-6 px-2 sm:px-6">
          <Image
            src={productImage || '/fallback-image.jpg'}
            alt={picture?.alt || 'product image'}
            width={400}
            height={400}
            className="object-cover"
            priority
          />

          <div className="flex flex-col h-full max-w-lg sm:p-0 ">
            <CardTitle className="mb-3">
              <h1>{productName}</h1>
            </CardTitle>

            {author?.authorName && <h2 className="mb-8">{product.author?.authorName}</h2>}

            <CardDescription>
              {Array.isArray(productDescription) ? (
                <PortableText value={productDescription} />
              ) : productDescription ? (
                <p>{productDescription}</p>
              ) : null}

              {productPrice !== undefined && <p className="text-xl mt-6">${productPrice}</p>}
              {categories && categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {categories.map((cat, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </CardDescription>
            <div className="mt-10 sm:mt-15">
              <AddToCartButton product={product} />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
