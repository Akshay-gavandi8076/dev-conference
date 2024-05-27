import prisma from '@/lib/db'
import { Prisma, Room } from '@prisma/client'

type RoomData = {
  name: string
  description: string
  githubRepo: string
  tags: string
}

export const getRooms = async (search: string | undefined) => {
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

export const getUserRooms = async (userId: string) => {
  const rooms = await prisma.room.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return rooms
}

export const getRoom = async (roomId: string) => {
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  })

  return room
}

export const deleteRoom = async (roomId: string) => {
  await prisma.room.delete({
    where: {
      id: roomId,
    },
  })
}

export const createRoom = async (roomData: RoomData, userId: string) => {
  const room = await prisma.room.create({
    data: {
      userId,
      name: roomData.name,
      description: roomData.description,
      githubRepo: roomData.githubRepo,
      tags: roomData.tags,
    },
  })
  return room
}

type UpdateRoomData = {
  id: string
  userId: string
  name: string
  description: string
  githubRepo: string
  tags: string
}

export const editRoom = async (roomData: UpdateRoomData): Promise<Room> => {
  return prisma.room.update({
    where: {
      id: roomData.id,
    },
    data: {
      name: roomData.name,
      description: roomData.description,
      githubRepo: roomData.githubRepo,
      tags: roomData.tags,
      userId: roomData.userId,
    },
  })
}
