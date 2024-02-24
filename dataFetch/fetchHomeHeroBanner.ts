
import type {HomeHeroBanner} from '@/libs/types'

const fetchHomeHeroBanner = async (): Promise<HomeHeroBanner> => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/homeHeroBanner`, {next: {revalidate: 86400000}})
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/homeHeroBanner`, {cache: "no-store"})

  if (!res.ok) throw new Error("Sorry, Couldn't fetch home hero banner.")

  return res.json()
}


export default fetchHomeHeroBanner