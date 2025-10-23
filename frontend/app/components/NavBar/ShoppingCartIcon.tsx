'use client'

import Link from 'next/link'
import {ShoppingBag} from 'lucide-react'
import {useCartStore} from '@/lib/stores/useCartStore'
import useStore from '@/lib/hooks/useStore'

export default function ShoppingCartIcon() {
  const totalItems = useStore(useCartStore, (state) => state.getTotalItems())

  return (
    <Link href="/shoppingcart" className="relative" aria-label="Shopping cart">
      <ShoppingBag className="w-5 h-5" />
      {totalItems !== undefined && totalItems > 0 && (
        <span className="absolute -top-2 -right-2 text-[10px] px-[6px] py-[2px] bg-black text-white rounded">
          {totalItems}
        </span>
      )}
    </Link>
  )
}
