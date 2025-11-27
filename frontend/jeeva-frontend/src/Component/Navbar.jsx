import React from 'react'
import { RiHospitalFill } from "react-icons/ri";
import Navbar1 from './Navbar1';

const Navbar = () => {
  return (
    <div className='w-full bg-[#ecf4e7] px-10 py-4'>
        <div className='w-[200px] h-15 text-xl font-bold  flex p-5 items-center bg-zinc-100 rounded-md'>
           < RiHospitalFill/>
            <h1>JEEVA</h1>
        </div>
        <Navbar1/>
    </div>
  )
}

export default Navbar