import SignInWithGithub from '@/components/SignInWithGithub'
import SignInWithGoogle from '@/components/SignInWithGoogle'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { redirect } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache'
import { getSession } from 'next-auth/react'

export default async function AuthRoute() {
  noStore()

  const session = await getSession()

  if (session) {
    return redirect('/')
  }

  return (
    <div className='flex items-center justify-center mt-20'>
      <Card>
        <CardHeader>
          <CardTitle>Please sign in</CardTitle>
          <CardDescription>
            To access the private page you have to be authenticate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col'>
            <SignInWithGoogle />

            <SignInWithGithub />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
