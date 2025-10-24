import Image from 'next/image'
import {urlForImage} from '@/sanity/lib/utils'
import {sanityFetch} from '@/sanity/lib/live'
import {getLandingPage} from '@/sanity/lib/queries'

export default async function HeroSection() {
  const {data: landing} = await sanityFetch({query: getLandingPage})

  const hero = landing?.hero

  const imageUrl = urlForImage(hero?.backgroundImage)?.url()
  return (
    <>
      {hero && (
        <section className="relative flex items-center sm:min-h-[500px] px-2 sm:px-6">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={hero?.backgroundImage?.alt || 'Hero background'}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          )}
          <div className="flex flex-col justify-between items-center sm:gap-5 gap-2 z-10 w-full">
            <h1 className=" ">{hero.heading}</h1>
            <p className="">{hero.subheading}</p>
          </div>
        </section>
      )}
    </>
  )
}
