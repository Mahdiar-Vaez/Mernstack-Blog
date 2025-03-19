import React from 'react'
import ShortCuts from './ShortCuts'
import DonutChart from './DonutChart'
import User from './User'

export default function Profile({darkMode}) {
  return (
    <div className='px-2 py-4 mt-2 bg-gray-200 rounded-lg w-full dark:bg-gray-700 lg:w-60 xl:w-80 flex flex-col  gap-4 '>
<User/>
<ShortCuts/>
<DonutChart/>
    </div>
  )
}
