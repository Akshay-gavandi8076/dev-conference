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
import { TagsList } from '@/components/tags-list'
import { splitTags } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '../../components/ui/button'

export const RoomCard = ({ room }: { room: Room }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <TagsList tags={splitTags(room.tags || '')} />

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
