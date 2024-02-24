
import {NextResponse} from 'next/server'

import prisma from '@/libs/db'

export const GET = async (req: Request, {params: {productId}}: { params: { productId: string } }) => {

  try {

    const product = await prisma.product.findUnique({
      where: {
        id: productId
      },

      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        discountedPrice: true
      }
    })

    return NextResponse.json(product)
  }

  catch(err) {
    
    return NextResponse.json({error: "error fetching product"}, {status: 500})
  }
}