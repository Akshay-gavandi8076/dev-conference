'use server'

import { revalidatePath } from 'next/cache'
import { editRoom, getRoom } from '@/app/data-access/room'
import { redirect } from 'next/navigation'

import { getSession } from '@/lib/auth'

type RoomData = {
  id: string
  name: string
  description: string
  githubRepo: string
  tags: string
}

export async function editRoomAction(roomData: RoomData) {
  const session = await getSession()

  if (!session) {
    throw new Error('You must be logged in to edit this room')
  }

  const room = await getRoom(roomData.id)

  if (room?.userId !== session.user.id) {
    throw new Error('User not authorized')
  }

  await editRoom({ ...roomData, userId: room.userId })

  revalidatePath('/your-rooms')

  redirect('/your-rooms')
}
