
import { getServerSession } from 'next-auth'

import type { User } from '../types'
import prisma from '@/libs/db'
import authOptions from '@/libs/authOptions'


const currentUser = async (): Promise<User> => {

  const session = await getServerSession(authOptions)

  if (!session)  throw new Error('You must be logged in.')

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },

    select: {
      id: true,
      name: true,
      email: true
    }
  })

  if (!user) throw new Error("error fetching current user.")

  return user
}

export default currentUser