
import { NextResponse } from 'next/server'

import type {User} from '@/libs/types'
import currentUser from '@/libs/helpers/currentUser'


export const GET = async () => {

  try {

    const currentUserData: User = await currentUser()

    return NextResponse.json(currentUserData)
  } 

  catch (err) {
   
    return NextResponse.json({ error: 'error fetching current user data.'}, {status: 500})
  }
}
