import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {Suspense} from 'react'
import ProductCarouselSection from './components/ProductCarouselSection'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
<<<<<<< HEAD
  });
  const {data: landing} = await sanityFetch({query:`*[_type == "landingPage"][0]{hero{heading, subheading, backgroundImage}}`,})
=======
  })
>>>>>>> development

  const hero = landing?.hero
  return (
    <>
      <div className="relative"></div>
      <div className="container">
              {hero && (
        <section
          className="relative flex items-center justify-center text-center py-20"
          style={{
            backgroundImage: hero.backgroundImage
              ? `url(${hero.backgroundImage.asset.url})`
              : undefined,
            backgroundSize: 'cover',
          }}
        >
          <div className="container">
            <h1 className="text-5xl font-bold mb-4">
              {hero.heading}
            </h1>
            <p className="text-xl  mb-8">{hero.subheading}</p>
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
  )
}
