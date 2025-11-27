import React, { useState } from "react";
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

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`
        bg-zinc-100 h-screen p-5 font-sm border-r
        transition-all duration-300
        ${isOpen ? "w-[220px]" : "w-[70px]"}
      `}
    >
      {/* Toggle Button */}
      <div
        className="flex justify-end mb-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars size={22} />
      </div>

      {/* MENU START */}
      <NavLink
        style={(e) => ({ color: e.isActive ? "blue" : "" })}
        to="/"
        className="flex items-center gap-2 mb-2 font-medium"
      >
        <BiSolidDashboard size={18} />
        {isOpen && <span>Home</span>}
      </NavLink>

      <NavLink
        style={(e) => ({ color: e.isActive ? "blue" : "" })}
        to="/inbox"
        className="flex items-center gap-2 font-medium"
      >
        <AiOutlineMessage size={18} />
        {isOpen && <span>Inbox</span>}
      </NavLink>

      {/* Section Title */}
      {isOpen && <h1 className="mt-8 text-zinc-500">APPLICATIONS</h1>}

      <NavLink
        style={(e) => ({ color: e.isActive ? "blue" : "" })}
        to="/doctor"
        className="flex items-center gap-2 font-medium mt-2 mb-2"
      >
        <FaUserDoctor size={18} />
        {isOpen && <span>Doctor</span>}
      </NavLink>

      <NavLink
        style={(e) => ({ color: e.isActive ? "blue" : "" })}
        to="/patient"
        className="flex items-center gap-2 font-medium mb-2"
      >
        <FaPeopleGroup size={18} />
        {isOpen && <span>Patient</span>}
      </NavLink>

      <NavLink
        style={(e) => ({ color: e.isActive ? "blue" : "" })}
        to="/departments"
        className="flex items-center gap-2 font-medium mb-2"
      >
        <HiMiniBuildingOffice size={18} />
        {isOpen && <span>Departments</span>}
      </NavLink>

      <NavLink
        style={(e) => ({ color: e.isActive ? "blue" : "" })}
        to="/schedule"
        className="flex items-center gap-2 font-medium mb-2"
      >
        <RiCalendarScheduleLine size={18} />
        {isOpen && <span>Schedule</span>}
      </NavLink>

      <NavLink
        style={(e) => ({ color: e.isActive ? "blue" : "" })}
        to="/appointment"
        className="flex items-center gap-2 font-medium mb-2"
      >
        <MdOutlineDateRange size={18} />
        {isOpen && <span>Appointment</span>}
      </NavLink>

      <NavLink
        style={(e) => ({ color: e.isActive ? "blue" : "" })}
        to="/report"
        className="flex items-center gap-2 font-medium mb-2"
      >
        <TbFileReport size={18} />
        {isOpen && <span>Report</span>}
      </NavLink>

      <NavLink
        style={(e) => ({ color: e.isActive ? "blue" : "" })}
        to="/human-resources"
        className="flex items-center gap-2 font-medium mb-2"
      >
        <FaBriefcaseMedical size={18} />
        {isOpen && <span>Human Resources</span>}
      </NavLink>

      <NavLink
        style={(e) => ({ color: e.isActive ? "blue" : "" })}
        to="/jeevaAi"
        className="flex items-center gap-2 font-medium mt-1"
      >
        <BsRobot size={18} />
        {isOpen && <span>JeevaAi</span>}
      </NavLink>

      {/* Others */}
      {isOpen && <h1 className="mt-8 text-zinc-500">OTHERS</h1>}

      <NavLink
        style={(e) => ({ color: e.isActive ? "blue" : "" })}
        to="/payment"
        className="flex items-center gap-2 font-medium mt-1"
      >
        <MdOutlineCurrencyRupee size={18} />
        {isOpen && <span>Payment</span>}
      </NavLink>

      {/* Support */}
      {isOpen && <h1 className="mt-8 text-zinc-500">SUPPORT</h1>}

      <NavLink
        style={(e) => ({ color: e.isActive ? "blue" : "" })}
        to="/settings"
        className="flex items-center gap-2 font-medium mt-1"
      >
        <MdOutlineSettings size={18} />
        {isOpen && <span>Settings</span>}
      </NavLink>

      <NavLink
        style={(e) => ({ color: e.isActive ? "blue" : "" })}
        to="/help"
        className="flex items-center gap-2 font-medium mt-1"
      >
        <TbHelp size={18} />
        {isOpen && <span>Help</span>}
      </NavLink>
    </div>
  );
};

export default Navbar1;
