
'use client'

import {useEffect} from 'react'

import type { CartItem } from '@/libs/types'
import useCart from '@/hooks/useCart'
import useCartActions from '@/hooks/useCartActions'
import Checkout from '@/components/ui/Checkout'
import Button from '../ui/Button'

interface PaymentStatusHandlerProps {
  success: string;
}

const PaymentStatusHandler = ({success}: PaymentStatusHandlerProps) => {

  const {data: cartItems}: {data: CartItem[] | undefined;} = useCart()
  const {clearCart}: {clearCart: () => void;} = useCartActions()

  useEffect(() => {
    if (success === "true") clearCart()

  }, [success])

  return (
    <section
      className="min-h-[35vh] md:min-h-[30vh]"
    >
      {success === "true" && (

        <div
          className="space-y-12"
        >
          <h2 
            className="text-xl"
          >
            Order placed successfully.
          </h2>

          <div
            className="flex flex-col gap-4"
          >
            <span
              className="text-xl"
            >
              Check out some Keyboards :
            </span>

            <Button
              label="Shop Keyboards"
              href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/categories/keyboards`}
            />

          </div>
        </div>
        )}

      {success === "false" && (
        <div
          className="space-y-12"
        >
          <h2 
            className="text-xl"
          >
            Sorry, there was an error while placing your order.
          </h2>

          <div
            className="space-y-6"
          >
            <span
              className="text-lg"
            >
              Please, try again
            </span>

            <Checkout
              cartItems={cartItems ?? []} 
            />
          </div>
        </div>
        )}
    </section>
  )
}

export default PaymentStatusHandler