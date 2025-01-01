'use client'

import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'
import Image from 'next/image'

const NotFound = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <Image
        src='/logo.svg'
        alt={`${APP_NAME} logo`}
        width={48}
        height={48}
        priority
      />

      <div className='w-1/3 rounded-lg p-6 text-center shadow-md'>
        <h1 className='mb-4 text-3xl font-bold'>Not Found</h1>

        <p className='text-destructive'>Could not find requested page</p>

        <Button
          variant='outline'
          className='ml-2 mt-4'
          onClick={() => {
            window.location.href = '/'
          }}
        >
          Back to Home
        </Button>
      </div>
    </div>
  )
}

export default NotFound
