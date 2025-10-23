'use client'

import {useState, useEffect} from 'react'
import {useCartStore} from '@/lib/stores/useCartStore'
import {ProductQueryResult} from '@/sanity.types'
import {Button} from './ui/button'

type Product = NonNullable<ProductQueryResult>

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({product}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Use the store directly
  const {addItem} = useCartStore()

  // Handle hydration manually
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const handleAddToCart = async () => {
    if (!isHydrated) {
      console.warn('Not hydrated yet')
      return
    }

    // Validate product data
    if (!product) {
      console.error('Product is undefined')
      return
    }

    if (!product._id || !product.productName || product.productPrice === undefined) {
      console.error('Invalid product data:', product)
      return
    }

    setIsAdding(true)

    try {
      addItem(product)
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsAdding(false)
    }
  }

  // Show loading state until hydrated
  if (!isHydrated) {
    return (
      <Button disabled className="w-full">
        Loading...
      </Button>
    )
  }

  // Validate product data
  if (!product || !product._id || !product.productName || product.productPrice === undefined) {
    return (
      <Button disabled className="w-full">
        Product Unavailable
      </Button>
    )
  }

  return (
    <Button onClick={handleAddToCart} disabled={isAdding} className="w-full">
      {isAdding ? 'Adding...' : `Add to Cart - $${product.productPrice}`}
    </Button>
  )
}
