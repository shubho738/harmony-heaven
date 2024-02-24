
import type { Product, Sort } from '@/libs/types'

const fetchProductsForCategory = async (categoryName: string, sort?: Sort | undefined, currentPage: number = 1 , pageSize: number = 5): Promise<{ products: Product[], productCount: number }> => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryName}/products?sort=${sort}&currentPage=${currentPage}&pageSize=${pageSize}`, {next: {revalidate: 86400000}})

  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryName}/products?sort=${sort}&currentPage=${currentPage}&pageSize=${pageSize}`, {cache: "no-store"})

  if (!res.ok)  throw new Error("Couldn't fetch products.")

  return res.json()
}


export default fetchProductsForCategory