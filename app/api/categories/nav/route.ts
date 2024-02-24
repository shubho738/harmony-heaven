
import {NextResponse} from 'next/server'

import prisma from '@/libs/db'

export const GET = async () => {

  try {

    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true
      },

      take: 3
    })

    return NextResponse.json(categories)
  }

  catch(err) {
    
    return NextResponse.json({error: "error fetching categories"}, {status: 500})
  }
}