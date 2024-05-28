import prisma from '@/lib/db'

export async function deleteUser(userId: string) {
  // await db.delete(users).where(eq(users.id, userId))

  return await prisma.user.delete({
    where: {
      id: userId,
    },
  })
}
