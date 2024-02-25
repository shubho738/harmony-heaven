
'use client'

import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Trash2} from 'lucide-react'
import Link from 'next/link'

import type {Product, CartItem} from '@/libs/types'
import { closeCartPreviewModal } from '@/redux/features/modalSlice'
import useCart from '@/hooks/useCart'
import useCartActions from '@/hooks/useCartActions'
import useProduct from '@/hooks/useProduct'
import useProductImage from '@/hooks/useProductImage'
import Modal from './Modal'
import ImageView from '../ImageView'
import CartQtySelector from '../CartQtySelector'
import Checkout from '../Checkout'
import Button from '../Button'
import TextLoader from '../loaders/TextLoader'


interface CartItemProps {
  productId: string;
  quantity: number;
  onNavigate(): void;
  onRemove(): void;
}

const CartItem = ({productId, quantity, onNavigate, onRemove}: CartItemProps) => {

  const [isLoading, setIsLoading] = useState(false)

  const {data: product, isLoading: isLoadingProduct}: {data: Product | undefined; isLoading: boolean;} = useProduct(productId)

  const {data: productImage, isLoading: isLoadingProductImage}: {data: string | undefined, isLoading: boolean} = useProductImage(productId)

  const onRemoveItem = async () => {

    setIsLoading(true)

    await onRemove()

    setIsLoading(false)
  }


  return (
    <div
      className="grid grid-cols-[auto_1fr] xs:grid-cols-[auto_1fr_auto_auto] xs:gap-x-6 gap-y-6"
    >
      
      <div
        className="w-[5rem]"
      >
        <ImageView
          src={productImage ?? ""}
          alt={`image for ${product?.name}`}
          isLoading={isLoadingProductImage}
          containerCustomStyles="aspect-auto w-full h-full"
        />
      </div>

      <div
        className="flex-1 flex flex-col"
      >
        <Link
          href={`/product/${productId}`}
        >
        <div
          onClick={onNavigate}
          className="text-sm line-clamp-1 hover:underline"
        >
          {isLoadingProduct ? <TextLoader /> : <span>{product?.name}</span>}
        </div>
        </Link>

        <div
          className="text-xs text-neutral-md"
        >
          Price: {isLoadingProduct ? <TextLoader size={5} /> : <span>{product?.discountedPrice ?? product?.price}</span>}
        </div>

        <span
          className="text-xs text-neutral-md"
        >
          Quantity: {quantity}
        </span>
      </div>
      

      {product && (
        <CartQtySelector
          product={product}
          autoAddToCart
        />
      )}
      
      <div
        className="mt-2 ml-auto"
      >
        <Button
          onClick={onRemoveItem}
          icon={Trash2}
          disabled={isLoading}
          isLoading={isLoading}
          customStyles="p-0 bg-inherit text-btn-danger"
          loaderColor="hsl(var(--clr-neutral-dark))"
        />
      </div>

    </div>
    )
}


const CartPreviewModal = () => {

  const {data: cartItems}: {data: CartItem[] | undefined;} = useCart()

  const {removeFromCart}: {removeFromCart: (itemId: string) => void;} = useCartActions()

  const subtotal = cartItems?.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  const dispatch = useDispatch()

  const onModalClose = () => dispatch(closeCartPreviewModal())

  return (
    <Modal
      title="Shopping Cart"
      onClose={onModalClose}
    >
      {cartItems?.length ? (
        <>
          <div
            className="space-y-12 pb-4 border-b border-border-light"
          >
            {cartItems?.map(item => (
              <CartItem
                key={item.id}
                productId={item.productId}
                quantity={item?.quantity}
                onNavigate={onModalClose} 
                onRemove={() => removeFromCart(item.id)}
              />
              ))}
            
          </div>

          <div
            className="flex flex-col xs:flex-row justify-between items-center gap-x-8 gap-y-4 pt-4"
          >
            <span>Subtotal: ${subtotal}</span>

            <div
              className="space-x-4 flex"
            >
              <div
                onClick={onModalClose}
              >
                <Button
                  label="My Cart"
                  href="/cart"
                />
              </div>

              <Checkout
                cartItems={cartItems}
              />

            </div>
          </div>
        </>
        ) : (
        <h2>There are no items in your cart.</h2>
        )}
    </Modal>
  )
}

export default CartPreviewModal