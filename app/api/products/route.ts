
import { type NextRequest, NextResponse } from 'next/server'

import type { Product } from '@/libs/types'
import prisma from '@/libs/db'


export const GET = async (req: NextRequest) => {

  const searchParams = req.nextUrl.searchParams
  const type = searchParams.get('type')

  try {

    let products: Product[] = []

    if (type === 'trending' || type === 'popular') {

      const categories = await prisma.category.findMany({
        include: {
          products: {
            where: {
              [type === 'trending' ? 'isTrending' : 'isPopular']: true,
            },
            select: {
              id: true,
              name: true,
              price: true,
              discountedPrice: true
            },
            take: 3
          }
        }
      })

      for (const category of categories) {
        products.push(...category.products)
      }

      products = products.slice(0, 8)
    }

    return NextResponse.json(products)

  } 
  
  catch (err) {
    return NextResponse.json({ error: "Error fetching products." }, { status: 500 })
  }
}
