import { ModeToggle } from '@/components/mode-toggle'
import React from 'react'
import AccountDropdown from '@/components/AccountDropdown'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className='container mx-auto py-2 bg-gray-50 dark:bg-gray-900'>
      <div className='flex justify-between items-center'>
        <Link
          href='/'
          className='flex gap-2 items-center text-xl hover:underline'
        >
          <Image
            src='/icon.png'
            width='60'
            height='60'
            alt='DevConf.'
          />
          DevConf.
        </Link>

        <div className='flex gap-2'>
          <AccountDropdown />
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
