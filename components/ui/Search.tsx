
'use client'

import {Search as SearchIcon} from 'lucide-react'
import {useDispatch} from 'react-redux'

import {openSearchModal} from '@/redux/features/modalSlice'


const Search = () =>  {

  const dispatch = useDispatch()

  const onSearchIconClick = () => dispatch(openSearchModal())


  return (
    <div
      onClick={onSearchIconClick}
    >
      
      <SearchIcon
        className="cursor-pointer hover:opacity-80" 
      />
    </div>
  )
}

export default Search
