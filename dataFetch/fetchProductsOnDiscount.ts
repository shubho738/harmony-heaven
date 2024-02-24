
import type { Product } from '@/libs/types'


const fetchProductsOnDiscount = async (): Promise<Product[]> => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/discount`, {cache: "no-store"})

  if (!res.ok) throw new Error("Sorry, couldn't fetch products on discount.")

  return res.json()
}


export default fetchProductsOnDiscount