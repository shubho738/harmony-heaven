
import Link from 'next/link'

import type {Category} from '@/libs/types'
import fetchCategoryImage from '@/dataFetch/fetchCategoryImage'
import Card from './Card'
import ImageView from './ImageView'

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = async ({category}: CategoryCardProps) => {

  let categoryImage: string | undefined
  let error: string | undefined = undefined

  try {
    categoryImage = await fetchCategoryImage(category?.name)
  }

  catch(err) {
    error = "Sorry, Couldn't fetch category image."
  }

  return (
   <Link
     href={`/categories/${category?.name}`}
   >
    <Card
      customStyles="hover:scale-105 transition">
      <div
        className="space-y-4 flex flex-col items-center"
      >
        <ImageView
          src={categoryImage || ""}
          alt={`thumbnail for ${category?.name} category`}
          containerCustomStyles="aspect-square"
        />

        <h3
          className="text-xl font-semibold capitalize"
        >
          {category?.name}
        </h3>
      </div>
    </Card>
   </Link>
  )
}

export default CategoryCard