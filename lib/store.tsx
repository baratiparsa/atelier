'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import type { Product } from './products'

type CartItem = { product: Product; quantity: number }
type Store = { items: CartItem[]; add: (product: Product) => void; remove: (id: number) => void; count: number; subtotal: number }
const CartContext = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const add = (product: Product) => setItems((current) => {
    const found = current.find((item) => item.product.id === product.id)
    return found ? current.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { product, quantity: 1 }]
  })
  const remove = (id: number) => setItems((current) => current.filter((item) => item.product.id !== id))
  const value = useMemo(() => ({ items, add, remove, count: items.reduce((sum, item) => sum + item.quantity, 0), subtotal: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) }), [items])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useStore() {
  const value = useContext(CartContext)
  if (!value) throw new Error('useStore must be used inside StoreProvider')
  return value
}
