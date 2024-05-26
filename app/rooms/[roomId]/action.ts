'use server'

import { authOptions } from '@/app/utils/auth'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import { StreamChat } from 'stream-chat'

export async function generateTokenAction() {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('No session found')
  }

  const api_key = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!
  const api_secret = process.env.GET_STREAM_SECRET_KEY!
  const serverClient = StreamChat.getInstance(api_key, api_secret)
  const token = serverClient.createToken(session.user.id)

  return token
}
