'use client'

import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'
import { toast } from './ui/use-toast'

const SignInForm = () => {
  const [email, setEmail] = useState<null | string>(null)

  const SignInWithEmail = async () => {
    const signInResult = await signIn('email', {
      email: email,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    })

    if (!signInResult?.ok) {
      return toast({
        title: 'Well this did not work...',
        description: 'Something went wrong, please try again',
        variant: 'destructive',
      })
    }

    return toast({
      title: 'Check your eemail',
      description: 'A magic link has been sent to you',
    })
  }

  return (
    <form action={SignInWithEmail}>
      <div className='flex flex-col gap-y-2'>
        <Label>Email</Label>
        <Input
          name='email'
          type='email'
          placeholder='name@example.com'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button
        type='submit'
        className='mt-4 w-full'
      >
        Login with Email
      </Button>
    </form>
  )
}

export default SignInForm
