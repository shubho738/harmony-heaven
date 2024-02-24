
'use client'

import {useState} from 'react'
import Link from 'next/link'
import {ClipLoader} from 'react-spinners'

import type {CartItem, Product} from '@/libs/types'
import useCart from '@/hooks/useCart'
import useCartActions from '@/hooks/useCartActions'
import useProductImage from '@/hooks/useProductImage'
import useProduct from '@/hooks/useProduct'
import useSubtotal from '@/hooks/useSubtotal'
import ErrorMsg from './ErrorMsg'
import TextLoader from './loaders/TextLoader'
import Checkout from './Checkout'
import ImageView from './ImageView'
import Button from './Button'
import CartQtySelector from './CartQtySelector'


interface CartItemProps {
  item: CartItem;
  onRemove(): void;
}

const CartItem = ({item, onRemove}: CartItemProps) => {

  const [isLoading, setIsLoading] = useState(false)

  const {productId, quantity} = item

  const {data: product, isLoading: isLoadingProduct}: {data: Product | undefined; isLoading: boolean; error: any;} = useProduct(productId)
  const {data: productImage, isLoading: isLoadingProductImage}: {data: string | undefined, isLoading: boolean} = useProductImage(productId)


  const onRemoveItem = async () => {

    setIsLoading(true)

    await onRemove()

    setIsLoading(false)
  }

  return (
    <div
      className="grid grid-cols-[.4fr_1fr] gap-8"
    >
      <Link
        href={`/product/${productId}`}
        target="_blank"
      >
        <div
          className="w-full max-w-xs h-full xs:bg-neutral-light"
        >
          <ImageView
            src={productImage || ""}
            alt={`image for ${product?.name}`}
            isLoading={isLoadingProductImage}
          />
        </div>
      </Link>

      <div
        className="space-y-4"
      >
        <div
        >
          <h3
            className="line-clamp-2"
          >
            {product?.name}
          </h3>

          {isLoadingProduct ? (
             <TextLoader />
          ) : (
            <span
              className="text-neutral-md"
            >
              ${product?.discountedPrice ?? product?.price} x {quantity} = {((product?.discountedPrice ?? product?.price ?? 0) * quantity)}

            </span>
          )}
        </div>

        <div
          className="flex flex-col xs:flex-row items-start xs:items-center gap-4"
        >

          {product && (
            <CartQtySelector
              product={product}
              autoAddToCart
            />
          )}

          <Button
            label="Remove"
            onClick={onRemoveItem}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
    )
}


const CartViewer = () => {

  const [isClearingCart, setIsClearingCart] = useState(false)

  const {data: cartItems, isLoading: isLoadingCart, error: errorCart}: {data: CartItem[] | undefined; isLoading: boolean; error: any;} = useCart()

  const {removeFromCart, clearCart}: {removeFromCart: (itemId: string) => void; clearCart: () => void} = useCartActions()

  const { subtotal, isLoading: isLoadingSubtotal}: {subtotal: number | null; isLoading: boolean;} = useSubtotal(cartItems || [])


  const onClearCart = async () => {

    setIsClearingCart(true)

    await clearCart()

    setIsClearingCart(false)
  }


  if (errorCart) {

    return (
      <ErrorMsg />
    )
  }


  if (cartItems && cartItems?.length < 1) {
    return (
      <div
        className="min-h-[35vh] md:min-h-[25vh] flex items-center justify-center"
      >
        <h1
          className="text-2xl"
        >
          Wow, so empty!
        </h1>
      </div>
      )
  }

  return (
    <div
      className="grid md:grid-cols-[1fr_.6fr] items-start gap-x-1 gap-y-20 py-4"
    >

      <div
        className="space-y-12"
      >

        {isLoadingCart && (
          <div
            className="text-center"
          >
            <ClipLoader />
          </div>
          )}

        {cartItems?.map(item => (
           <CartItem
             key={item.id}
             item={item}
             onRemove={() => removeFromCart(item.id)}
           />
          ))}
      </div>


      <div
        className="md:px-4 pb-12 space-y-8 md:border-l border-border-md"
      >
        <div
          className="flex justify-between font-semibold"
        >
          <span>Subtotal</span>
          <span>${isLoadingSubtotal ? 'Calculating...' : subtotal ? subtotal : 'N/A'}</span>
        </div>

        <p>Applicable taxes, shipping, coupons or special offers will be applied at Checkout.</p>

        <Checkout
          cartItems={cartItems ?? []}
        />

        <Button
          onClick={onClearCart}
          label="Clear Cart"
          disabled={isClearingCart}
          isLoading={isClearingCart}
          customStyles="bg-btn-danger text-btn-danger-text"
          loaderColor="hsl(var(--clr-btn-danger-loader))"
        />
      </div>
    </div>
  )
}

export default CartViewer