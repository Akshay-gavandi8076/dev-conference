'use client'

import React from 'react'
import { Button } from './ui/button'
import { Github } from 'lucide-react'
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
      {/* <Github className='w-4 h4 ml-4' /> */}
    </Button>
  )
}

export default SignInWithGoogle
