import Image from 'next/image'
import {PortableText} from '@portabletext/react'
// import ResolvedLink from '@/app/components/ResolvedLink'
import {Button} from '@/app/components/ui/button'
import {Card, CardDescription, CardContent, CardTitle} from './ui/card'
import {urlForImage} from '@/sanity/lib/utils'
import {ProductQueryResult} from '@/sanity.types'

type Product = NonNullable<ProductQueryResult>

export default function ProductDetails(
  {product}: {product: Product},
  // {product: Product}
) {
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
    <Card className="flex items-center">
      <CardContent className="container flex flex-col md:flex-row items-center justify-center gap-8 py-6 px-2 sm:px-6">
        <Image
          src={productImage || '/fallback-image.jpg'}
          alt={picture.alt || 'product image'}
          width={400}
          height={400}
          className="rounded-lg object-cover"
          priority
        />

        <div className="flex flex-col gap-3 max-w-lg">
          <CardTitle className="text-4xl font-bold">{productName}</CardTitle>

          {author?.name && <h2 className="text-gray-500 text-xl">{author.name}</h2>}
          <CardDescription>
            {Array.isArray(productDescription) ? (
              <PortableText value={productDescription} />
            ) : productDescription ? (
              <p>{productDescription}</p>
            ) : null}

            {productPrice !== undefined && (
              <p className="text-2xl font-semibold mt-3">${productPrice}</p>
            )}
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((cat, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </CardDescription>

          {/* {button?.link && (
            <ResolvedLink link={button.link}>
              <Button variant={button.buttonVariant || 'default'} className="mt-4">
                {button.buttonText || 'Buy now'}
              </Button>
            </ResolvedLink>
          )} */}

          <Button>Add to cart</Button>
        </div>
      </CardContent>
    </Card>
  )
}
