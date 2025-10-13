import Link from "next/link";
import { getClient } from "@/sanity/lib/getClient";
import { getCategoriesQuery } from "@/sanity/lib/queries";

export default async function CategoriesButton() {
  const client = getClient();
  const categories = await client.fetch(getCategoriesQuery);

  return (
    <div className="relative group">
      <Link
        href="/categories"
        className="flex items-center gap-1 text-sm hover:text-primary"
      >
        Categories
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path d="m6 9 6 6 6-6" stroke="currentColor" fill="none" />
        </svg>
      </Link>

      <div className="absolute left-0 top-full hidden group-hover:block bg-white text-black rounded-md shadow-md mt-1 w-48">
        {categories.map((c: { title: string; slug: string }) => (
          <Link
            key={c.slug}
            href={`/categories?category=${c.slug}`}
            className="block px-3 py-2 hover:bg-gray-100"
          >
            {c.title}
          </Link>
        ))}
      </div>
    </div>
  );
}