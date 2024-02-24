
'use client'
import {useCallback} from 'react'
import {usePathname, useRouter, useSearchParams} from "next/navigation"

import type {Product, Sort} from '@/libs/types'
import {sortOptions} from '@/config/products'
import ProductCard from '../ui/ProductCard'
import GridContainer from '../ui/GridContainer'
import Pagination from '../ui/Pagination'

interface ProductsProps {
  products: Product[];
  productCount: number;
  pageSize: number;
}

const Products = ({products, productCount, pageSize}: ProductsProps) => {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sort = searchParams.get("sort") ?? sortOptions[0].type
  const currentPage = Number(searchParams.get("currentPage")) || 1


  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )


  const onSelectSort = (sortType: Sort) => {

    const newQuery = createQueryString({
        sort: sortType,
      })

    router.push(
      `${pathname}?${newQuery}`
      )
  }


  return (
    <div
      className="space-y-12"
    >

      <div
        className="flex flex-col sm:flex-row gap-4"
      >
        <span
          className="text-neutral-md"
        >
          Sort by :
        </span>
        
        <div
          className="flex flex-col sm:flex-row gap-x-4 gap-y-2"
        >
          {sortOptions?.map(option => (
            <div 
              key={option.type}
              onClick={() => onSelectSort(option.type)}
              className={`cursor-pointer hover:underline ${sort === option.type ? "font-semibold" : ""}`}
            >
              {option.label}
            </div>
            ))}
        </div>
      </div>

      <GridContainer>

        {products?.map(product => (
         
           <div
             key={product?.id}
             className="w-full max-w-[22rem] mx-auto"
           >
             <ProductCard
               product={product}
              />
           </div>
         
        ))}
    </GridContainer>

    <Pagination
      productCount={productCount}
      pageSize={pageSize}
      currentPage={currentPage}
    />
      
  </div>
  )
}

export default Products