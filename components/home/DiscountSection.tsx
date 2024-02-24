
import type {Product} from '@/libs/types'
import fetchProductsOnDiscount from '@/dataFetch/fetchProductsOnDiscount'
import ErrorMsg from '../ui/ErrorMsg'
import ProductCard from '../ui/ProductCard'
import GridContainer from '../ui/GridContainer'
import SectionBase from '../layouts/SectionBase'

const DiscountSection = async () => {

  let productsOnDiscount: Product[] | undefined
  let error: string | undefined = undefined

  try {
    productsOnDiscount = await fetchProductsOnDiscount()
  } 
  
  catch (err) {
    error = "Sorry, Couldn't fetch products."
  }


  return (

    <SectionBase>

      <h2
        className="text-2xl font-semibold"
      >
        Discount Corner
      </h2>

      {error && (
        <ErrorMsg
          msg={error}
        />
      )}

      <GridContainer>
        {productsOnDiscount?.map(product => (
          <div
            key={product?.id}
            className="w-full max-w-[22rem] mx-auto"
          >
            <ProductCard
              product={product}
            />
          </div>
          ))}
      </GridContainer>

    </SectionBase>
  )
}

export default DiscountSection