
import { useEffect, useState } from 'react'
import axios from 'axios'

import type { Product, CartItem } from '@/libs/types'

const fetchProductPrice = async (productId: string): Promise<number> => {

  try {
    const res = await axios.get<Product>(`/api/products/${productId}`)
    const { price, discountedPrice } = res.data || {}
    
    return discountedPrice ?? price ?? 0
  } 
  
  catch (error) {
    throw new Error("Error fetching product price")
  }
}

const useSubtotal = (cartItems: CartItem[]): { subtotal: number | null; isLoading: boolean; error: any } => {
  const [subtotal, setSubtotal] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  useEffect(() => {

    const calculateSubtotal = async () => {
      try {
        setIsLoading(true)
        const prices = await Promise.all(
          cartItems.map(async (item) => {
            const productPrice = await fetchProductPrice(item.productId)
            return productPrice * item.quantity
          })
        )
        const result = prices.reduce((total, price) => total + price, 0)
        setSubtotal(result)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    calculateSubtotal()
  }, [cartItems])

  return { subtotal, isLoading, error }
}

export default useSubtotal
