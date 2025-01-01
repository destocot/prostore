import ProductImages from '@/components/products/product-images'
import ProductPrice from '@/components/products/product-price'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getProductBySlug } from '@/features/products/actions'
import { notFound } from 'next/navigation'

type ProductDetailsPage = { params: Promise<{ slug: string }> }

const ProductDetailsPage = async ({ params }: ProductDetailsPage) => {
  const slug = (await params).slug

  const product = await getProductBySlug(slug)

  if (!product) notFound()

  return (
    <>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-5'>
          {/* IMAGES */}
          <div className='col-span-2'>
            <ProductImages images={product.images} />
          </div>

          {/* DETAILS */}
          <div className='col-span-2 p-5'>
            <div className='flex flex-col gap-6'>
              <p>
                {product.brand} {product.category}
              </p>

              <h1 className='h3-bold'>{product.name}</h1>

              <p>
                {product.rating} of {product.numReviews} Reviews
              </p>

              <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                <ProductPrice
                  value={Number(product.price)}
                  className='w-24 rounded-full bg-green-100 px-5 py-2 text-green-700'
                />
              </div>
            </div>

            <div className='mt-10'>
              <p className='font-semibold'>Description</p>

              <p>{product.description}</p>
            </div>
          </div>

          {/* ACTIONS */}
          <div>
            <Card>
              <CardContent className='p-4'>
                <div className='mb-2 flex justify-between'>
                  <div>Price</div>
                  <div>
                    <ProductPrice value={Number(product.price)} />
                  </div>
                </div>

                <div className='mb-2 flex justify-between'>
                  <div>Status</div>
                  {product.stock > 0 ? (
                    <Badge variant='outline'>In Stock</Badge>
                  ) : (
                    <Badge variant='destructive'>Out of Stock</Badge>
                  )}
                </div>

                {product.stock > 0 && (
                  <div className='flex-center'>
                    <Button className='w-full'>Add to Cart</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductDetailsPage
