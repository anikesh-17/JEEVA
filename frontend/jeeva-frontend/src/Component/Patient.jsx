import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../api/user";
import { FaUserShield, FaAddressCard, FaPhoneAlt, FaEnvelope, FaIdCard, FaSpinner, FaMapMarkerAlt, FaFileDownload } from "react-icons/fa";
import { useAuthState } from "../Utils/Config";
import { useNavigate } from "react-router-dom";

function Patient() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuthState();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      const res = await fetchUserProfile();
      setLoading(false);
      if (res.ok && res.data?.user) {
        setProfile(res.data.user.profile);
      }
    };

    if (!authLoading) {
      if (user) {
        loadProfile();
      } else {
        navigate("/login");
      }
    }
  }, [user, authLoading]);

  return (
    <div className="w-full min-h-screen bg-[#f0f9f6] p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Patient Directory</h1>
          <p className="text-gray-500 mt-1">Review your core patient credentials, primary care contacts, and active health policy info.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-teal-600" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Identity Card */}
            <div className="md:col-span-1 bg-white p-6 rounded-3xl border border-gray-150 shadow-sm flex flex-col justify-between relative overflow-hidden h-fit">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-teal-500"></div>
              <div>
                <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded uppercase tracking-wider">Active Patient</span>
                
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center font-bold text-lg">
                    {profile?.bloodGroup || "O+"}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-800 text-sm">Blood Group</h3>
                    <p className="text-xs text-gray-400 font-semibold mt-0.5">Verified Blood Type</p>
                  </div>
                </div>

                <div className="space-y-3.5 mt-8 border-t border-gray-50 pt-6">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <FaAddressCard className="text-gray-400" />
                    <span>ID: <span className="font-bold text-gray-750">JEEVA-789012</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <FaPhoneAlt className="text-gray-400" />
                    <span>{profile?.contact || "+91 1234567890"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>India (IN)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Insurance & PCP */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Primary Care Provider */}
              <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-purple-500"></div>
                <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaUserShield className="text-purple-600" /> Primary Care Provider (PCP)
                </h2>

                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150&h=150"
                    alt="Dr. Ramesh Sharma"
                    className="w-14 h-14 rounded-2xl object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-850 text-sm">Dr. Ramesh Sharma</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Cardiology Specialist</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-2 font-semibold">
                      <span>Room 302</span>
                      <span>•</span>
                      <span>Ext: #1042</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insurance Details */}
              <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500"></div>
                <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaIdCard className="text-blue-600" /> Policy & Insurance Coverage
                </h2>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Carrier</span>
                    <span className="block text-sm text-gray-800 font-semibold mt-1">Aetna Universal Health</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Policy Number</span>
                    <span className="block text-sm text-gray-800 font-mono font-semibold mt-1">POL-390-184</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Group Number</span>
                    <span className="block text-sm text-gray-800 font-semibold mt-1">GRP-9902</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Copay Rate</span>
                    <span className="block text-sm text-gray-800 font-semibold mt-1">$15.00 / Session</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Patient;