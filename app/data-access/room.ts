import { getSession } from '@/lib/auth'
import prisma from '@/lib/db'
import { RoomData, UpdateRoomData } from '@/types/types'
import { Prisma, Room } from '@prisma/client'

export const getRooms = async (search: string | undefined) => {
  try {
    const where: Prisma.RoomWhereInput = search
      ? {
          tags: {
            contains: search,
            mode: 'insensitive',
          },
        }
      : {}

    const rooms = await prisma.room.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return rooms
  } catch (error) {
    console.error('Error fetching rooms:', error)
    throw new Error('Could not fetch rooms')
  }
}

export const getUserRooms = async () => {
  const session = await getSession()

  if (!session?.user?.id) {
    throw new Error('User not authenticated')
  }

  try {
    const rooms = await prisma.room.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return rooms
  } catch (error) {
    console.error('Error fetching user rooms:', error)
    throw new Error('Could not fetch user rooms')
  }
}

export const getRoom = async (roomId: string) => {
  try {
    const room = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    })
    return room
  } catch (error) {
    console.error('Error fetching room:', error)
    throw new Error('Could not fetch room')
  }
}

export const deleteRoom = async (roomId: string) => {
  try {
    await prisma.room.delete({
      where: {
        id: roomId,
      },
    })
  } catch (error) {
    console.error('Error deleting room:', error)
    throw new Error('Could not delete room')
  }
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

export const editRoom = async (roomData: UpdateRoomData): Promise<Room> => {
  try {
    const updatedRoom = await prisma.room.update({
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
    return updatedRoom
  } catch (error) {
    console.error('Error updating room:', error)
    throw new Error('Could not update room')
  }
}
