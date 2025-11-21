import React from 'react'
import Card from '../Home-Component/Card'
import Cards from '../Home-Component/Cards'
import ChartSection from '../Home-Component/ChartSection'

function Home() {
  return (
    <div className='w-full h-screen ml-72 mt-[-37vw] bg-sky-100'>
      <div className='w-full bg-zinc-100'>
        <h1 className='text-xl p-1  font-semibold'>Dashboard</h1>
        </div>
        <div>
          <Cards/>
        </div>
        <div className='p-2'>
          <ChartSection/>
        </div>
    </div>
  )
}

export default Home