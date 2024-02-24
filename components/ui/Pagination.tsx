
'use client'

import {useMemo} from 'react'
import {useRouter, usePathname, useSearchParams} from 'next/navigation'
import toast from 'react-hot-toast'

import Button from './Button'

interface PaginationProps {
  currentPage: number;
  productCount: number;
  pageSize: number;
}

const Pagination = ({currentPage, productCount, pageSize}: PaginationProps) => {


  const totalPages = Math.ceil(productCount / pageSize)

  const range: number[] = useMemo(() => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }, [totalPages])

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()


  const onNavigate = (page: number) => {

    try {

      const queryParams = new URLSearchParams(searchParams?.toString())

      if (queryParams.has('currentPage')) {
        queryParams.delete('currentPage')
      }

      queryParams.set('currentPage', String(page))

      const newUrl = `${pathname}?${queryParams.toString()}`
      
      router.push(newUrl)
    }

    catch(err) {
      toast.error("Sorry, there was an error.")
    }

  }


  return (
    <div
      className="flex justify-center gap-4"
    >
      {range.map(page => (
        
          <Button
            key={page}
            onClick={() => onNavigate(page)}
            label={String(page)}
            customStyles={page == currentPage ? "bg-neutral-md text-neutral-light" : ""}
          />
        ))}
    </div>
  )
}

export default Pagination