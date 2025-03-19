import React from 'react'
import Main from '../../ui/Main'
import Content from '../../ui/Content'
import Stats from '../../components/Stats/Stats'
import Team from '../../components/Team/Team'
import Profile from '../../components/Profile/Profile'
import Event from '../../components/Events/Event'

export default function Dashboard({darkMode}) {
  return (
    <Main>
    <Content>
      <Stats darkMode={darkMode}/>
      <div className="flex p-4 flex-col gap-3 xl:flex-row">
        <Team/>
        <Event darkMode={darkMode}/>
      </div>
    </Content>
    <Profile darkMode={darkMode}/>
   </Main>  )
}
