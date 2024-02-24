
import type {Product, Sort} from '@/libs/types'
import fetchProductsForCategory from '@/dataFetch/fetchProductsForCategory'
import SectionBase from '@/components/layouts/SectionBase'
import Products from '@/components/products/Products'
import PageError from '@/components/ui/PageError'


interface CategoryPageProps {
  params: {
    categoryName: string
  };
  searchParams: { [key: string]: string | string[] | undefined };
}


const CategoryPage = async ({params, searchParams}: CategoryPageProps) => {

  const {categoryName} = params

  const {sort}: {sort?: Sort} = searchParams
  const currentPage = Number(searchParams.currentPage) || 1
  const pageSize = Number(searchParams.pageSize) || 8


  let productsData: { products: Product[], productCount: number } = {products: [], productCount: 0}

  let error: string | undefined = undefined

  try {
    productsData = await fetchProductsForCategory(categoryName, sort, currentPage, pageSize)
  }

  catch(err) {
    error = "Sorry, couldn't fetch products."
  }


  if (error) {
    return (
      <PageError
        msg={error}
      />
    )
  }


  return (
    <>
      <SectionBase
        customStyles="pt-6 pb-20"
      >
          <h1
            className="text-2xl font-semibold capitalize"
          >
            {categoryName}
          </h1>

          <Products
            products={productsData?.products}
            productCount={productsData?.productCount}
            pageSize={pageSize}
          />

      </SectionBase>
    </>
  )
}

export default CategoryPage