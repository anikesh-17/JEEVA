import React from "react";
import { NavLink } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { AiOutlineMessage } from "react-icons/ai";
import {
  FaUserDoctor,
  FaPeopleGroup,
  FaBriefcaseMedical,
} from "react-icons/fa6";
import { HiMiniBuildingOffice } from "react-icons/hi2";
import { RiCalendarScheduleLine } from "react-icons/ri";
import {
  MdOutlineDateRange,
  MdOutlineCurrencyRupee,
  MdOutlineSettings,
} from "react-icons/md";
import { TbFileReport, TbHelp } from "react-icons/tb";
import { BsRobot } from "react-icons/bs";
import { FaBars } from "react-icons/fa";

const Navbar1 = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`
        h-screen bg-[#fcfdf5] dark:bg-zinc-900 border-r dark:border-zinc-800 p-3 font-sm
        text-gray-700 dark:text-zinc-300
        transition-all duration-300 fixed top-0 left-0
        ${isOpen ? "w-[220px]" : "w-[70px]"}
        overflow-y-auto no-scrollbar
      `}
    >
      {/* Toggle Button */}
      <div
        className="flex justify-end mb-4 cursor-pointer text-gray-700 dark:text-zinc-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars size={22} />
      </div>

      {/* MENU */}
      <NavLink to="/home" className="flex items-center gap-3 mb-3 font-medium text-gray-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400">
        <BiSolidDashboard size={18} />
        {isOpen && <span>Home</span>}
      </NavLink>

      <NavLink to="/inbox" className="flex items-center gap-3 mb-4 font-medium text-gray-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400">
        <AiOutlineMessage size={18} />
        {isOpen && <span>Inbox</span>}
      </NavLink>

      {isOpen && <h1 className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">APPLICATIONS</h1>}

      <NavLink to="/doctor" className="menu-item text-gray-700 dark:text-zinc-350 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-3 py-2 px-2.5 rounded-lg transition-colors">
        <FaUserDoctor size={18} />
        {isOpen && <span>Doctor</span>}
      </NavLink>

      <NavLink to="/patient" className="menu-item text-gray-700 dark:text-zinc-350 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-3 py-2 px-2.5 rounded-lg transition-colors">
        <FaPeopleGroup size={18} />
        {isOpen && <span>Patient</span>}
      </NavLink>

      <NavLink to="/departments" className="menu-item text-gray-700 dark:text-zinc-350 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-3 py-2 px-2.5 rounded-lg transition-colors">
        <HiMiniBuildingOffice size={18} />
        {isOpen && <span>Departments</span>}
      </NavLink>

      <NavLink to="/schedule" className="menu-item text-gray-700 dark:text-zinc-350 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-3 py-2 px-2.5 rounded-lg transition-colors">
        <RiCalendarScheduleLine size={18} />
        {isOpen && <span>Schedule</span>}
      </NavLink>

      <NavLink to="/appointment" className="menu-item text-gray-700 dark:text-zinc-350 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-3 py-2 px-2.5 rounded-lg transition-colors">
        <MdOutlineDateRange size={18} />
        {isOpen && <span>Appointment</span>}
      </NavLink>

      <NavLink to="/report" className="menu-item text-gray-700 dark:text-zinc-350 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-3 py-2 px-2.5 rounded-lg transition-colors">
        <TbFileReport size={18} />
        {isOpen && <span>Report</span>}
      </NavLink>

      <NavLink to="/human-resources" className="menu-item text-gray-700 dark:text-zinc-350 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-3 py-2 px-2.5 rounded-lg transition-colors">
        <FaBriefcaseMedical size={18} />
        {isOpen && <span>Human Resources</span>}
      </NavLink>

      <NavLink to="/jeeva-ai" className="menu-item text-gray-700 dark:text-zinc-350 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-3 py-2 px-2.5 rounded-lg transition-colors">
        <BsRobot size={18} />
        {isOpen && <span>JeevaAi</span>}
      </NavLink>

      {isOpen && <h1 className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">OTHERS</h1>}

      <NavLink to="/payment" className="menu-item text-gray-700 dark:text-zinc-350 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-3 py-2 px-2.5 rounded-lg transition-colors">
        <MdOutlineCurrencyRupee size={18} />
        {isOpen && <span>Payment</span>}
      </NavLink>

      {isOpen && <h1 className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">SUPPORT</h1>}

      <NavLink to="/settings" className="menu-item text-gray-700 dark:text-zinc-350 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-3 py-2 px-2.5 rounded-lg transition-colors">
        <MdOutlineSettings size={18} />
        {isOpen && <span>Settings</span>}
      </NavLink>

      <NavLink to="/help" className="menu-item text-gray-700 dark:text-zinc-350 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-3 py-2 px-2.5 rounded-lg transition-colors">
        <TbHelp size={18} />
        {isOpen && <span>Help</span>}
      </NavLink>
    </div>
  );
};

export default Navbar1;
