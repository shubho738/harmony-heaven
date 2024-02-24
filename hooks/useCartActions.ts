
import axios from 'axios'
import toast from 'react-hot-toast'

import type {ProductToAdd} from '@/libs/types'
import useCart from './useCart'

interface CartActions {

  addToCart(item: ProductToAdd): void;
  removeFromCart(itemId: string): void;
  clearCart(): void;
}


const useCartActions = (): CartActions => {

  const {mutate: mutateCart} = useCart()


  const addToCart = async (productToAdd: ProductToAdd, successMsg: string = "Product added to Cart.") => {

    try {

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/addItem`, productToAdd)

      toast.success(successMsg, {id: "addToCart success."})
      mutateCart()
    }

    catch(err) {
    
      toast.error("Sorry, There was an error.", {id: "addToCart failure."})
    }
  }


  const removeFromCart = async (itemId: string) => {

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cart/${itemId}/remove`)
      toast.success("Item removed from Cart.")
      mutateCart()
    }

    catch(err) {
      toast.error("Sorry, There was an error.")
    }
  }


  const clearCart = async () => {

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cart/clear`)
      toast.success("Cart was cleared.", {id: "cartCleared"})
      mutateCart()
    }

    catch(err) {
      toast.error("Sorry, There was an error clearing the cart.")
    }
  } 


  return {addToCart, removeFromCart, clearCart}
}

export default useCartActions