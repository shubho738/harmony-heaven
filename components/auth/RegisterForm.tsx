
'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import { signIn } from 'next-auth/react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'

import validateEmail from '@/libs/helpers/validateEmail'
import validateNameCharLimit from '@/libs/helpers/validateNameCharLimit'
import validatePasswordCharLimit from '@/libs/helpers/validatePasswordCharLimit'
import Form from '../ui/Form'
import Input from '../ui/Input'

const RegisterForm = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()


  const onRegister = async (e: React.FormEvent<HTMLButtonElement>) => {

    e.preventDefault()

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required.", {id: "emptyFields"})
      return
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.', { id: 'invalidEmail' })
      return
    }

    const nameValid = validateNameCharLimit(name)
    const passwordValid = validatePasswordCharLimit(password)

    if (!nameValid) {
      toast.error("Name length exceeds the limit of 50 characters.", {id: "nameTooLong"})
      return
    }

    if (!passwordValid) {
      toast.error("Password length exceeds the limit of 64 characters.", {id: "passwordTooLong"})
      return
    }

    setIsLoading(true)

    try {

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        name,
        email,
        password
      })

      toast.success("Registration successful.")

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })


      if (result?.error) {
        toast.error("There was an error while loggin in.")
      } 
      
      else {
        router.push('/')
      }

    }

    catch(err) {
      toast.error('Registration failed.')
    }

    finally {
      setIsLoading(false)
    }

  }


  return (
   <div
     className="flex flex-col items-center"
   >
    <h1>
      Welcome to HarmonyHeaven
    </h1>

    <div
      className="mt-4 w-full max-w-[20rem]"
    >
      <Form
        onCTA={onRegister}
        ctaLabel="Sign up"
        disabled={isLoading || !name.trim() || !email.trim() || !password.trim()}
        isSubmitting={isLoading}
      >

        <Input
          placeholder="Name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
          disabled={isLoading}
        />

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
          disabled={isLoading}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </Form>
    </div>

    <span
      className="mt-4"
    >
      Already have an account? {' '}
      <Link
        href="/login"
      >
        <span
          className="text-neutral-md hover:underline"
        > 
          Sign in
        </span>
      </Link>
    </span>

   </div>
  )
}

export default RegisterForm