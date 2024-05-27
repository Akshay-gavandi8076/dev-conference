import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getRooms } from '../data-access/room'
import SearchBar from './search-bar'
import { RoomCard } from '@/app/browse/room-card'
import { unstable_noStore as noStore } from 'next/cache'

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string }
}) {
  noStore()
  const rooms = await getRooms(searchParams.search)

  return (
    <main className='p-16'>
      <div className='flex justify-between items-center mb-12'>
        <h1 className='text-4xl'>Find Dev Rooms</h1>

        <Button asChild>
          <Link href='/create-room'> Create Room </Link>
        </Button>
      </div>

      <div className='mb-12'>
        <SearchBar />
      </div>

      <div className='grid grid-cols-4 gap-3'>
        {rooms.map((room) => {
          return (
            <RoomCard
              key={room.id}
              room={room}
            />
          )
        })}
      </div>
    </main>
  )
}
