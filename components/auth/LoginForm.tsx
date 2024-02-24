
'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import toast from 'react-hot-toast'

import validateEmail from '@/libs/helpers/validateEmail'
import validatePasswordCharLimit from '@/libs/helpers/validatePasswordCharLimit'
import Form from '../ui/Form'
import Input from '../ui/Input'

const LoginForm = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()


  const onLogin = async (e: React.FormEvent<HTMLButtonElement>) => {

    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      toast.error("All fields are required.", {id: "emptyFields"})
      return
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.', { id: 'invalidEmail' })
      return
    }

    const passwordValid = validatePasswordCharLimit(password)

    if (!passwordValid) {
      toast.error("Password length exceeds the limit of 64 characters.", {id: "passwordTooLong"})
      return
    }

    setIsLoading(true)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setIsLoading(false)

    if (result?.error) {
      toast.error("There was an error.", {id: "loginError"})
    } 

    else {
      router.push('/')
      toast.success('Logged in.')
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
        onCTA={onLogin}
        ctaLabel="Sign In"
        disabled={isLoading || !email.trim() || !password.trim()}
        isSubmitting={isLoading}
      >

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
      Don&apos;t have an account? {' '}
      <Link
        href="/register"
      >
        <span
          className="text-neutral-md hover:underline"
        > 
          Register
        </span>
      </Link>
    </span>

   </div>
  )
}

export default LoginForm