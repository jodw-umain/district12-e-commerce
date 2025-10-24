import Link from 'next/link';
import {getAllProductsQuery, getFilteredProductsQuery,} from '@/sanity/lib/queries'
import ProductCard from '@/app/components/ProductCard'
import {sanityFetch} from '@/sanity/lib/live'

// export default async function AllProductsPage() {
//   const products = await sanityFetch({query: getAllProductsQuery})

//   return (
//     <section className="flex flex-col items-center p-8 h-fit">
//       <h1 className="sm:mb-10 sm:place-self-start mb-8">All Products</h1>
//       <ul className="columns-1 sm:columns-3 md:columns-4 gap-5 space-y-10">
//         {products.data.map((p) => (
//           <ProductCard key={p._id} product={p} />
//         ))}
//       </ul>
//     </section>
//   )
// }

export const revalidate = 60;

export default async function AllProductsPage({
  searchParams,
}: {
  searchParams?: { price?: string; format?: string };
}) {
  const price = searchParams?.price;
  const format = searchParams?.format;

  const query =
    price || format
      ? getFilteredProductsQuery(price, format)
      : getAllProductsQuery;

  const products = await sanityFetch({ query });

  const activePrice = price ?? "";
  const activeFormat = format ?? "";

  const buildUrl = (next: { price?: string; format?: string }) => {
    const params = new URLSearchParams();
    if (next.price) params.set("price", next.price);
    if (next.format) params.set("format", next.format);
    const queryStr = params.toString();
    return `/AllProducts${queryStr ? "?" + queryStr : ""}`;
  };

  return (
    <section className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-semibold mb-8">All Products</h1>

      <div className="flex flex-wrap gap-4 mb-10">
        <Link
          href="/AllProducts"
          className="border rounded-full px-4 py-2 text-sm hover:bg-gray-100"
        >
          Clear All ▾
        </Link>

        <div className="relative group">
          <button className="border rounded-full px-4 py-2 text-sm cursor-pointer">
            Price ▾
          </button>
          <div className="absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-2 z-10">
            {["$", "$$", "$$$"].map((symbol) => (
              <Link
                key={symbol}
                href={buildUrl({ price: symbol, format })}
                className={`block px-4 py-2 hover:bg-gray-50 ${
                  activePrice === symbol? "bg-gray-100 font-medium" : ""
                }`}
              >
                {symbol}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative group">
          <button className="border rounded-full px-4 py-2 text-sm cursor-pointer">
            Format ▾
          </button>
          <div className="absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-2 z-10">
            {["digital", "print"].map((fmt) => (
              <Link
                key={fmt}
                href={buildUrl({ price, format: fmt })}
                className={`block px-4 py-2 hover:bg-gray-50 ${
                  activeFormat === fmt ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {fmt.charAt(0).toUpperCase() + fmt.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {products.data?.length ? (
        <ul className="columns-1 sm:columns-3 md:columns-4 gap-5 space-y-10 mt-8">
          {products.data.map((p: any) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </section>
  );
}

