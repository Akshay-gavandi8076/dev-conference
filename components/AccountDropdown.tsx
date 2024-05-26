'use client'

import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { getSession, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import LogoutButton from './LogoutButton'
import { LogInIcon, LogOutIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

function AccountDropdown() {
  const { data: session, status } = useSession()
  const isLoggedIn = !!session?.user

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <Avatar className='mr-2 h-7 w-7'>
            <AvatarImage src={session?.user.image ?? ''} />
            <AvatarFallback>Profile picture</AvatarFallback>
          </Avatar>
          {session?.user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuSeparator /> */}
        {isLoggedIn ? (
          <DropdownMenuItem
            onClick={() =>
              signOut({ callbackUrl: `${window.location.origin}` })
            }
          >
            <LogOutIcon className='mr-2 h-4 w-4' /> Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <LogInIcon className='mr-2 h-4 w-4' />
            <Link href='/auth'>Sign In</Link>
          </DropdownMenuItem>
        )}

        {/* <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountDropdown
