import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {Suspense} from 'react'
import ProductCarouselSection from './components/ProductCarouselSection'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  });
  const {data: landing} = await sanityFetch({query:`*[_type == "landingPage"][0]{hero{heading, subheading, backgroundImage}}`,})

  const hero = landing?.hero
  return (
    <>
      <div className="relative"></div>
      <div className="container">
              {hero && (
        <section
          className="relative flex items-center py-6 px-2 sm:px-6"
          style={{
            backgroundImage: hero.backgroundImage
              ? `url(${hero.backgroundImage.asset.url})`
              : undefined,
            backgroundSize: 'cover',
          }}
        >
          <div className="flex flex-col justify-between gap-5">
            <h1 className="text-5xl px-1 py-10">
              {hero.heading}
            </h1>
            <p className="text-2xl self-end">{hero.subheading}</p>
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

