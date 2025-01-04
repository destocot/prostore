import { auth } from '@/auth'
import ProductList from '@/components/products/product-list'
import { getLatestProducts } from '@/features/products/actions'
import { sampleData } from '@/prisma/sample-data'

const HomePage = async () => {
  const latestProducts = await getLatestProducts()

  const signUp = async () => {
    'use server'
    const email = sampleData.users[0].email
    const password = sampleData.users[0].password
    const name = sampleData.users[0].name

    try {
      await auth.api.signUpEmail({
        body: {
          email,
          password,
          name,
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <ProductList data={latestProducts} title='Newest Arrivals' />
      <form action={signUp}>
        <button type='submit'>Sign up</button>
      </form>
    </>
  )
}

export default HomePage
