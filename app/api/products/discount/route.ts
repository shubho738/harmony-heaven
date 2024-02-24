
import { NextResponse } from 'next/server'

import type {Product} from '@/libs/types'
import shuffleArray from '@/libs/helpers/shuffleArray'
import prisma from '@/libs/db' 

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: {
          where: {
            NOT: {
              discountedPrice: null
            }
          },
          select: {
            id: true,
            name: true,
            price: true,
            discountedPrice: true,
          },
          take: 2
        }
      }
    })

    let productsOnDiscount: Product[] = []

    for (const category of categories) {
      productsOnDiscount.push(...category.products)
    }

    productsOnDiscount = shuffleArray(productsOnDiscount)

    productsOnDiscount = productsOnDiscount.slice(0, 8)

    return NextResponse.json(productsOnDiscount)
  } 
  
  catch (err) {
    
    return NextResponse.json({ error: "error fetching products on discount" }, { status: 500 })
  }
}
