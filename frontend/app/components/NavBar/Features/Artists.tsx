import Link from "next/link";
import { getClient } from "@/sanity/lib/client";
import { getArtistsQuery } from "@/sanity/lib/queries";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "../../ui/navigation-menu"

export default async function ArtistsButton() {
  const client = getClient();
  const artists= await client.fetch(getArtistsQuery);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm">
            <Link href="/artists" className="text-sm">
              Artists
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-48 gap-1 p-2">
              {artists.map(
                (a: {
                  _id: string
                  name: string | null
                  slug: null
                  picture:
                    | { url: string | null; alt: string | null }
                    | null
                }) => (
                  <li key={a._id}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/artists?artist=${a.name}`}
                        className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                      >
                        {a.name}
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