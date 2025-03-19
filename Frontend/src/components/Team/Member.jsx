import React from 'react'

export default function Member({user}) {
  return (
    <div className='flex justify-between  mt-12 items-center w-full'>
        <div className='flex  items-center justify-between max-md:w-full  gap-2 '>
            <img className='w-12 h-12 rounded-full flex ' src={user.image} alt={user.name} />
            <div className='flex flex-col justify-end items-end'>
                <h2 className='font-bold text-xl'>{user.name}</h2>
            </div>
            <span className={`${user.bgColor} text-sm text-gray-950 rounded-xl p-2` }>{user.role}</span>
        </div>
    </div>
    )
}
