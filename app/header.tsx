'use client'

import { ModeToggle } from '@/components/mode-toggle'
import React from 'react'
import AccountDropdown from '@/components/AccountDropdown'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { LogInIcon } from 'lucide-react'

export const Header = () => {
  const session = useSession()

  const isLoggedIn = !!session.data

  return (
    <header className='py-2 bg-gray-50 dark:bg-transparent shadow-lg shadow-slate-300 dark:shadow-slate-800 z-10 relative'>
      <div className='flex justify-between items-center container mx-auto'>
        <Link
          href='/'
          className='flex gap-2 items-center text-xl hover:underline'
        >
          <Image
            src='/icon.png'
            width='50'
            height='50'
            alt='DevConf.'
          />
          DevConf.
        </Link>

        <nav className='flex gap-4'>
          {isLoggedIn && (
            <>
              <Link
                className='hover:underline'
                href='/browse'
              >
                Browse
              </Link>

              <Link
                className='hover:underline'
                href='/your-rooms'
              >
                Your Rooms
              </Link>
            </>
          )}
        </nav>

        <div className='flex gap-2 items-center'>
          {isLoggedIn && <AccountDropdown />}
          {!isLoggedIn && (
            <Button variant='outline'>
              <LogInIcon className='mr-2 h-4 w-4' />
              <Link href='/auth'>Sign In</Link>
            </Button>
          )}
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
