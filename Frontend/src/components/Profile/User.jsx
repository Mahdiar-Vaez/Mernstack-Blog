import React, { useContext } from 'react'
import { AuthContext } from '../../Context/authContext'

export default function User() {
  const {user}=useContext(AuthContext)
  return (
    <div className='flex gap-3 items-center  p-4 rounded-full dark:bg-gray-600 dark:text-gray-300 '>
        <img  className='rounded-full w-14 h-14 ' src="./assets/user01.png" alt="عکس کاربر" />
  <div>
    <h3  className='font-semibold text-2xl '> {user.username}</h3>
    <p>توسعه دهنده</p>
  </div>
    </div>
  )
}
