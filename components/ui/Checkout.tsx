
'use client'

import {useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import type {CartItem} from '@/libs/types'
import Button from './Button'

interface CheckoutProps {
  cartItems: CartItem[];
}

const Checkout = ({cartItems}: CheckoutProps) => {

  const [isLoading, setIsLoading] = useState(false)

  const onCheckout = async () => {

    setIsLoading(true)

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        cartItems
      })

      window.location = res.data.url
    }

    catch(err) {
      toast.error("Sorry, there was an error.")
    }

    finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      label="Checkout"
      onClick={onCheckout}
      disabled={isLoading}
      isLoading={isLoading}
    />
  )
}

export default Checkout