'use server'

import { revalidatePath } from 'next/cache'
import prisma from '../../lib/db'
import { createRoom } from '../data-access/room'

type RoomData = {
  name: string
  description: string
  githubRepo: string
  tags: string
}

export async function createRoomAction(roomData: RoomData, userId: string) {
  await createRoom(roomData, userId)

  revalidatePath('/')
}
