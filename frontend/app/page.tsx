import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {urlForImage} from '@/sanity/lib/utils'
import {Suspense} from 'react'
import Image from 'next/image'
import ProductCarouselSection from './components/ProductCarouselSection'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  });
  const {data: landing} = await sanityFetch({query:`*[_type == "landingPage"][0]{hero{heading, subheading, backgroundImage}}`,})

  const hero = landing?.hero

    const imageUrl = urlForImage(hero?.backgroundImage)?.url()
  return (
    <>
      <div className="">
              {hero && (
        <section
          className="text-white relative flex items-center py-6 px-2 sm:px-6"
          style={{
            backgroundImage: hero.backgroundImage
              ? `url(${hero.backgroundImage.asset.url})`
              : undefined,
          }}
        >
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
          <div className="flex flex-col justify-between gap-5 z-10 w-full">
            <h1 className=" sm:text-5xl text-3xl px-1 py-10">
              {hero.heading}
            </h1>
            <p className="text-xl self-end">{hero.subheading}</p>
          </div>
        </section>
      )}
        <aside className="py-12 sm:py-20">
          <Suspense
            fallback={
              <div>
                <p>loading...</p>
              </div>
            }
          >
            {await ProductCarouselSection()}
          </Suspense>
        </aside>
      </div>
    </>
  );
}

