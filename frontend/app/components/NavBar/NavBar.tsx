import Image from 'next/image'
import Link from 'next/link'
import { getClient } from '@/sanity/lib/client'
import { navbarQuery } from '@/sanity/lib/queries'
import AllProductsButton from "./AllProducts";
import {urlForImage} from '@/sanity/lib/utils'

function Dropdown({
  label,
  items = [],
  url,
}: {
  label: string
  items?: { label: string; url: string }[]
  url?: string
}) {
  return (
    <div className="relative group">
      <Link
        href={url || '#'}
        className="px-3 py-2 text-sm hover:text-gray-600"
      >
        {label}
      </Link>
      <div className="absolute left-0 mt-1 hidden group-hover:block bg-white shadow-lg rounded-md z-10">
        {items?.map((child) => (
          <Link
            key={child.label}
            href={child.url}
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

interface NavbarData {
  logo?: any
  items?: {
    label: string
    type: 'link' | 'dropdown'
    url?: string
    dropdownItems?: { label: string; url: string }[]
  }[]
  shoppingBagIcon?: any
}

export default async function NavBar() {
  const data: NavbarData | null = await getClient().fetch(navbarQuery)
  const { logo, items = [], shoppingBagIcon } = (data || {}) as NavbarData

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <Link href="/" aria-label="Home">
        {logo ? (
          <Image
            src={urlForImage(logo)?.url() || ''}
            alt="Site logo"
            width={120}
            height={40}
            priority
          />
        ) : (
          <span className="text-xl font-bold">District 12</span>
        )}
      </Link>

      <div className="flex items-center gap-6">
        {items.map((item:any) => {
          if (item.type === 'link') {
            return (
              <Link
                key={item.label}
                href={item.url || '#'}
                className="text-sm hover:text-gray-600 transition"
              >
                {item.label}
              </Link>
            )
          }

          if (item.type === 'dropdown') {
            return (
              <Dropdown
                key={item.label}
                label={item.label}
                items={item.dropdownItems}
                url ={item.url}
              />
            )
          }

          return null
        })}

        <AllProductsButton />

        <Link href="/shoppingcart" aria-label="Shopping cart">
          { shoppingBagIcon? (
            <Image
              src={urlForImage(shoppingBagIcon)?.url() || ''}
              alt="shopping Bag Icon"
              width={40}
              height={40}
              priority
            />
          ) : (
            <span className="text-xl font-bold">District 12</span>
          )}
        </Link>
      </div>
    </nav>
  )
}