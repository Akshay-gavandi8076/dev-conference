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
import { useSession } from 'next-auth/react'
import { createRoom } from './roomActions'

const CreateRoomForm = () => {
  const { data: session } = useSession()

  console.log('data:', session)

  const formSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(50),
    githubRepo: z.string().min(1).max(50),
    language: z.string().min(1).max(50),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      githubRepo: '',
      language: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const userId = session?.user?.id
      if (!userId) {
        throw new Error('User ID not found in session')
      }

      await createRoom({
        userId,
        name: data.name,
        description: data.description ?? null,
        githubRepo: data.githubRepo ?? null,
        language: data.language ?? null,
      })

      console.log('Room created successfully')
    } catch (error) {
      console.error('Failed to create room:', error)
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
                <Input {...field} />
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
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Please describe waht you are doing
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
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Please put a link to the project you are working on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='language'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Programming Langauge</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                List the primary programming language you are working with
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
