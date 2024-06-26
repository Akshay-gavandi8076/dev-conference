'use client'

import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

const LogoutButton = () => {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: `${window.location.origin}` })}
    >
      Log out
    </Button>
  )
}

export default LogoutButton
