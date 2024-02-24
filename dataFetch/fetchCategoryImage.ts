
const fetchCategoryImage = async (categoryId: string): Promise<string> => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}/image`, {cache: "no-store"})

  if (!res.ok) throw new Error("Couldn't fetch category image.")

  return res.json()
}


export default fetchCategoryImage