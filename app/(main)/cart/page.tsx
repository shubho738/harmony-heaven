
import CartViewer from '@/components/ui/CartViewer'
import SectionBase from '@/components/layouts/SectionBase'



const CartPage =  () => {


  return (
    <>
     <SectionBase
       customStyles="pt-6 pb-8 md:pb-20"
     >
        <h1
          className="text-2xl font-semibold"
        >
          Shopping Cart
        </h1>

        <CartViewer />

     </SectionBase>
    </>
  )
}

export default CartPage