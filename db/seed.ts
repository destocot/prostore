import { auth } from '@/auth'
import { PrismaClient } from '@prisma/client'
import { sampleData } from '../prisma/sample-data'

async function main() {
  const prisma = new PrismaClient()

  await prisma.product.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.verification.deleteMany()
  await prisma.user.deleteMany()

  await prisma.product.createMany({ data: sampleData.products })

  const signUpEmailPromises = sampleData.users.map((user) => {
    return auth.api.signUpEmail({
      body: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    })
  })

  await Promise.all(signUpEmailPromises)

  console.log('Sample data loaded')
}

main()
