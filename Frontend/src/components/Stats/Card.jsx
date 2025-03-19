import React from 'react';

export default function Card({ data }) {
  return (
    <div className='bg-white  w-full p-6 rounded-2xl flex items-center gap-4 dark:bg-gray-600 dark:text-gray-400'>
      <span className={` rounded-lg ${data?.bgColor} px-3 py-6 text-2xl dark:bg-gray-500`}>
        <data.icon />
      </span>
      <div>
        <h2 className='text-xl'>
          <span className='text-2xl'>{data.count}</span>/250
        </h2>
        <p className='font-bold'>{data.title}</p>
      </div>
    </div>
  );
}