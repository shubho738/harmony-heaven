
'use client'

import {useDispatch} from 'react-redux'
import Link from 'next/link'
import {signOut} from 'next-auth/react'
import {User, LogOut} from 'lucide-react'
import toast from 'react-hot-toast'
import {ClipLoader} from 'react-spinners'

import type { User as UserType } from '@/libs/types'
import useCurrentUser from '@/hooks/useCurrentUser'
import { closeProfileActionsModal } from '@/redux/features/modalSlice'
import Modal from './Modal'


interface ProfileActionsModalProps {
  customModalOverlayStyles?: string;
}


const ProfileActionsModal = ({customModalOverlayStyles}: ProfileActionsModalProps) => {

  const {data: currentUser, isLoading: isLoadingCurrentUser}: {data: UserType | undefined, isLoading: boolean} = useCurrentUser()

  const dispatch = useDispatch()

  const onModalClose = (e: React.MouseEvent) => {

    e.stopPropagation()
    dispatch(closeProfileActionsModal())
  }

  const onLogout = async () => {
    
    try {
      await signOut({ callbackUrl: "/login" })
    }

    catch(err) {
      toast.error("Sorry, there was an error.")
    }
  }


  return (
    <Modal
      title="Profile"
      onClose={onModalClose}
      customOverlayStyles={`backdrop-blur-none bg-transparent ${customModalOverlayStyles}`}
      customStyles="w-full max-w-[19rem]"
      customBodyStyles="pb-8 pt-0 overflow-y-auto"
    >
      <div>

       {isLoadingCurrentUser ? (
        <div
          className="flex justify-center mt-2"
        >
          <ClipLoader
            size={22} 
          />
        </div>
       ) : (
        <div
          className="flex flex-col mt-2"
        >
          <span
            className="truncate"
          >
            {currentUser?.name}
          </span>
          <span
            className="truncate text-neutral-md text-sm"
          >
            {currentUser?.email}
          </span>
        </div>
       )}

        <div
          className="space-y-6 mt-8"
        >
          <Link
            onClick={onModalClose}
            href="/profile"
            className="flex gap-4 cursor-pointer hover:underline"
          >
            <User
              size={20} 
            />
            <span>Edit Profile</span>
          </Link>

          <div
            onClick={onLogout}
            className="flex gap-4 cursor-pointer hover:underline"
          >
            <LogOut
              size={20}
            />
            <span>Log Out</span>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ProfileActionsModal