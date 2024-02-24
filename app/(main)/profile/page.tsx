
import {getServerSession} from 'next-auth/next'
import { redirect } from "next/navigation"

import authOptions from '@/libs/authOptions'
import SectionBase from '@/components/layouts/SectionBase'
import ProfileUpdateForm from '@/components/auth/ProfileUpdateForm'

const ProfilePage = async () => {

  const session = await getServerSession(authOptions)

  if (!session?.user) {

    redirect("/login")
  }

  return (
    <>
      <SectionBase
        customStyles="pt-6 pb-20"
      >
          <h1
            className="text-2xl font-semibold capitalize"
          >
            Update Your Profile
          </h1>

          <ProfileUpdateForm />
      </SectionBase>
    </>
  )
}

export default ProfilePage