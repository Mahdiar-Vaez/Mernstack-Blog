import React from 'react';
import { empolyeesData } from '../../constants/index';
import Card from './Card';
import Balance from './Balance';

export default function Stats({darkMode}) {
  return (
    <div className='flex flex-col px-4 gap-5'>
      <div className='flex flex-col   lg:flex-row gap-4 h-full'>
        <div className='flex items-center justify-between flex-col lg:flex-row gap-4  border-b border-gray-200  py-3'>
          {empolyeesData?.map((data, index) => (
            <Card data={data} key={index} />
          ))}
          
        </div>
      </div>
      <Balance darkMode={darkMode}/>

    </div>
  );
}