'use client'

import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { signOut, useSession } from 'next-auth/react'
import { DeleteIcon, LogInIcon, LogOutIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'
import { deleteAccountAction } from '@/app/action'
import Link from 'next/link'

function AccountDropdown() {
  const session = useSession()
  const [open, setOpen] = useState(false)

  const isLoggedIn = !!session?.data?.user

  return (
    <>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              account and any data your have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction()
                signOut({ callbackUrl: '/' })
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost'>
            <Avatar className='mr-2 h-7 w-7'>
              <AvatarImage src={session?.data?.user.image ?? ''} />
              <AvatarFallback>PP</AvatarFallback>
            </Avatar>
            {session?.data?.user.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {isLoggedIn ? (
            <>
              <DropdownMenuItem
                className='cursor-pointer'
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <LogOutIcon className='mr-2 h-4 w-4' /> Sign Out
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className='cursor-pointer'
                onClick={() => setOpen(true)}
              >
                <DeleteIcon className='mr-2 h-4 w-4' /> Delete Account
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem>
              <LogInIcon className='mr-2 h-4 w-4' /> Sign In
              <Link href='/auth'>Sign In</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default AccountDropdown
