import React from 'react'

export default function Item({event}) {
  return (
    <div className='flex gap-5 items-center '>
        <span className='bg-gray-300 text-gray-700 p-2 rounded-lg h-16 w-16 font-bold text-center'>{event.date}</span>
        <div>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
        </div>
    </div>
  )
}
