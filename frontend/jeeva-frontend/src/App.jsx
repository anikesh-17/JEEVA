import React from 'react'
import Navbar from './Component/Navbar'
import Routing from './Utils/Routing'
import LocomotiveScroll from 'locomotive-scroll';

const App = () => { 
  // const locomotiveScroll = new LocomotiveScroll();

  return (
        <div className="w-full h-screen overflow-hidden">
         <Routing />
         </div>
  )
}

export default App