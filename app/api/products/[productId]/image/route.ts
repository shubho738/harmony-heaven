
import {NextResponse} from 'next/server'

import prisma from '@/libs/db'

export const GET = async (req: Request, {params: {productId}}: {params: { productId: string }})  => {

  try {
    const product = await prisma.product.findUnique({

      where: {
        id: productId
      },

      select: {
        images: true
      }
    })

    return NextResponse.json(product?.images[0])
  }

  catch(err) {
    
    return NextResponse.json({error: "error fetching product image."}, {status: 500})
  }
}