
import Image from 'next/image'
import { ImageOff } from 'lucide-react'
import { ClipLoader } from 'react-spinners'

import { cn } from '@/libs/utils'

interface ImageViewProps {
  src: string
  alt: string
  isLoading?: boolean
  containerCustomStyles?: string
  imageCustomStyles?: string
}

const ImageView = ({src, alt, isLoading, containerCustomStyles, imageCustomStyles}: ImageViewProps) => {

  const isDataUrl = typeof src === 'string' && src.startsWith('data:')

  return (
    <div
      className={cn(
        `
          relative aspect-auto w-full h-full
        `,
        containerCustomStyles
      )}
    >
      {isLoading ? (
        <div 
          className="absolute inset-0 flex justify-center items-center"
        >
          <ClipLoader />
        </div>
      ) : isDataUrl ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            `
              object-contain
            `,
            imageCustomStyles
          )}
        />
      ) : (
        <div 
          className="absolute inset-0 flex justify-center items-center"
        >
          <ImageOff />
        </div>
      )}
    </div>
  )
}

export default ImageView
