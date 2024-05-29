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
import { CircleX, SearchIcon } from 'lucide-react'
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
                <div className='relative'>
                  <Input
                    {...field}
                    className='w-[440px] pr-10'
                    placeholder='Filter rooms by keywords, such as typescript, next.js, python'
                  />

                  {query.get('search') && (
                    <Button
                      variant='ghost'
                      className='absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full'
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: 0,
                      }}
                    >
                      <CircleX
                        onClick={() => {
                          form.setValue('search', '')
                        }}
                        className='h-5 w-5 hover:text-red-500'
                      />
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>
          <SearchIcon className='h-4 w-4 mr-2' /> Search
        </Button>
      </form>
    </Form>
  )
}

export default SearchBar

// <Button
//           variant='ghost'
//           onClick={() => {
//             form.setValue('search', '')
//           }}
//           className='absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full border-none bg-none hover:drop-shadow-none'
//         >
//           <CircleX className='h-4 w-4 hover:text-red-500' />
//         </Button>
