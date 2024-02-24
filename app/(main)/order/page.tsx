
import SectionBase from '@/components/layouts/SectionBase'
import PaymentStatusHandler from '@/components/payment/PaymentStatusHandler'


interface OrderPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const OrderPage = ({searchParams}: OrderPageProps) => {

  const {success}: {success?: string;} = searchParams

  return (
    <>
     <SectionBase
       customStyles="pt-6 pb-8 md:pb-20"
     >
        <h1
          className="text-2xl font-semibold"
        >
          Order
        </h1>

        <PaymentStatusHandler
          success={success ?? ""} 
        />
        
     </SectionBase>
    </>
  )
}

export default OrderPage