
import {NextResponse} from 'next/server'

import type {CartItem} from '@/libs/types'
import stripe from '@/libs/stripe'


export const POST = async (req: Request) => {
  
  const {cartItems}: {cartItems: CartItem[]} = await req.json()


  try {

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.productName,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/order?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/order?success=false`,
    })

    return NextResponse.json({url: session.url})
  }

  catch (err) {
    console.log(err, 'checkout error')
    return NextResponse.json({error: "Failed to create checkout session"}, {status: 500})
  }
}