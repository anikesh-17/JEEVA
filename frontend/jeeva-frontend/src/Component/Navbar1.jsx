import React from 'react'
import {NavLink} from 'react-router-dom'
import { BiSolidDashboard } from "react-icons/bi";
import { AiOutlineMessage } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { HiMiniBuildingOffice } from "react-icons/hi2";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { MdOutlineDateRange } from "react-icons/md";
import { TbFileReport } from "react-icons/tb";
import { FaBriefcaseMedical } from "react-icons/fa";

const Navbar1 = () => {
  return (
    <div className='w-[200px] bg-zinc-200 font-sm mt-2 p-5 '>
        <NavLink style={(e)=>{
          return{
            color: e.isActive ? "blue" : ""
          }
        }} to="/" className="flex items-center gap-2 mb-2 font-medium"><BiSolidDashboard size={18}/><span>Home</span></NavLink>
        <NavLink style={(e)=>{
          return{
            color: e.isActive ? "blue" : ""
          }
        }}  to="/inbox" className="flex items-center gap-2 font-medium"><AiOutlineMessage size={18}/><span>Inbox</span></NavLink>

        <h1 className='mt-8 text-zinc-500 '>APPLICAITONS</h1>

         <NavLink style={(e)=>{
          return{
            color: e.isActive ? "blue" : ""
          }
        }}  to="/doctor" className="flex items-center gap-2 font-medium mt-2 mb-2"><FaUserDoctor size={18}/><span>Doctor</span></NavLink>

         <NavLink style={(e)=>{
          return{
            color: e.isActive ? "blue" : ""
          }
        }}  to="/patient" className="flex items-center gap-2 font-medium mb-2"><FaPeopleGroup size={18}/><span>Patient</span></NavLink>

         <NavLink style={(e)=>{
          return{
            color: e.isActive ? "blue" : ""
          }
        }}  to="/departments" className="flex items-center gap-2 font-medium mb-2"><HiMiniBuildingOffice size={18}/><span>Departments</span></NavLink>

         <NavLink style={(e)=>{
          return{
            color: e.isActive ? "blue" : ""
          }
        }}  to="/schedule" className="flex items-center gap-2 font-medium mb-2"><RiCalendarScheduleLine size={18}/><span>Schedule</span></NavLink>

         <NavLink style={(e)=>{
          return{
            color: e.isActive ? "blue" : ""
          }
        }}  to="/appointment" className="flex items-center gap-2 font-medium mb-2"><MdOutlineDateRange size={18}/><span>Appointment</span></NavLink>

         <NavLink style={(e)=>{
          return{
            color: e.isActive ? "blue" : ""
          }
        }}  to="/report" className="flex items-center gap-2 font-medium mb-2"><TbFileReport size={18}/><span>Report</span></NavLink>

         <NavLink style={(e)=>{
          return{
            color: e.isActive ? "blue" : ""
          }
        }}  to="/human-resources" className="flex items-center gap-2 font-medium"><FaBriefcaseMedical size={18}/><span>Human Resources</span></NavLink>
    </div>
  )
}
export default Navbar1