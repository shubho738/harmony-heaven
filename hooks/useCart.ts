
import useSWR from 'swr'

import type {CartItem} from '@/libs/types'
import fetcher from '@/libs/fetcher'


const useCart = () => {

  const {data, error, isLoading, mutate} = useSWR<CartItem[] | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/cart/items`, fetcher)

  return {data, error, isLoading, mutate}
}

export default useCart