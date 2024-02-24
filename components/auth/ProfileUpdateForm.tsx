
'use client'

import {useState, useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import type {User} from '@/libs/types'
import validateNameCharLimit from '@/libs/helpers/validateNameCharLimit'
import useCurrentUser from '@/hooks/useCurrentUser'
import Form from '../ui/Form'
import Input from '../ui/Input'

const ProfileUpdateForm = () => {

  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const {data: currentUser}: {data: User | undefined} = useCurrentUser()


  useEffect(() => {

    setName(currentUser?.name ?? "")
  }, [currentUser?.name])



  const onProfileUpdate = async (e: React.FormEvent<HTMLButtonElement>) => {

    e.preventDefault()

    if (!name.trim()) {
      toast.error("Name can't be empty", {id: "emptyField"})
      return
    }

    const nameValid = validateNameCharLimit(name)

    if (!nameValid) {
      toast.error("Name length exceeds the limit of 50 characters.", {id: "nameTooLong"})
      return
    }

    setIsLoading(true)

    try {

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/updateProfile`, {
        name
      })

      toast.success("Profile updated.")

    }

    catch(err) {

      toast.error('There was an error.')
    }

    finally {
      setIsLoading(false)
    }

  }


  return (
   <div
     className="flex flex-col items-center justify-center min-h-[40vh]"
   >

    <div
      className="mt-4 w-full max-w-[25rem]"
    >
      <Form
        onCTA={onProfileUpdate}
        ctaLabel="Update Profile"
        disabled={isLoading || !name.trim()}
        isSubmitting={isLoading}
      >

        <Input
          placeholder="Name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
          disabled={isLoading}
        />

      </Form>
    </div>

   </div>
  )
}

export default ProfileUpdateForm