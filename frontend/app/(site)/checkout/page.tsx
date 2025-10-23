import CheckoutSummary from '@/app/components/CheckoutSummary'
import {Suspense} from 'react'

export const metadata = {
  title: 'Your Cart - ditrict12',
  description: 'View items you have added to your shopping cart',
}

export default async function ShoppingCartPage() {
  return (
    <Suspense fallback={<div>loading cart....</div>}>
      <CheckoutSummary />
    </Suspense>
  )
}
