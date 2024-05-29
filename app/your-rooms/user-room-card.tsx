'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { Room } from '@prisma/client'
import { GithubIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { TagsList } from '@/components/tags-list'
import { splitTags } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { deleteRoomAction } from './action'

export const UserRoomCard = ({ room }: { room: Room }) => {
  return (
    <Card className='shadow-md shadow-slate-300 dark:shadow-slate-800'>
      <CardHeader className='relative'>
        <Button
          className='absolute top-2 right-2'
          size='icon'
          variant='outline'
        >
          <Link href={`/edit-room/${room.id}`}>
            <PencilIcon />
          </Link>
        </Button>
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
            Github Repo
          </Link>
        )}
      </CardContent>
      <CardFooter className='flex gap-2'>
        <Button>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='destructive'>
              <Trash2Icon className='h-4 w-4' /> Delete Room
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove the
                room and any data associated with it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteRoomAction(room.id)
                }}
              >
                Yes, delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}
