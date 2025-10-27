'use client'

import {useCartStore} from '@/lib/stores/useCartStore'

import {useStore} from 'zustand'
import {Button} from './ui/button'

type ProductSummary = Array<{
  _id: string
  productName: string
  productPrice: number
  quantity: number
}>

export default function CheckoutSummary({product}: {product: ProductSummary}) {
  const totalPrice = useStore(useCartStore, (state) => state.getTotalPrice())
  const clearClart = useStore(useCartStore, (state) => state.clearCart)

  const calculateItemTotal = (price: number, quantity: number) => {
    return price * quantity
  }

  return (
    <div>
      <h2>Summary</h2>

      {product.map((item) => {
        const itemTotal = calculateItemTotal(item.productPrice, item.quantity)

        return (
          <div key={item._id} className="flex justify-between items-center py-2 border-b">
            <div className="flex-1">
              <p>{item.productName}</p>
              <p className="text-gray-600">
                ${item.productPrice} × {item.quantity}
              </p>
            </div>

            <p className="font-semibold">${itemTotal.toFixed(2)}</p>
          </div>
        )
      })}
      <h3>Total price: ${totalPrice}</h3>
      {/* when paying there should be a loading animation saying "your art are on its way" with popup maybe? then it navigates to the landing page and clears the local storage*/}
      <Button onClick={() => clearClart()}>Order</Button>
    </div>
  )
}
