import prisma from '@/lib/db'
import { Prisma } from '@prisma/client'
import { unstable_noStore as noStore } from 'next/cache'

export const getRooms = async (search: string | undefined) => {
  noStore()

  let where: Prisma.RoomWhereInput = {}

  if (search) {
    where = {
      tags: {
        contains: search,
        mode: 'insensitive', // case insensitive search
      },
    }
  }

  const rooms = await prisma.room.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return rooms
}

// export const getRooms = async (userId: string) => {
//   noStore()
//   const rooms = await prisma.room.findMany({
//     where: {
//       userId: userId,
//     },
//     orderBy: {
//       createdAt: 'desc',
//     },
//   })

//   return rooms
// }

export const getRoom = async (roomId: string) => {
  noStore()
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
    },
  })

  return room
}
