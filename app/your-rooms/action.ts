'use server'

import { deleteRoom, getRoom } from '../data-access/room'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '../utils/auth'

export async function deleteRoomAction(roomId: string) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('User not authenticated')
  }

  const room = await getRoom(roomId)

  if (room?.userId !== session.user.id) {
    throw new Error('User not authorized')
  }

  await deleteRoom(roomId)

  revalidatePath('/your-rooms')
}
