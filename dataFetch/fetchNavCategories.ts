
import type { Category } from '@/libs/types'

const fetchNavCategories = async (): Promise<Category[]> => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/nav`, {next: {revalidate: 86400000}})
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/nav`, {cache: "no-store"})

  if (!res.ok) throw new Error("Couldn't fetch nav categories.")

  return res.json()
}


export default fetchNavCategories