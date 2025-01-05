import { auth } from '@/auth'
import CredentialsSigninForm from '@/components/auth/credentials-signin-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { APP_NAME } from '@/lib/constants'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata: Metadata = { title: 'Sign In' }

const SigninPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!!session) redirect('/')

  return (
    <div className='mx-auto w-full max-w-md'>
      <Card>
        <CardHeader className='space-y-4'>
          <Link href='/' className='flex-center'>
            <Image
              src='/logo.svg'
              alt={`${APP_NAME} logo`}
              width={100}
              height={100}
              priority
            />
          </Link>

          <CardTitle className='text-center'>Sign In</CardTitle>
          <CardDescription className='text-center'>
            Sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-4'>
          <CredentialsSigninForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default SigninPage
