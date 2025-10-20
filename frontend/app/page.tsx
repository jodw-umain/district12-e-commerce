import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {Suspense} from 'react'
import HeroSection from './components/HeroSection/HeroSection'
import ProductCarouselSection from './components/ProductCarouselSection'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  });

  return (
    <>
      <div className="">
          <HeroSection/>
          <Suspense
            fallback={
              <div>
                <p>loading...</p>
              </div>
            }
          >
            {await ProductCarouselSection()}
          </Suspense>
      </div>
    </>
  );
}

