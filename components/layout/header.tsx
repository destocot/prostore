import Menu from '@/components/layout/menu'
import { APP_NAME } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex-between'>
        <div className='flex-start'>
          <Link href='/' className='flex-start'>
            <Image
              src='/logo.svg'
              alt={`${APP_NAME} logo`}
              width={48}
              height={48}
              priority
            />
            <span className='ml-3 hidden text-2xl font-bold lg:inline-block'>
              {APP_NAME}
            </span>
          </Link>
        </div>

        <Menu />
      </div>
    </header>
  )
}

export default Header
