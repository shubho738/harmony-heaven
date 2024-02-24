
import { type NextRequest, NextResponse } from 'next/server'

import prisma from '@/libs/db'
import currentUser from '@/libs/helpers/currentUser'


export const POST = async (req: NextRequest) => {

  const { name }: {name: string} = await req.json()

  if (!name) return NextResponse.json({ error: "missing required 'name' parameter." }, { status: 400 })

  try {

    const {id: currentUserId}: {id: string} = await currentUser()


    await prisma.user.update({
      where: {
        id: currentUserId
      },
      data: {
        name
      }
    })

    return NextResponse.json({success: true})
  } 

  catch (err) {
   
    return NextResponse.json({ error: 'error while updatimg profile.'}, {status: 500})
  }
}
