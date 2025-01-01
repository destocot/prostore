import type { InferOutput } from 'valibot'
import { InsertProductSchema } from './validators'

export type Product = InferOutput<typeof InsertProductSchema> & {
  productId: string
  rating: string
  createdAt: Date
}
