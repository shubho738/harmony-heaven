
import useSWR from 'swr'

import type {User} from '@/libs/types'
import fetcher from '@/libs/fetcher'

const useCurrentUser = () => {

   const { data, error, isLoading, mutate } = useSWR<User | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/users/current`, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useCurrentUser