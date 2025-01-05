import ProductList from '@/components/products/product-list'
import { getLatestProducts } from '@/features/products/actions'

const HomePage = async () => {
  const latestProducts = await getLatestProducts()

  return (
    <>
      <ProductList data={latestProducts} title='Newest Arrivals' />
    </>
  )
}

export default HomePage
