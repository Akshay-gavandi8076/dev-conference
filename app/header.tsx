'use client'

import { ModeToggle } from '@/components/mode-toggle'
import React from 'react'
import AccountDropdown from '@/components/AccountDropdown'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { Button } from '@/components/ui/button'
import { LogInIcon } from 'lucide-react'

export const Header = () => {
  // const session = getServerSession()
  const session = useSession()

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

        <div className='flex gap-2 items-center'>
          {session?.data && <AccountDropdown />}
          {!session.data && (
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
