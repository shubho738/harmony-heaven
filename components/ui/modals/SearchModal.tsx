
'use client'

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import Link from 'next/link'
import {ClipLoader} from 'react-spinners'

import type {SearchResults} from '@/libs/types'
import { closeSearchModal } from '@/redux/features/modalSlice'
import useDebounce from '@/hooks/useDebounce'
import Modal from './Modal'
import Input from '../Input'

const SearchModal = () => {

  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<SearchResults | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const debouncedKeyword = useDebounce(keyword.trim())


  useEffect(() => {

    if (!debouncedKeyword) setResults(null)

    const fetchResults = async () => {

      setIsLoading(true)

      try {

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/search?keyword=${debouncedKeyword}`)
        setResults(res.data)

      } 

      catch(err) {
        toast.error("Sorry, there was an error", {id: "searchError"})
      }

      finally {
        setIsLoading(false)
      }

    }

    if (debouncedKeyword) fetchResults()

  }, [debouncedKeyword])


  const dispatch = useDispatch()

  const onModalClose = () => dispatch(closeSearchModal())

  return (
    <Modal
      title="Search for Products or Categories."
      onClose={onModalClose}
      customBodyStyles="pb-12"
    >

      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        fullWidth
        autoFocus
      />

      {isLoading && (
        <div
          className="mt-4 flex justify-center"
        >
          <ClipLoader />
        </div>
        )}

      {!isLoading && (results) && (
        <div className="space-y-4 mt-4">

          <div className="space-y-6">
            <div>
              <h2 className="text-sm text-neutral-md">Products:</h2>

              <ul className="mt-2 space-y-2">

                {results?.products?.length === 0 && (
                <span>Nothing found.</span>
                )}

                {results?.products?.map((product) => (
                  <li key={product.id} onClick={onModalClose} className="py-px px-1 hover:bg-hover-secondary hover:text-neutral-light transition">
                    <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/product/${product.id}`} className="block truncate">{product.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm text-neutral-md">Categories:</h2>

              <ul className="mt-2 space-y-2">

                {results?.categories?.length === 0 && (
                <span>Nothing found.</span>
                )}

                {results?.categories?.map((category) => (
                  <li key={category.id} onClick={onModalClose} className="py-px px-1 hover:bg-hover-secondary hover:text-neutral-light transition">
                    <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/categories/${category.name}`} className="block truncate">{category.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default SearchModal
