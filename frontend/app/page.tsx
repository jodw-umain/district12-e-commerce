import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  });

  return (
    <>
      <div className="relative"></div>
      <div className="container">
        
     
      </div>
    </>
  );
}

