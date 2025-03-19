import React from 'react'
import { Outlet } from 'react-router-dom'
import Main from '../../ui/Main'
import Content from '../../ui/Content'
import Title from '../../ui/Title'

export default function Users() {
  return (
    <Main>
    <Content>
            <div>
                
            </div>
      <Outlet />
    </Content>
    
  </Main>
  )
}
