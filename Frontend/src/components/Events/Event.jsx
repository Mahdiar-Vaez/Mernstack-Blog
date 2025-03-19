import React from 'react'
import Title from '../../ui/Title'
import { events } from '../../constants'
import Item from './Item'

export default function Event() {
  return (
    <div className='bg-white dark:bg-gray-600 p-5 rounded-2xl dark:text-gray-300 flex-1 flex flex-col gap-5'>
      <Title>
        رویداد ها
      </Title>
      {events.map((event,index)=>{
        return <Item event={event} key={index}/>
      })}
    </div>
  )
}
