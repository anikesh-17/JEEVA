import React from 'react'
import Card from './Card'
import { IoMdBed } from "react-icons/io";
import { FaUserDoctor } from "react-icons/fa6";
import { FaHeadSideMask } from "react-icons/fa6";

function Cards() {
    var comp = [
        {name:"Total Beds", number:"60", description:"Shows the number of current available beds" , icon:<IoMdBed/>},
        {name:"Doctors", number:"46", description:"Shows the number of current available doctors", icon:<FaUserDoctor/>},
        {name:"Patients", number:"212", description:"Displays live updates of patient numbers", icon:<FaHeadSideMask/>}
    ]
  return (
    <div className='flex gap-3'>{comp.map((elem, index)=> <Card key={index} val={elem}/>)}</div>
  )
}

export default Cards