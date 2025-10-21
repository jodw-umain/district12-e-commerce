import { client } from "@/sanity/lib/client";
import { getAllProductsQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import ProductCard from "@/app/components/ProductCard";
import { sanityFetch } from "@/sanity/lib/live";

export default async function AllProductsPage() {
  // const products = await client.fetch(getAllProductsQuery);
  const products = await sanityFetch({ query: getAllProductsQuery });

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>

      {/* <ProductCard product={products} /> */}
      <ul className="grid">
        {products.data.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </ul>

      {/* <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p: any) => (
          <li key={p._id}>
            <div className="relative aspect-square w-full overflow-hidden rounded-md">
              <Image
                src={p.picture?.url ?? ""}
                alt={p.picture?.alt ?? p.productName ?? "Product image"}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="font-semibold mt-2">{p.productName}</h2>
            <p className="text-sm text-gray-600">${p.productPrice}</p>
          </li>
        ))}
      </ul> */}
    </section>
  );
}