import React from 'react'
import Navbar from './Component/Navbar'
import Routing from './Utils/Routing'
import LocomotiveScroll from 'locomotive-scroll';

const App = () => { 
  const locomotiveScroll = new LocomotiveScroll();

  return (
    <div className="w-full min-h-screen overflow-x-hidden flex">

      {/* LEFT SIDEBAR */}
      <div className="left-0 top-0 w-[20px]">
        <Navbar />
      </div>

      {/* RIGHT CONTENT */}
      <div className="ml-[220px] w-full min-h-screen p-4">
        <Routing />
      </div>

    </div>
  )
}

export default App