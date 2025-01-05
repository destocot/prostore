'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signin } from '@/features/auth/actions'
import { SIGNIN_DEFAULT_VALUES } from '@/lib/constants'
import Link from 'next/link'
import { useActionState } from 'react'

const CredentialsSigninForm = () => {
  const [state, formAction, isPending] = useActionState(signin, {
    success: false,
    message: '',
  })

  return (
    <form action={formAction}>
      <div className='space-y-6'>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            type='email'
            required
            autoComplete='email'
            defaultValue={SIGNIN_DEFAULT_VALUES.email}
          />
        </div>

        <div>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            name='password'
            type='password'
            required
            autoComplete='current-password'
            defaultValue={SIGNIN_DEFAULT_VALUES.password}
          />
        </div>

        <div>
          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending ? 'Signing in...' : 'Sign In'}
          </Button>
        </div>

        {state?.success === false ? (
          <div className='text-center text-destructive'>{state.message}</div>
        ) : null}

        <div className='text-center text-sm text-muted-foreground'>
          Don&apos;t have an account?{' '}
          <Link href='/sign-up' target='_self' className='link'>
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  )
}

export default CredentialsSigninForm
