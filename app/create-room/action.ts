'use server'

import prisma from '../../lib/db'
import { getSession } from 'next-auth/react'

type RoomData = {
  name: string
  description: string
  githubRepo: string
  language: string
}

export async function createRoomAction(roomData: RoomData, userId: string) {
  try {
    const room = await prisma.room.create({
      data: {
        userId,
        name: roomData.name,
        description: roomData.description,
        githubRepo: roomData.githubRepo,
        language: roomData.language,
      },
    })

    return room
  } catch (error: any) {
    throw new Error('Failed to create room', error)
  }
}
