
'use client' 

import {useDispatch} from 'react-redux'
import {ShoppingCart} from 'lucide-react'

import { CartItem } from '@/libs/types'
import useCart from '@/hooks/useCart'
import {openCartPreviewModal} from '@/redux/features/modalSlice'
import IconContainer from './IconContainer'


const CartPreview = () => {

  const {data: cartItems}: {data: CartItem[] | undefined;} = useCart()
  const cartItemsCount = cartItems?.reduce((total, item) => total + item.quantity, 0)

  const dispatch = useDispatch()
  const onCartPreviewClick = () => dispatch(openCartPreviewModal())


  return (
    <div
      onClick={onCartPreviewClick}
      className="relative"
    >
      <IconContainer
        icon={ShoppingCart}
        size={18}
      />

      {( cartItemsCount ?? 0) > 0 && (
        <div
          className="absolute -top-4 -right-3 bg-accent text-neutral-light w-6 aspect-square flex justify-center items-center text-xs rounded-full"
        >
          {cartItemsCount}
        </div>
        )}
    </div>
  )
}

export default CartPreview