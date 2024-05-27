// app/auth/page.tsx
import SignInWithGithub from '@/components/SignInWithGithub'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { redirect } from 'next/navigation'
import SignInForm from '@/components/SignInForm'
import { getSession } from 'next-auth/react'

export default async function AuthRoute() {
  const session = await getSession()

  if (session) {
    return redirect('/')
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Card>
        <CardHeader>
          <CardTitle>Please sign in</CardTitle>
          <CardDescription>
            To access the private page you have to be authenticate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col'>
            <SignInForm />

            <SignInWithGithub />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
