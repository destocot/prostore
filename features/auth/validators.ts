import * as v from 'valibot'

export const SigninSchema = v.object({
  email: v.pipe(v.string(), v.nonEmpty(), v.email('Invalid email address')),
  password: v.pipe(
    v.string(),
    v.nonEmpty(),
    v.minLength(6, 'Password must be at least 6 characters'),
  ),
})
