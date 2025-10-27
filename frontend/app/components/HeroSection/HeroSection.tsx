import Image from 'next/image'
import {urlForImage, urlForFile} from '@/sanity/lib/utils'
import {sanityFetch} from '@/sanity/lib/live'
import {getLandingPage} from '@/sanity/lib/queries'

export default async function HeroSection() {
  const {data: landing} = await sanityFetch({query: getLandingPage})
  const hero = landing?.hero

  const media = hero?.media
  if (!hero) return null

  const imageUrl = urlForImage(media?.image)?.url() || ''

  return (
    <>
      {hero && (
        <section className="relative overflow-hidden flex items-center sm:min-h-[500px] min-h-[450px] ">
          {media?.type === 'image' && media.image && (
            <Image
              src={imageUrl}
              alt={media?.image?.alt || 'Hero background'}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          )}
          {media?.type === 'video' && media.video && (
            <video className="absolute w-fit h-auto object-cover" autoPlay muted loop playsInline>
              <source src={urlForFile(media.video)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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
