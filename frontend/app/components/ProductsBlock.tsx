import {sanityFetch} from '@/sanity/lib/live'
import ProductCard from './ProductCard'
import {allProductsQuery} from '@/sanity/lib/queries'

import {Carousel, CarouselContent, CarouselItem} from './ui/carousel'
import {AllProductsQueryResult} from '@/sanity.types'

export default async function ProductsBlock() {
  const {data} = await sanityFetch({query: allProductsQuery})

  if (!data || data.length === 0) {
    return (
      <div>
        <p>no products found</p>
      </div>
    )
  }

  return (
    <div className="continer">
      <h2 className="text-4xl">Title</h2>
      <Carousel
        opts={{
          containScroll: false,
          align: 'start',
          dragFree: true,
        }}
      >
        <CarouselContent>
          {data.map((product) => (
            <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/6" key={product._id}>
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
