
import {NextResponse} from 'next/server'

import prisma from '@/libs/db'

export const GET = async () => {

  try {

    const banner = await prisma.homeHeroBanner.findFirst()

    return NextResponse.json(banner)
  }

  catch(err) {

    return NextResponse.json({error: "error fetching home hero banner."}, {status: 500})
  }
}