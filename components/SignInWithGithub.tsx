'use client'

import React from 'react'
import { Button } from './ui/button'
import { Github } from 'lucide-react'
import { signIn } from 'next-auth/react'

const SignInWithGithub = () => {
  return (
    <Button
      className='mt-6'
      variant='secondary'
      onClick={() =>
        signIn('github', {
          callbackUrl: `${window.location.origin}`,
        })
      }
    >
      Login with GitHub <Github className='w-4 h4 ml-4' />
    </Button>
  )
}

export default SignInWithGithub
