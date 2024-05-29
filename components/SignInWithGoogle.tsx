'use client'

import React from 'react'
import { Button } from './ui/button'
import { FaGoogle } from 'react-icons/fa'
import { signIn } from 'next-auth/react'

const SignInWithGoogle = () => {
  return (
    <Button
      className='mt-6'
      variant='secondary'
      onClick={() =>
        signIn('google', {
          callbackUrl: '/browse',
        })
      }
    >
      Login with Google
      <FaGoogle className='w-4 h4 ml-4' />
    </Button>
  )
}

export default SignInWithGoogle
