import ProductPrice from '@/components/products/product-price'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { Product } from '@/features/products/types'
import Image from 'next/image'
import Link from 'next/link'

type ProductCardProps = { product: Product }

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='items-center p-0'>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            height={300}
            width={300}
            priority
          />
        </Link>
      </CardHeader>

      <CardContent className='grid gap-4 p-4'>
        <div className='text-xs'>{product.brand}</div>

        <Link href={`/product/${product.slug}`}>
          <h2 className='text-sm font-medium'>{product.name}</h2>
        </Link>

        <div className='flex-between gap-4'>
          <p>{Number(product.rating)} Stars</p>

          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className='text-destructive'>Out of stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
