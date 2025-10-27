import Link from 'next/link';
import {getAllProductsQuery, getFilteredProductsQuery,} from '@/sanity/lib/queries'
import ProductCard from '@/app/components/ProductCard'
import {sanityFetch} from '@/sanity/lib/live'
import {Button} from '@/app/components/ui/button';

export const revalidate = 60;

export default async function AllProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ price?: string; format?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const price = resolvedSearchParams?.price;
  const format = resolvedSearchParams?.format;


  const query =
    price || format
      ? getFilteredProductsQuery(price, format)
      : getAllProductsQuery;

  const products = await sanityFetch({ query });

  const activePrice = price ?? "";
  const activeFormat = format ?? "";

  const buildUrl = (next: { price?: string; format?: string }) => {
    const params = new URLSearchParams();

    if (price && next.price === undefined) params.set('price', price);
    if (format && next.format === undefined) params.set('format', format);

    if (next.price !== undefined) {
      next.price ? params.set('price', next.price) : params.delete('price');
    }
    if (next.format !== undefined) {
      next.format ? params.set('format', next.format) : params.delete('format');
    }


    const queryStr = params.toString();
    return `/allproducts${queryStr ? "?" + queryStr : ""}`;
  };

  return (
    <section className="flex flex-col items-center p-8">
      <h1 className="sm:mb-10 sm:place-self-start mb-8">All Products</h1>

      <div className="flex flex-wrap gap-4 mb-10">
        <Link href="/allproducts" >
          <Button variant="secondary" className="rounded-full sm:px-8 px-4 mb-3">
            Clear All
          </Button>
        </Link>

        <div className="relative group">
          <Button variant="secondary" className="rounded-full sm:px-8 px-4 mb-3">
            Price ▾
          </Button>
          <div className="absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-0 z-10">
            {["$", "$$", "$$$"].map((symbol) => (
              <Link
                key={symbol}
                href={buildUrl({ price: symbol })}
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
          <Button variant="secondary" className="rounded-full sm:px-8 px-4 mb-3">
            Format ▾
          </Button>
          <div className="absolute hidden group-hover:block bg-white border rounded-md shadow-lg mt-0 z-10">
            {["digital", "physical"].map((fmt) => (
              <Link
                key={fmt}
                href={buildUrl({ format: fmt })}
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

