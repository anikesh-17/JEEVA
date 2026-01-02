import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { BiDroplet } from "react-icons/bi";
import { FaHeartbeat, FaRibbon, FaBrain, FaArrowRight } from "react-icons/fa";
import { IoArrowBack } from 'react-icons/io5';
import { CgProfile } from "react-icons/cg";
import { GoTriangleDown } from "react-icons/go";
import logo from "../assets/Images/final_logo.png";
import { useAuthState, logout } from "../Utils/Config";

const JeevaAI = () => {
  const navigate = useNavigate();
  const { user } = useAuthState();
  const [showProfileCard, setShowProfileCard] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const models = [
    {
      name: "Diabetes Prediction",
      route: "/jeeva-ai/diabetes",
      icon: <BiDroplet size={32} />,
      color: "text-blue-500",
      bg: "bg-blue-50",
      description: "Assess your risk of diabetes using advanced ML algorithms."
    },
    {
      name: "Heart Disease",
      route: "/jeeva-ai/heart",
      icon: <FaHeartbeat size={32} />,
      color: "text-rose-500",
      bg: "bg-rose-50",
      description: "Analyze cardiovascular health markers for early detection."
    },
    {
      name: "Breast Cancer",
      route: "/jeeva-ai/breast",
      icon: <FaRibbon size={32} />,
      color: "text-pink-500",
      bg: "bg-pink-50",
      description: "Screening assistance for breast cancer risk analysis."
    },
    {
      name: "Parkinson’s Disease",
      route: "/jeeva-ai/parkinson",
      icon: <FaBrain size={32} />,
      color: "text-purple-500",
      bg: "bg-purple-50",
      description: "Early indicators of Parkinson's based on vocal patterns."
    },
  ];

  return (
    <>
      {/* --- STICKY TOP NAVBAR (Consistent with Home) --- */}
      <div className="w-full h-14 flex justify-between relative items-center sticky top-0 z-50 bg-[#dffdef] shadow-md">

        {/* Logo */}
        <div className="w-40 h-20 cursor-pointer" onClick={() => navigate('/home')}>
          <img className="w-[200px] h-[75px]" src={logo} alt="Jeeva Logo" />
        </div>

        {/* Profile Icon + Dropdown */}
        <div className="relative">
          <div className="flex items-center cursor-pointer" onClick={() => setShowProfileCard(!showProfileCard)}>
            <CgProfile className="text-zinc-600 " size={40} />
            <GoTriangleDown className={`text-zinc-600 transition-all duration-300 ${showProfileCard ? "rotate-180" : "rotate-0"}`} size={20} />
          </div>

          {/* Dropdown Content */}
          {showProfileCard && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg p-3 z-50">
              <p className="font-semibold">{user?.displayName || "User"}</p>
              <p className="text-sm text-gray-600 mb-2">{user?.email || "No Email"}</p>
              <hr className="my-2" />
              <NavLink to="/home/profile" className="block px-2 py-1 hover:bg-gray-100 rounded">Profile</NavLink>
              <NavLink to="/home/settings" className="block px-2 py-1 hover:bg-gray-100 rounded">Settings</NavLink>
              <button onClick={handleLogout} className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-red-600">Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* --- PAGE CONTENT --- */}
      <div className="w-full min-h-screen bg-[#f0f9f6] p-6 font-sans">

        {/* Back Button & Title */}
        <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/home')} className="p-2 bg-white rounded-full text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition shadow-sm border border-gray-100">
              <IoArrowBack size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Jeeva AI</h1>
              <p className="text-gray-500">Select a model to begin analysis</p>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {models.map((m, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-teal-200 group relative overflow-hidden"
              onClick={() => navigate(m.route)}
            >
              <div className="flex items-start justify-between relative z-10">
                <div className="flex gap-4">
                  <div className={`w-14 h-14 ${m.bg} ${m.color} rounded-xl flex items-center justify-center shadow-sm`}>
                    {m.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-teal-700 transition-colors">{m.name}</h2>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed max-w-[250px]">{m.description}</p>
                  </div>
                </div>
                <FaArrowRight className="text-gray-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Decorative Circle */}
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-gray-50 rounded-full group-hover:bg-teal-50 transition-colors duration-500"></div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default JeevaAI;
