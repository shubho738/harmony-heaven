
import type {Product} from '@/libs/types'

const fetchProduct = async (productId: string): Promise<Product> => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {cache: "no-store"})

  if (!res.ok) throw new Error("Couldn't fetch product.")

  return res.json()
}


export default fetchProduct