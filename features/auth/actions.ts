'use server'

import { auth } from '@/auth'
import { SigninSchema } from '@/features/auth/validators'
import { APIError } from 'better-auth/api'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { safeParse } from 'valibot'

export async function signin(prevState: unknown, formData: FormData) {
  const credentials = Object.fromEntries(formData.entries())
  const parsedCredentials = safeParse(SigninSchema, credentials)

  if (!parsedCredentials.success) {
    return { success: false, message: 'Invalid email or password' }
  }

  try {
    await auth.api.signInEmail({
      body: parsedCredentials.output,
    })

    redirect('/')
  } catch (err) {
    if (isRedirectError(err)) throw err

    if (err instanceof APIError) {
      console.log(`[err]: ${err.message} - ${err.status}`)
      return { success: false, message: 'Invalid email or password' }
    }

    console.log(`[err]: ${err}`)
    return { success: false, message: 'Internal server error' }
  }
}

export async function signout() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    })
  } catch (err) {
    console.log(`[err]: ${err}`)
  }
}
