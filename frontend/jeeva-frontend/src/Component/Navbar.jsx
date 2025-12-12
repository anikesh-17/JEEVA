import React from "react";
import { RiHospitalFill } from "react-icons/ri";
import Navbar1 from "./Navbar1";

const Navbar = ({ isOpen, setIsOpen }) => {
  return (
    <div className="fixed left-0 top-0 h-screen font-outfit ">
      {/* <div className="w-full bg-[#ecf4e7] px-6 py-4">
        <div className="w-[200px] flex items-center gap-2 bg-zinc-400 rounded-md p-3">
          <RiHospitalFill />
          <h1 className={`${!isOpen && "hidden"} font-bold`}>JEEVA</h1>
        </div>
      </div> */}

      <Navbar1 isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Navbar;