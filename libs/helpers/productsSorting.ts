
import { Prisma } from '@prisma/client'

import type {Sort, Product} from '../types'

export const getOrderByClause = (sortOption: Sort) => {

  switch (sortOption) {

    case 'newest':
      return { createdAt: Prisma.SortOrder.desc }

    case 'priceLowToHigh':
      return { price: Prisma.SortOrder.asc }

    case 'priceHighToLow':
      return { price: Prisma.SortOrder.desc }

    default:
      return { createdAt: Prisma.SortOrder.desc }
  }
}

export const sortByPrice = (products: Product[], reverseOrder: boolean = false) => {
  
  return products.sort((a, b) => {
    const aPrice = a.discountedPrice || a.price
    const bPrice = b.discountedPrice || b.price

    const orderFactor = reverseOrder ? -1 : 1

    return orderFactor * (aPrice - bPrice)
  })
}