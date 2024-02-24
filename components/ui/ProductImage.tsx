
'use client'

import ImageView from './ImageView'

import useProductImage from '@/hooks/useProductImage'

interface ProductImageProps {
  productId: string;
  productName: string;
}

const ProductImage = ({productId, productName}: ProductImageProps) => {

  const {data: productImage, isLoading: isLoadingProductImage}: {data: string | undefined, isLoading: boolean} = useProductImage(productId)

  return (
    <ImageView
      src={productImage || ""}
      alt={`image for ${productName}`}
      isLoading={isLoadingProductImage}
      containerCustomStyles="aspect-square"
    />
  )
}

export default ProductImage