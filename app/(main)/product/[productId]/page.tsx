
import type {Product} from '@/libs/types'
import fetchProduct from '@/dataFetch/fetchProduct'
import fetchProductImages from '@/dataFetch/fetchProductImages'
import ImageGallery from '@/components/ui/ImageGallery'
import CartQtySelector from '@/components/ui/CartQtySelector'
import PageError from '@/components/ui/PageError'

interface ProductPageProps {
  params: {
    productId: string;
  }
}

const ProductPage = async ({params: {productId}}: ProductPageProps) => {

  let product: Product | undefined
  let error: string | undefined = undefined
  const productImages: string[] | undefined = await fetchProductImages(productId)


  try {
    product = await fetchProduct(productId)
  }

  catch(err) {
    error = "Sorry, Couldn't fetch product."
  }


  if (error) {
    return (
      <PageError
        msg={error}
      />
    )
  }


  return (
    <section
      className="pt-8 pb-20"
    >

      <div
        className="container"
      >
        <div
          className="grid md:grid-cols-[.8fr_1fr] lg:grid-cols-[.5fr_1fr] gap-y-8 gap-x-6"
        >
          <div
            className="w-full max-w-sm justify-self-center"
          >
            <ImageGallery 
              images={productImages || []}
              productName={product?.name || ""}
            />
          </div>

          <div
            className="space-y-6 pt-6"
          >
            <h1
              className="text-2xl font-semibold line-clamp-4"
            >
              {product?.name}
            </h1>

            <div
              className="flex items-center gap-4 text-sm"
            >
              <span
                className={`text-lg ${product?.discountedPrice ? 'line-through text-accent' : ''}`}
              >
                ${product?.price}
              </span>

              {product?.discountedPrice && (
                <span
                  className="text-2xl"
                >
                  ${product?.discountedPrice}
                </span>
                )}
            </div>

            {product && (
              <CartQtySelector
                product={product}
              />
            )}

            <p
             className="leading-7"
            >
              {product?.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductPage