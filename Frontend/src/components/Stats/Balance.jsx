import React from 'react'
import Title from '../../ui/Title'
import { FiSend } from 'react-icons/fi'
import Bar from './Bar'

export default function Balance({darkMode}) {
  return (
    <div className='bg-white p-4 flex-col gap-4 rounded-2xl dark:bg-gray-600 dark:text-gray-300 flex-1 justify-between items-center '>
        <div className=' flex items-center justify-between'>
            <Title>
                بالانس
            </Title>
            <FiSend className='bg-gray-500 p-2 rounded-full text-gray-300 w-8 h-8 '/>
        </div>
        <div>
            <h1>600,000,000
                <span className='font-medium text-xl '>
                    (R)
                </span>
            </h1>
            <span>
                در مرداد 1404
            </span>
        </div>
        <Bar darkMode={darkMode}/>
    </div>
  )
}
