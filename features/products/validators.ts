import { formatNumberWithDecimal } from '@/lib/utils'
import * as v from 'valibot'

const CurrencySchema = v.pipe(
  v.string(),
  v.nonEmpty(),
  v.regex(/^\d+(\.\d{2})?$/),
  v.transform((i) => formatNumberWithDecimal(Number(i))),
)

export const InsertProductSchema = v.object({
  name: v.pipe(
    v.string(),
    v.nonEmpty(),
    v.minLength(3, 'Name must be at least 3 characters'),
  ),
  slug: v.pipe(
    v.string(),
    v.nonEmpty(),
    v.minLength(3, 'Slug must be at least 3 characters'),
  ),
  category: v.pipe(
    v.string(),
    v.nonEmpty(),
    v.minLength(3, 'Category must be at least 3 characters'),
  ),
  brand: v.pipe(
    v.string(),
    v.nonEmpty(),
    v.minLength(3, 'Brand must be at least 3 characters'),
  ),
  description: v.pipe(
    v.string(),
    v.nonEmpty(),
    v.minLength(3, 'Description must be at least 3 characters'),
  ),
  stock: v.union([v.number(), v.pipe(v.string(), v.transform(Number))]),
  images: v.pipe(
    v.array(v.pipe(v.string(), v.nonEmpty())),
    v.minLength(1, 'Product must have at least 1 image'),
  ),
  isFeatured: v.boolean(),
  banner: v.optional(
    v.pipe(
      v.string(),
      v.transform((i) => (i.length > 0 ? i : null)),
    ),
  ),
  price: CurrencySchema,
})
