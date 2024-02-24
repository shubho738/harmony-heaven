
import useSWR from 'swr'

import fetcher from '@/libs/fetcher'


const useProductImage = (productId: string) => {

   const { data, error, isLoading, mutate } = useSWR<string | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/image`, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useProductImage