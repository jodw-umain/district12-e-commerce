import {settingsQuery} from '@/sanity/lib/queries'
import {getPageQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  });
    const {data: page} = await sanityFetch({
    query: getPageQuery,
    params: {slug: 'home'},
  })
  if (!page?.pageBuilder) return null

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

