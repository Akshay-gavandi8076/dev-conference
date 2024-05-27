import { getRoom } from '@/app/data-access/room'
import { TagsList } from '@/components/tags-list'
import { splitTags } from '@/lib/utils'
import { GithubIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { DevConfVideo } from './video-player'

export default async function RoomPage(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId

  const room = await getRoom(roomId)

  if (!room) {
    return <div>No room of this ID found</div>
  }

  return (
    <div className='grid grid-cols-4 min-h-screen'>
      <div className='col-span-3 p-4 pr-2'>
        <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4'>
          <DevConfVideo room={room} />
        </div>
      </div>

      <div className='col-span-1 p-4  pl-2'>
        <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4'>
          <h1 className='text-base'>{room.name}</h1>
          <TagsList tags={splitTags(room.tags || '')} />

          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className='flex gap-2 items-center text-center text-sm self-center mb-4'
              target='_blank'
              rel='noopener noreferrer'
            >
              <GithubIcon />
              Github Project
            </Link>
          )}

          <p className='text-base text-gray-600'>{room?.description}</p>
        </div>
      </div>
    </div>
  )
}
