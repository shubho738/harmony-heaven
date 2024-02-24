
import {type NextRequest, NextResponse} from 'next/server'

import type {Product, Sort} from '@/libs/types'
import prisma from '@/libs/db'
import {getOrderByClause, sortByPrice} from '@/libs/helpers/productsSorting'

export const GET = async (req: NextRequest, {params: {categoryName}}: { params: { categoryName: string } }) => {

  const searchParams = req.nextUrl.searchParams

  const sort = searchParams.get('sort') ?? "newest"
  const orderByClause = getOrderByClause(sort as Sort)

  const pageNum = Number(searchParams.get('currentPage')) || 1
  const itemsPerPage = Number(searchParams.get('pageSize')) || 5


  try {

    const category = await prisma.category.findUnique({
      where: {
        name: categoryName
      },
      select: {
        products: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            discountedPrice: true
          },
          orderBy: orderByClause,
          skip: (pageNum - 1) * itemsPerPage,
          take: itemsPerPage
        }
      }
    })

    const products = await prisma.category.findUnique({
      where: {
        name: categoryName
      },
      select: {
        products: {
          select: {
            id: true
          }
        }
      }
    })

    let sortedProducts: Product[] = category?.products || []

    if (sort === 'priceLowToHigh') {
      sortedProducts = sortByPrice(sortedProducts)
    }

    else if (sort === 'priceHighToLow') {
      sortedProducts = sortByPrice(sortedProducts, true)
    }

    const productCount = products?.products.length || 0

    return NextResponse.json({products: sortedProducts, productCount})
  }

  catch(err) {
   
    return NextResponse.json({error: "error fetching products"}, {status: 500})
  }
}
