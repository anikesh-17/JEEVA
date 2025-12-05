import React from 'react'
import { RiHospitalFill } from "react-icons/ri";
import Navbar1 from './Navbar1';
import { Outlet } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex w-full h-screen'>
    <div className='h-full overflow-y-auto no-scrollbar scroll-smooth'>
        {/* <div className='w-[200px] h-15 text-xl font-bold  flex p-5 items-center bg-zinc-400 rounded-md'>
           < RiHospitalFill/>
            <h1>JEEVA</h1>
      </div> */}       
        <Navbar1/>
        </div>
        <div className="flex-1 h-full overflow-y-auto no-scrollbar scroll-smooth">
        <Outlet/>
        </div>
    </div>
  )
}

export default Navbar