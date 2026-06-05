import React, { useState, useEffect } from "react";
import Card from "../Home-Component/Card";
import Cards from "../Home-Component/Cards";
import ChartSection from "../Home-Component/ChartSection";
import PatientTable from "../Home-Component/PatientTable";
import logo from "../assets/Images/final_logo.png";
import { CgProfile } from "react-icons/cg";
import { GoTriangleDown } from "react-icons/go";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthState, logout } from "../Utils/Config";
import { fetchUserProfile, fetchUserPredictions } from "../api/user";
import { FaSpinner } from "react-icons/fa";

function Home() {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const { user } = useAuthState();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      const profileRes = await fetchUserProfile();
      const predictionsRes = await fetchUserPredictions();
      setLoading(false);

      if (profileRes.ok && profileRes.data?.user) {
        setProfile(profileRes.data.user.profile);
      }
      if (predictionsRes.ok && predictionsRes.data?.predictions) {
        setPredictions(predictionsRes.data.predictions);
      }
    };

    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      {/* Top Section - Sticky Header */}
      <div className="w-full h-14 flex justify-between relative items-center sticky top-0 z-50 bg-[#dffdef] shadow-md">

        {/* Logo */}
        <div className="w-40 h-20">
          <img
            className="w-[200px] h-[75px]"
            src={logo}
            alt="Jeeva Logo"
          />
        </div>

        {/* Profile Icon + Dropdown */}
        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setShowProfileCard(!showProfileCard)}
          >
            <CgProfile className="text-zinc-600 " size={40} />
            <GoTriangleDown className={`text-zinc-600 transition-all duration-300 ${showProfileCard ? "rotate-180" : "rotate-0"
              }`} size={20} />
          </div>

          {/* Profile Dropdown Card */}
          {showProfileCard && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg p-3 z-50">

              <p className="font-semibold">{user?.displayName || "User"}</p>
              <p className="text-sm text-gray-600 mb-2">{user?.email || "No Email"}</p>

              <hr className="my-2" />

              <NavLink
                to="/home/profile"
                className="block px-2 py-1 hover:bg-gray-100 rounded"
              >
                Profile
              </NavLink>

              <NavLink
                to="/home/settings"
                className="block px-2 py-1 hover:bg-gray-100 rounded"
              >
                Settings
              </NavLink>

              <button
                onClick={handleLogout}
                className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-red-600"
              >
                Logout
              </button>

            </div>
          )}
        </div>
      </div>

      <div className="w-full min-h-screen bg-[#e5fdf2] p-2 overflow-x-hidden">
        <hr />

        {/* Dashboard Header */}
        <div className="flex items-center justify-between bg-white p-3 rounded-md mb-4 shadow-sm">
          <h1 className="text-xl font-semibold font-outfit">Dashboard</h1>

          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 w-[250px] bg-gray-100 border border-gray-300 rounded-md outline-none focus:border-blue-500"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-teal-600" size={40} />
          </div>
        ) : (
          <>
            {/* Cards */}
            <Cards profile={profile} predictions={predictions} />

            {/* Chart Section */}
            <div className="mt-2 font-sora">
              <ChartSection profile={profile} predictions={predictions} />
            </div>

            {/* Patient Table */}
            <div className="mt-2 font-sora">
              <PatientTable predictions={predictions} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
