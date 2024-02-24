
const fetchProductImages = async (productId: string): Promise<string[]> => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/images`, {cache: "no-store"})

  if (!res.ok) throw new Error("Couldn't fetch product images.")

  return res.json()
}


export default fetchProductImages