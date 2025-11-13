import React from 'react'
import { RiHospitalFill } from "react-icons/ri";

const Navbar = () => {
  return (
    <div className='w-40 h-20'>
        <div className='w-60 h-10 font-sm text-blue flex p-5 items-center gap-2 '>
           < RiHospitalFill/>
            <h1>Evergreen Hospital</h1>
        </div>
    </div>
  )
}

export default Navbar