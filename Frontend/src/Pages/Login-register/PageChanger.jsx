import React, { useState } from 'react'
import Login from './login'
import Register from './Register'

export default function AuthPageChanger() {
    const [pageType,setPageType]=useState('login')
    const handlePageType=()=>{
        setPageType(pageType==='login'?'register':'login')
    }
  return (
    <>
     {pageType=='login'?<Login handlePageType={handlePageType}/>:<Register handlePageType={handlePageType}/>}
    </>
  )
}
