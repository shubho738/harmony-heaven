
'use client'

import {useState} from 'react'

import {cn} from '@/libs/utils'
import ImageView from './ImageView'

interface ImageGalleryProps {
  images: string[];
  productName: string;
  customStyles?: string;
}

const ImageGallery = ({images, productName, customStyles}: ImageGalleryProps) => {

  const [featuredImage, setFeaturedImage] = useState(images[0])


  return (
    <div
      className="space-y-6"
    >

      <div
        className="bg-neutral-light"
      >
        <ImageView
          src={featuredImage}
          alt={`image for ${productName}`}
          containerCustomStyles="aspect-square"
        />
      </div>

      <div
        className={cn(
          `
            h-20 flex justify-center gap-4
          `,
          customStyles
          )}
      >
        {images?.map((image, index) => (
          <div
            key={`${image} index`}
            onClick={() => setFeaturedImage(image)}
            className={`w-full bg-neutral-light cursor-pointer hover:scale-105 transition ${image === featuredImage ? "border-2 border-accent-secondary" : ""}`}
          >
            <ImageView
              src={image}
              alt={`image for ${productName}`}
              // imageCustomStyles="object-cover"
            />
          </div>
          ))}
      </div>
    </div>
  )
}

export default ImageGallery