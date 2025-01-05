import { PrismaClient } from '@prisma/client'
import { auth } from '../auth'
import { sampleData } from './sample-data'

const prisma = new PrismaClient()

async function truncate() {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ')

  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
}

async function main() {
  await truncate()
  await prisma.product.createMany({ data: sampleData.products })

  const signUpEmailPromises = sampleData.users.map((user) => {
    return auth.api.signUpEmail({
      body: {
        name: user.name ? user.name : 'NO_NAME',
        email: user.email,
        password: user.password,
        role: user.role ? user.role : 'USER',
      },
    })
  })

  await Promise.all(signUpEmailPromises)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
