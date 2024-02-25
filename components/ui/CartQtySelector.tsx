
'use client'

import {useState} from 'react'
import {Minus, Plus} from 'lucide-react'

import type {Product, ProductToAdd, CartItem} from '@/libs/types'
import useCart from '@/hooks/useCart'
import useCartActions from '@/hooks/useCartActions'
import Button from './Button'
import AddToCart from './AddToCart'

interface CartQtySelectorProps {
  product: Product;
  autoAddToCart?: boolean;
}

const CartQtySelector = ({product, autoAddToCart}: CartQtySelectorProps) => {

  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)

  const isProductEmpty = Object.keys(product).length === 0

  const {id: productId, name: productName, price, discountedPrice} = product

  const {data: cartItems, isLoading: isLoadingCartItems}: {data: CartItem[] | undefined; isLoading: boolean;} = useCart()
  const {addToCart}: {addToCart: (productToAdd: ProductToAdd, successMsg?: string) => void} = useCartActions()

  const productQuantityInCart = cartItems?.find((item) => item.productId === productId)?.quantity ?? 0


  const onQuantityUpdate = async (type: "add" | "remove") => {

    const msg = "Quanity updated"

    if (type === "add") {
    
      if (autoAddToCart) {

        setIsAdding(true)

        const productToAdd = {
          productId,
          productName,
          price,
          quantity: 1
        }

        await addToCart(productToAdd, msg)

        setIsAdding(false)
      }

      else {
        setQuantity(prev => prev + 1)
      }
    }

    else if (productQuantityInCart > 1 && type === "remove") {
    
      if (autoAddToCart) {

        setIsRemoving(true)

        const productToAdd = {
          productId,
          productName,
          price: price,
          quantity: -1
        }

        await addToCart(productToAdd, msg)

        setIsRemoving(false)
      }

      else if (quantity > 1) {
        setQuantity(prev => prev - 1)
      }
    }
  }


  return (
    <div>
      <div
        className="flex items-center gap-4"
      >
        <div
          className="flex items-center gap-4 border border-border-md p-1"
        >
      
          <Button
            onClick={() =>onQuantityUpdate("remove")}
            icon={Minus}
            disabled={isProductEmpty || isRemoving || isAdding}
            isLoading={isRemoving}
            customStyles="py-px px-1 bg-btn-secondary"
          />

          <div
            className="w-12 flex justify-center"
          >
            <span>{autoAddToCart ? productQuantityInCart : quantity}</span>
          </div>

          <Button
            onClick={() =>onQuantityUpdate("add")}
            icon={Plus}
            disabled={isProductEmpty || isAdding || isRemoving}
            isLoading={isAdding}
            customStyles="py-px px-1 bg-btn-secondary"
          />
        </div>

        {!autoAddToCart && (
          <AddToCart
            product={product}
            quantity={quantity}
            showIcon 
          />
          )}
      </div>
    </div>
  )
}

export default CartQtySelector