import React from 'react'
import GetAllComments from './GetAllCommetns/GetAllCommetn'
import Content from '../../ui/Content'
import Main from '../../ui/Main'

export default function Comments() {
  return (
    <Main>
      <Content >
        <div className='overflow-x-auto'>        <GetAllComments/>
</div>
      
      </Content>
      
   
    </Main>
  )
}
