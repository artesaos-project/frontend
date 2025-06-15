import React from 'react'
import ModeratorHeader from '../components/ModeratorHeader'
import ModeratorTitle from '../components/ModeratorTitle'
import ModeratorSearch from './components/ModeratorSearch'
import ModeratorTable from './components/ModeratorTable'


function page() {
  return (
    <div className='overflow-x-hidden'>
      <ModeratorHeader />
      <ModeratorTitle title={'Artesãos'} />
      <ModeratorSearch/>
      <ModeratorTable/>
    </div>
  )
}

export default page