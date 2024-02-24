
import type { Category } from '@/libs/types'
import fetchCategories from '@/dataFetch/fetchCategories'
import ErrorMsg from '../ui/ErrorMsg'
import GridContainer from '../ui/GridContainer'
import CategoryCard from '../ui/CategoryCard'
import SectionBase from '../layouts/SectionBase'

const CategoriesSection = async () => {

  let categories: Category[] | undefined 
  let error: string | undefined = undefined

  try {
    categories = await fetchCategories() 
  }

  catch(err) {
    error = "Sorry, couldn't fetch Categories."
  }


  return (
    <SectionBase>
      <h2
        className="text-2xl font-semibold"
      >
        Categories
      </h2>

      {error && (
        <ErrorMsg
          msg={error}
        />
        )}

      <GridContainer>

        {categories?.map(category => (
            <div
              key={category?.id}
              className="w-full max-w-[22rem] mx-auto"
            >
              <CategoryCard
                category={category}
              />
            </div>
            ))}
      </GridContainer>
    </SectionBase>
  )
}

export default CategoriesSection