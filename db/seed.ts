import { PrismaClient } from '@prisma/client'
import sampleData from './sample-data.json'

async function main() {
  const prisma = new PrismaClient()

  await prisma.product.deleteMany()

  await prisma.product.createMany({ data: sampleData })

  console.log('Sample data loaded')
}

main()
