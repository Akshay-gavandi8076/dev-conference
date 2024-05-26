'use server'

import { revalidatePath } from 'next/cache'
import prisma from '../../lib/db'

type RoomData = {
  name: string
  description: string
  githubRepo: string
  tags: string
}

export async function createRoomAction(roomData: RoomData, userId: string) {
  try {
    const room = await prisma.room.create({
      data: {
        userId,
        name: roomData.name,
        description: roomData.description,
        githubRepo: roomData.githubRepo,
        tags: roomData.tags,
      },
    })

    revalidatePath('/')
    return room
  } catch (error: any) {
    throw new Error('Failed to create room', error)
  }
}
