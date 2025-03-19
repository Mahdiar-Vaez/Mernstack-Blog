import React from 'react'

export default function Content({children}) {
  return (
    <div className='flex-1 flex flex-col gap-5 min-h-[100svh] '>{children}</div>
  )
}
