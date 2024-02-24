
import {type NextRequest, NextResponse} from 'next/server'
import { getServerSession } from "next-auth/next"

import authOptions from '@/libs/authOptions'
import prisma from '@/libs/db'


export const POST = async (req: NextRequest) => {

  const {productId, productName, price, quantity}: {productId: string; productName: string; price: number; quantity: number;} = await req.json()

  if (!productId || !productName || !price || !quantity) return NextResponse.json({error: "missing required parameters."}, {status: 400})


  try {

    const response = NextResponse.json({success: true})

    const session = await getServerSession(authOptions)

    let cartId: string | null | undefined

    if (session?.user) {

      const email = session.user.email

      const user = await prisma.user.findUnique({
        where: {
          email: email  ?? undefined,
        },
        select: {
          cartId: true,
        },
      })

      cartId = user?.cartId

      if (!cartId) {

        const newCart = await prisma.cart.create({})
        cartId = newCart?.id

        await prisma.user.update({
          where: {
            email: email ?? undefined,
          },
          data: {
            cartId,
          },
        })
      }
    } 

    else {
  
      const guestCartId: string | undefined = req.cookies.get("cartId")?.value

      if (!guestCartId) {

        const newCart = await prisma.cart.create({})
        cartId = newCart?.id

        response.cookies.set({
          name: 'cartId',
          value: cartId,
        })
      }

      else cartId = guestCartId
    }


    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        productId,
        cartId,
      },
    })

    if (existingCartItem) {

      await prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: {
            increment: quantity,
          },
        },
      })
    } 

    else {

      await prisma.cartItem.create({
        data: {
          productId,
          productName,
          price,
          quantity,
          cartId,
        },
      })
    }


    return response
  }

  catch(err) {
    console.log(err)
    
    return NextResponse.json({error: "error adding product to cart."}, {status: 500})
  }
}