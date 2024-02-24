
'use client'

import {useState} from 'react'
import {ShoppingCart} from 'lucide-react'

import type {Product, ProductToAdd} from '@/libs/types'
import useCartActions from '@/hooks/useCartActions'
import Button from './Button'

interface AddToCartProps {
  product: Product;
  quantity?: number;
  showIcon?: boolean;
  stopPropagation?: boolean;
}

const AddToCart = ({product, quantity, showIcon, stopPropagation}: AddToCartProps) => {

  const [isLoading, setIsLoading] = useState(false)
  const {addToCart}: {addToCart: (item: ProductToAdd) => void} = useCartActions()


  const onAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {

    if(stopPropagation) e.stopPropagation()

    setIsLoading(true)

    const { id, name, discountedPrice, price } = product

    const productToAdd: ProductToAdd = {
      productId: id,
      productName: name,
      price: discountedPrice ? discountedPrice : price,
      quantity: quantity ?? 1
    }

    await addToCart(productToAdd)

    setIsLoading(false)

  }


  if (showIcon) return (
    <Button
      icon={ShoppingCart}
      onClick={onAddToCart}
      disabled={isLoading}
      isLoading={isLoading}
    />
    )

  else {
    return (
      <Button
        label="Add to Cart"
        onClick={onAddToCart}
        disabled={isLoading}
        isLoading={isLoading}
      />
      )
  }

}

export default AddToCart