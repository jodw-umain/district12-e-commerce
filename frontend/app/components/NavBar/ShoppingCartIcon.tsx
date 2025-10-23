'use client'

import Link from 'next/link'
import {useCartStore} from '@/lib/stores/useCartStore'
import useStore from '@/lib/hooks/useStore'
import {urlForImage} from '@/sanity/lib/utils'
import Image from 'next/image'
import {NavbarQueryResult} from '@/sanity.types'

type Icon = NonNullable<NavbarQueryResult>['shoppingBagIcon']

export default function ShoppingCartIcon({icon}: {icon: Icon}) {
  const totalItems = useStore(useCartStore, (state) => state.getTotalItems())

  const iconUrl = urlForImage(icon)?.url()

  return (
    <Link href="/checkout" className="relative inline-block" aria-label="Shopping cart icon">
      {icon ? (
        <>
          <Image src={`${iconUrl}`} alt="Shopping Bag Icon" width={40} height={40} priority />
          {totalItems !== undefined && totalItems > 0 && (
            <span className="absolute -top-2 -right-2 text-[10px] px-[6px] py-[2px] bg-black text-white rounded">
              {totalItems}
            </span>
          )}
        </>
      ) : (
        <>
          <span className="text-xl font-bold">cart</span>
          {totalItems !== undefined && totalItems > 0 && (
            <span className="absolute -top-2 -right-2 text-[10px] px-[6px] py-[2px] bg-black text-white rounded">
              {totalItems}
            </span>
          )}
        </>
      )}
    </Link>
  )
}
