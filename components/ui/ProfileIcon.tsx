
'use client'

import Link from 'next/link'
import {User2} from 'lucide-react'
import {useSelector, useDispatch} from 'react-redux'
import { useSession } from "next-auth/react"

import { RootState } from '@/redux/store'
import { openProfileActionsModal } from '@/redux/features/modalSlice'
import IconContainer from './IconContainer'
import ProfileActionsModal from './modals/ProfileActionsModal'


const ProfileIcon = () => {

  const {isProfileActionsModalOpen} = useSelector((state: RootState) => state.modal)

  const dispatch = useDispatch()

  const { status } = useSession()

  if (status === "authenticated") {

    return (

      <div
        onClick={() => dispatch(openProfileActionsModal())}
        className="relative"
      >
        <IconContainer
          icon={User2}
          size={18}
          tooltipText="Profile"
        />

        {isProfileActionsModalOpen && (
          <ProfileActionsModal
            customModalOverlayStyles="absolute w-[16rem] -left-52"
           />
          )}
      </div>
      )
  }


  return (
    
      <Link
        href="/login"
      >
        <IconContainer
          icon={User2}
          size={18}
          tooltipText="Profile"
        />
      </Link>
  )
}

export default ProfileIcon