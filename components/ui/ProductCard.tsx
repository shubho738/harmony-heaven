
import Link from 'next/link'

import type { Product } from '@/libs/types'
import Card from './Card'
import ProductImage from './ProductImage'
import AddToCart from './AddToCart'

interface ProductCardProps {
  product: Product;
  customStyles?: string;
}

const ProductCard = ({ product, customStyles }: ProductCardProps) => {
  
  return (
    <div>
      <Card>
        <Link
          href={`/product/${product?.id}`}
        >
          <ProductImage
            productId={product?.id}
            productName={product?.name}
          />
        </Link>
      </Card>

      <div
        className="mt-6 pl-2 flex justify-between gap-[.35rem]"
      >
        <div
          className="space-y-3"
        >
          <h3
            className="font-semibold line-clamp-3"
          >
            {product?.name}
          </h3>

          <div
            className="flex gap-4 text-sm"
          >
            <span
              className={product?.discountedPrice ? 'line-through text-accent' : ''}
            >
              ${product?.price}
            </span>

            {product?.discountedPrice && <span>${product?.discountedPrice}</span>}
          </div>
        </div>

        <div>
          <AddToCart 
            product={product}
            showIcon
          />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
