import React from 'react'
import { Badge } from './ui/badge'

export function TagsList({ tags }: { tags: string[] }) {
  return (
    <div className='flex gap-2 flex-wrap'>
      {tags?.map((tag) => (
        <Badge
          className='w-fit'
          key={tag}
        >
          {tag}
        </Badge>
      ))}
    </div>
  )
}
