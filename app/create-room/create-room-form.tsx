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
import { createRoomAction } from './action'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'
import { toast } from '@/components/ui/use-toast'

const CreateRoomForm = () => {
  const router = useRouter()

  const formSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(250),
    githubRepo: z.string().min(1).max(250),
    tags: z.string().min(1).max(50),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      githubRepo: '',
      tags: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const session = await getSession()

    if (!session?.user?.id) {
      throw new Error('User is not authenticated')
    }

    const userId = session.user.id

    try {
      await createRoomAction(values, userId)

      toast({
        title: 'Room Created',
        description: 'Room created successfully',
      })

      router.push('/your-rooms')
    } catch (error) {
      toast({
        title: 'Room Failed',
        description: `Failed to create room ${error}`,
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

export default CreateRoomForm
