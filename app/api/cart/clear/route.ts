
import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'

import authOptions from '@/libs/authOptions'
import prisma from '@/libs/db'


export const DELETE = async (req: NextRequest) => {

  try {

    const session = await getServerSession(authOptions)

    let cartId = session?.user ? (await prisma.user.findUnique({
      where: { email: session.user.email ?? undefined },
      select: { cartId: true },
    }))?.cartId : req.cookies.get("cartId")?.value

    if (!cartId) return NextResponse.json({ error: "cartId not present" }, { status: 400 })

    await prisma.cartItem.deleteMany({
      where: {
        cartId
      }
    })
    

    return NextResponse.json({ success: true })
  }

  catch(err) {
    
    return NextResponse.json({error: "error clearing cart."}, {status: 500})
  }
}