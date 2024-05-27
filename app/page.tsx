import { authOptions } from '@/app/utils/auth'
import { Button } from '@/components/ui/button'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Room } from '@prisma/client'
import { GithubIcon } from 'lucide-react'
import { getRooms } from './data-access/room'
import SearchBar from './search-bar'

const RoomCard = ({ room }: { room: Room }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className='flex gap-2 items-center'
            target='_blank'
            rel='noopener noreferrer'
          >
            <GithubIcon />
            Github Project
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string }
}) {
  // const session = await getServerSession(authOptions)

  // const rooms = await getRooms(session?.user.id!)
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
