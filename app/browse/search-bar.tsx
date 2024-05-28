'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { unstable_noStore as noStore } from 'next/cache'
import { z } from 'zod'

const SearchBar = () => {
  noStore()

  const router = useRouter()
  const query = useSearchParams()

  const formSchema = z.object({
    search: z.string().min(0).max(50),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: query.get('search') ?? '',
    },
  })

  const search = query.get('search')

  useEffect(() => {
    form.setValue('search', search ?? '')
  }, [search, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.search) {
      router.push(`/browse/?search=${values.search}`)
    } else {
      router.push('/browse')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex gap-2'
      >
        <FormField
          control={form.control}
          name='search'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className='w-[440px]'
                  placeholder='Filter rooms by keywords, such as typescript, next.js, python'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>
          <SearchIcon className='h-4 w-4 mr-2' /> Search
        </Button>

        {query.get('search') && (
          <Button
            variant='link'
            onClick={() => {
              form.setValue('search', '')
            }}
          >
            Clear
          </Button>
        )}
      </form>
    </Form>
  )
}

export default SearchBar