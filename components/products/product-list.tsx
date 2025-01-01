import ProductCard from '@/components/products/product-card'
import { Product } from '@/features/products/types'

type ProductListProps = {
  data: Array<Product>
  title?: string
}

const ProductList = ({ data, title }: ProductListProps) => {
  return (
    <div className='my-10'>
      <h2 className='h2-bold mb-4'>{title}</h2>

      {data.length > 0 ? (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {data.map((product: Product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div>No products found</div>
      )}
    </div>
  )
}

export default ProductList
