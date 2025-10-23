'use client'

import {useCartStore} from '@/lib/stores/useCartStore'
import {urlForImage} from '@/sanity/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import {useStore} from 'zustand'
import {Button} from './ui/button'
import {useEffect, useState} from 'react'
import {Card, CardContent, CardFooter, CardHeader} from './ui/card'
import CheckoutSummary from './CheckoutSummary'

export default function CheckoutCart() {
  const [isHydrated, setIsHydrated] = useState(false)

  const cartItems = useStore(useCartStore, (state) => state.items)
  const totalItems = useStore(useCartStore, (state) => state.getTotalItems()) || 0
  const addItem = useStore(useCartStore, (state) => state.addItem)
  const decreaseQuantity = useStore(useCartStore, (state) => state.decreaseQuantity)
  const removeItem = useStore(useCartStore, (state) => state.removeItem)

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    // change to loading skeleton
    return <div>Loading...</div>
  }

  const handleAddProduct = (product: any) => {
    if (addItem) {
      addItem(product)
    }
  }

  const handleDecreaseQuantity = (productId: string) => {
    if (decreaseQuantity) {
      decreaseQuantity(productId)
    }
  }

  const handleRemoveProduct = (productId: string) => {
    if (removeItem) {
      removeItem(productId)
    }
  }

  return (
    <section className="container mb-4">
      <h1 className="mb-8">
        Your cart <span className="text-gray-400">({totalItems})</span>
      </h1>

      {totalItems === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <p className="text-gray-500 mb-6">You have not yet added any works to your cart.</p>
          <Link href="/products">
            <Button>Keep exploring</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:space-x-4">
          <ul className="flex flex-col space-y-4">
            {cartItems.map((item) => (
              <li key={item._id} className="sm:flex">
                <Card className="w-fit">
                  <CardContent>
                    <Image
                      src={`${urlForImage(item.picture)}`}
                      width={200}
                      height={200}
                      priority
                      alt="product"
                      className="object-fit"
                    />
                  </CardContent>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <h2>{item.productName}</h2>
                      <h3>{item.author?.authorName}</h3>
                    </div>
                    <p className="text-gray-600">${item.productPrice}</p>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <div className="flex space-x-2 items-center">
                      <Button onClick={() => handleDecreaseQuantity(item._id)}>
                        <span>-</span>
                      </Button>
                      <p>{item.quantity}</p>

                      <Button onClick={() => handleAddProduct(item)}>
                        <span>+</span>
                      </Button>
                    </div>
                    <Button onClick={() => handleRemoveProduct(item._id)}>
                      <span>delete</span>
                    </Button>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
          <CheckoutSummary product={cartItems} />
        </div>
      )}
    </section>
  )
}
