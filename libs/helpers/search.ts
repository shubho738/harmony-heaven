
import type { SearchResults } from '../types'
import prisma from '../db'

export const performSearch = async (keyword: string): Promise<SearchResults> => {

  try {

    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        name: { contains: keyword, mode: 'insensitive' }
      },

      take: 5
    })

    const categoryIds = categories.map((category) => category.id)


    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        OR: [
          { name: { contains: keyword, mode: 'insensitive' } },
          { categoryId: { in: categoryIds } }
        ]
      },
      take: 5
    })

    return {products, categories}
  }

  catch(err) {

    throw new Error('An error occurred while searching.')
  }
}