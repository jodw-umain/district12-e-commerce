import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import {ProductQueryResult} from '@/sanity.types'

type Product = NonNullable<ProductQueryResult>

export interface CartItem {
  _id: string
  productName: string
  productPrice: number
  quantity: number
  picture?: Product['picture']
  author?: Product['author']
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product | undefined) => void // Allow undefined
  decreaseQuantity: (id: string) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          // Early return if product is undefined or invalid
          if (!product) {
            console.error('Product is undefined')
            return state
          }

          if (!product._id) {
            console.error('Product missing _id:', product)
            return state
          }

          if (!product.productName) {
            console.error('Product missing productName:', product)
            return state
          }

          if (product.productPrice === undefined || product.productPrice === null) {
            console.error('Product missing productPrice:', product)
            return state
          }

          const existingItem = state.items.find((item) => item._id === product._id)

          if (existingItem) {
            // Item exists, increase quantity
            return {
              items: state.items.map((item) =>
                item._id === product._id ? {...item, quantity: item.quantity + 1} : item,
              ),
            }
          } else {
            // New item, add to cart
            const newItem: CartItem = {
              _id: product._id,
              productName: product.productName,
              productPrice: product.productPrice,
              quantity: 1,
              picture: product.picture,
              author: product.author,
            }
            return {
              items: [...state.items, newItem],
            }
          }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item._id !== id),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((item) => (item._id === id ? {...item, quantity: item.quantity - 1} : item))
            .filter((item) => item.quantity > 0), // Remove items with 0 quantity
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item._id !== id)
              : state.items.map((item) => (item._id === id ? {...item, quantity} : item)),
        })),

      clearCart: () => set({items: []}),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.productPrice * item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
    },
  ),
)
