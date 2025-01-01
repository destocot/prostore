'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

type ProductImagesProps = { images: Array<string> }

const ProductImages = ({ images }: ProductImagesProps) => {
  const [current, setCurrent] = useState(0)

  return (
    <div className='space-y-4'>
      <Image
        src={images[current]}
        alt='Product Image'
        width={1000}
        height={1000}
        className='min-h-[300px] object-cover object-center'
      />

      <div className='flex'>
        {images.map((image, i) => (
          <div
            key={image}
            onClick={() => void setCurrent(i)}
            className={cn(
              'mr-2 cursor-pointer border hover:border-orange-600',
              {
                'border-orange-500': i === current,
              },
            )}
          >
            <Image src={image} alt='image' width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImages
