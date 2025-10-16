import Link from "next/link";
import { getClient } from "@/sanity/lib/client";
import { getCategoriesQuery } from "@/sanity/lib/queries";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "../../ui/navigation-menu"

export default async function CategoriesButton() {
  const client = getClient();
  const categories = await client.fetch(getCategoriesQuery);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm">
            <Link href="/categories" className="text-sm">
              Categories
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-48 gap-1 p-2">
              {categories.map(
               (c: { title: string | null; slug: string | null }) => (
                  <li key={c.slug}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/categories?category=${c.slug}`}
                        className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                      >
                        {c.title}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                )
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}