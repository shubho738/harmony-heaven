
const fetchProductImage = async (productId: string): Promise<string> => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/image`, {cache: "no-store"})

  if (!res.ok) throw new Error("Couldn't fetch product image.")

  return res.json()
}


export default fetchProductImage