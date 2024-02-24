
import type { Category } from '@/libs/types'

const fetchCategories = async (): Promise<Category[]> => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {cache: "no-store"})

  if (!res.ok) throw new Error("Sorry, couldn't fetch categories.")

  return res.json()
}


export default fetchCategories