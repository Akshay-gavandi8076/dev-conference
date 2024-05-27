'use client'
import React from 'react'
import { badgeVariants } from './ui/badge'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export function TagsList({ tags }: { tags: string[] }) {
  const router = useRouter()
  return (
    <div className='flex gap-2 flex-wrap'>
      {tags?.map((tag) => (
        <button
          onClick={() => {
            router.push(`/?search=${tag}`)
          }}
          key={tag}
          className={cn(badgeVariants())}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
