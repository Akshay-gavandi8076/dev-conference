import { getRoom } from '@/app/data-access/room'
import { unstable_noStore as noStore } from 'next/cache'

import EditRoomForm from './edit-room-form'

export default async function EditRoomPage({
  params,
}: {
  params: { roomId: string }
}) {
  noStore()

  const room = await getRoom(params.roomId)

  if (!room) {
    return <div>Room not found</div>
  }

  return (
    <div className='container mx-auto flex flex-col gap-8 pt-12 pb-24'>
      <h1 className='text-4xl font-bold'>Edit Room</h1>

      <EditRoomForm room={room} />
    </div>
  )
}
