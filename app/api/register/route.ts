
import { type NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

import prisma from '@/libs/db'


export const POST = async (req: NextRequest) => {

  const { name, email, password }: {name: string, email: string, password: string} = await req.json()

  if (!name || !email || !password) return NextResponse.json({ error: 'missing required parameters.' }, { status: 400 })

  try {

    const hashedPassword = await bcrypt.hash(password, 13)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword
      },
    })


    const guestCartId = req.cookies.get('cartId')?.value

    if (guestCartId) {

      await prisma.cart.update({
        where: {
          id: guestCartId,
        },
        data: {
          users: {
            connect: {
              id: newUser.id,
            },
          },
        },
      })
    }

    const response = NextResponse.json({ success: true })
    
    if (guestCartId) response.cookies.delete('cartId')

    return response
  } 

  catch (err) {
   
    return NextResponse.json({ error: 'error during registration.'}, {status: 500})
  }
}
