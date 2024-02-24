
import {NextResponse} from 'next/server'

import prisma from '@/libs/db'

export const GET = async (req: Request, {params: {categoryName}}: {params: { categoryName: string }})  => {

  try {

    const category = await prisma.category.findUnique({

      where: {
        name: categoryName
      },

      select: {
        image: true
      }
    })

    return NextResponse.json(category?.image)
  }

  catch(err) {
    
    return NextResponse.json({error: "error fetching category image."}, {status: 500})
  }
}