import prisma from '../utils/db'

export const createRoom = async ({
  userId,
  name,
  description,
  githubRepo,
  language,
}: {
  userId: string
  name: string
  description: string | null
  githubRepo: string | null
  language: string | null
}) => {
  try {
    await prisma.room.create({
      data: {
        userId,
        name,
        description,
        githubRepo,
        language,
      },
    })
  } catch (error) {
    console.error('Error creating room:', error)
    throw error
  }
}
