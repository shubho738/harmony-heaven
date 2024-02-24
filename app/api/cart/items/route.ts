
import {type NextRequest, NextResponse} from 'next/server'
import { getServerSession } from 'next-auth/next'

import authOptions from '@/libs/authOptions'
import prisma from '@/libs/db'


export const GET = async (req: NextRequest) => {

  try {

    const session = await getServerSession(authOptions)

    if (session?.user?.email) {

      const user = await prisma.user.findUnique({
        where: {
          email: session?.user?.email
        },
        select: {
        cart: {
          select: {
            cartItems: true,
          },
        },
      }
      })

      return NextResponse.json(user?.cart?.cartItems)
    }


    else {

      let cartId = req.cookies.get("cartId")?.value

      if (!cartId) return NextResponse.json({error: "cartId cookie not present"}, {status: 400})

      const cart = await prisma.cart.findUnique({
        where: {
          id: cartId
        },

        select: {
          cartItems: true
        }
      })

      if (!cart || !cart.cartItems) {
        return NextResponse.json({ error: "No cart items found" }, {status: 404})
      }
      
      return NextResponse.json(cart?.cartItems)
      }
  }

  catch(err) {
    
    return NextResponse.json({error: "error fetching cart items."}, {status: 500})
  }
}