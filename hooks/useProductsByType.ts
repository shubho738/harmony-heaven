
import useSWR from 'swr'

import type { Product } from '@/libs/types'
import fetcher from '@/libs/fetcher'


const useProductsByType = (type: string) => {

   const { data, error, isLoading, mutate } = useSWR<Product[] | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/products?type=${type}`, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useProductsByType