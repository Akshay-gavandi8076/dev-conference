'use client'

import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { editRoomAction } from './action'
import { useParams, useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { Room } from '@prisma/client'

type EditRoomFormProps = {}

const EditRoomForm = ({ room }: { room: Room }) => {
  const router = useRouter()
  const params = useParams()

  const formSchema = z.object({
    id: z.string(),
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(250),
    githubRepo: z.string().min(1).max(250),
    tags: z.string().min(1).max(50),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: params.roomId as string,
      name: room.name,
      description: room.description ?? '',
      githubRepo: room.githubRepo ?? '',
      tags: room.tags ?? '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await editRoomAction(values)
      toast({
        title: 'Room Updated',
        description: 'Your room was successfully updated',
      })
    } catch (error) {
      console.error('Failed to edit room:', error)
      toast({
        title: 'Error',
        description: 'Failed to update the room',
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Enter your name here.'
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Im working on a side project, come join me.'
                />
              </FormControl>
              <FormDescription>
                Please describe what you are doing.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='githubRepo'
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Repo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='https://github.com/Akshay-gavandi8076/dev-conference'
                />
              </FormControl>
              <FormDescription>
                Please put a link to the project you are working on.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='typescript, nextjs, tailwind'
                />
              </FormControl>
              <FormDescription>
                List your programming languages, frameworks, libraries so people
                can find you content
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}

export default EditRoomForm
