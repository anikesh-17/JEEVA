import React from 'react'
import Navbar from './Component/Navbar'
import Routing from './Utils/Routing'

const App = () => {
  return (
    <div className='w-full h-screen'>
      <Navbar/>
      <Routing/>
    </div>
  )
}

export default App