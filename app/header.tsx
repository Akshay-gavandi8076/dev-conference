import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { getServerSession } from 'next-auth'
import { useRouter } from 'next/navigation'
import React from 'react'
import { authOptions } from './utils/auth'
import LogoutButton from '@/components/LogoutButton'
import Link from 'next/link'

export async function Header() {
  const session = await getServerSession(authOptions)

  console.log(session)

  return (
    <header>
      <div className='flex justify-end mr-4'>
        <div className='mr-4'>
          <ModeToggle />
        </div>

        {session ? (
          <div>
            <LogoutButton />
          </div>
        ) : (
          <div>
            <Button asChild>
              <Link href='/auth'>Login</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
