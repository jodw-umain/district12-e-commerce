import {sanityFetch} from '@/sanity/lib/live'
import ProductCard from '../ProductCard'
import {Carousel, CarouselContent, CarouselItem} from '../ui/carousel'
import {getAllProductsQuery} from '@/sanity/lib/queries'

export default async function ProductCarouselSection() {
  const {data} = await sanityFetch({query: getAllProductsQuery})

  return (
    <section className="my-20 sm:ml-20 ml-4">
      <h2 className=" mb-6">Explore </h2>

      <Carousel
        opts={{
          containScroll: false,
          align: 'start',
          dragFree: true,
        }}
      >
        <CarouselContent>
          {data.map((product) => (
            <CarouselItem className="h-full basis-1/2 md:basis-1/3 lg:basis-1/6" key={product._id}>
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
