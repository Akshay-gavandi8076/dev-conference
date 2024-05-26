import prisma from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache'

export const getRooms = async (userId: string) => {
  noStore()
  const rooms = await prisma.room.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return rooms
}

export const getRoom = async (roomId: string) => {
  noStore()
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
    },
  })

  return room
}
