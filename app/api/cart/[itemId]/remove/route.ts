
import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'

import authOptions from '@/libs/authOptions'
import prisma from '@/libs/db'

export const DELETE = async (req: NextRequest, {params: {itemId}}: {params: { itemId: string }}) => {

  if (!itemId) return NextResponse.json({ error: "missing required itemId parameter." }, { status: 400 })

  try {

    const session = await getServerSession(authOptions)

    let cartId = session?.user ? (await prisma.user.findUnique({
      where: { email: session.user.email ?? undefined },
      select: { cartId: true },
    }))?.cartId : req.cookies.get("cartId")?.value

    if (!cartId) return NextResponse.json({ error: "cartId not present" }, { status: 400 })

    const deletedItem = await prisma.cartItem.delete({
      where: { id: itemId, cartId }
    })

    if (!deletedItem) return NextResponse.json({ error: "item not found in the cart" }, { status: 404 })

    return NextResponse.json({ success: true })
  } 

  catch (err) {
   
    return NextResponse.json({ error: "error removing cart item" }, { status: 500 })
  }
}
