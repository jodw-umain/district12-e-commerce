import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import Hero from '@/app/components/Hero'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  });

  return (
    <>
      <div className="relative"></div>
      <div className="container">
        <aside className="py-12 sm:py-20">
      
        </aside>
        <aside className="py-12 sm:py-20"></aside>
      </div>
    </>
  );
}

