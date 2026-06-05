import React, { useEffect, useState } from "react";
import { fetchUserProfile, updateUserProfile } from "../api/user";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuthState, logout } from "../Utils/Config";
import logo from "../assets/Images/final_logo.png";

// Icons
import { CgProfile } from "react-icons/cg";
import { GoTriangleDown } from "react-icons/go";
import { IoArrowBack, IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaSpinner, FaEdit, FaSave, FaPlus, FaTrashAlt, FaHeartbeat, FaNotesMedical, FaPills, FaUserCircle } from "react-icons/fa";

const PatientProfile = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuthState();
  
  // States
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showProfileCard, setShowProfileCard] = useState(false);

  // Form lists helpers
  const [newAllergy, setNewAllergy] = useState("");
  const [newHistory, setNewHistory] = useState({ year: "", condition: "", type: "Acute", status: "Recovered" });
  const [newMedication, setNewMedication] = useState({ name: "", dose: "", freq: "", status: "Active" });

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        loadProfile();
      } else {
        navigate("/login");
      }
    }
  }, [user, authLoading]);

  const loadProfile = async () => {
    setLoading(true);
    const res = await fetchUserProfile();
    setLoading(false);
    if (res.ok && res.data?.user) {
      setProfile(res.data.user.profile || {
        age: 32,
        gender: "Male",
        contact: "",
        bloodGroup: "O+",
        allergies: [],
        vitals: { bp: "120/80", heartRate: "72 bpm", spO2: "98%", temp: "98.6°F", weight: "75 kg", height: "178 cm", bmi: "23.7" },
        history: [],
        medications: [],
        appointments: []
      });
    } else {
      setError(res.error || "Failed to load profile");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Auto calculate BMI if height/weight change
  const recalculateBMI = (updatedVitals) => {
    const w = parseFloat(updatedVitals.weight);
    const h = parseFloat(updatedVitals.height);
    if (!isNaN(w) && !isNaN(h) && h > 0) {
      // height can be in cm
      const heightInM = h > 3 ? h / 100 : h; // if height is like 178, convert to 1.78
      const bmiVal = (w / (heightInM * heightInM)).toFixed(1);
      return bmiVal;
    }
    return updatedVitals.bmi || "22.0";
  };

  const handleVitalChange = (key, value) => {
    setProfile(prev => {
      const updatedVitals = { ...prev.vitals, [key]: value };
      if (key === "weight" || key === "height") {
        updatedVitals.bmi = recalculateBMI(updatedVitals);
      }
      return {
        ...prev,
        vitals: updatedVitals
      };
    });
  };

  const handleFieldChange = (key, value) => {
    setProfile(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    const res = await updateUserProfile(profile);
    setSaving(false);
    if (res.ok) {
      setMessage("Profile saved successfully to MongoDB!");
      setEditMode(false);
      setTimeout(() => setMessage(null), 3000);
    } else {
      setError(res.error || "Failed to save profile");
    }
  };

  // Lists management
  const addAllergy = () => {
    if (!newAllergy.trim()) return;
    setProfile(prev => ({
      ...prev,
      allergies: [...(prev.allergies || []), newAllergy.trim()]
    }));
    setNewAllergy("");
  };

  const removeAllergy = (idx) => {
    setProfile(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== idx)
    }));
  };

  const addHistoryItem = () => {
    if (!newHistory.condition.trim() || !newHistory.year.trim()) return;
    setProfile(prev => ({
      ...prev,
      history: [...(prev.history || []), { ...newHistory }]
    }));
    setNewHistory({ year: "", condition: "", type: "Acute", status: "Recovered" });
  };

  const removeHistoryItem = (idx) => {
    setProfile(prev => ({
      ...prev,
      history: prev.history.filter((_, i) => i !== idx)
    }));
  };

  const addMedication = () => {
    if (!newMedication.name.trim() || !newMedication.dose.trim()) return;
    setProfile(prev => ({
      ...prev,
      medications: [...(prev.medications || []), { ...newMedication }]
    }));
    setNewMedication({ name: "", dose: "", freq: "", status: "Active" });
  };

  const removeMedication = (idx) => {
    setProfile(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== idx)
    }));
  };

  return (
    <>
      {/* Top Header */}
      <div className="w-full h-14 flex justify-between relative items-center sticky top-0 z-50 bg-[#dffdef] shadow-md">
        <div className="w-40 h-20 cursor-pointer" onClick={() => navigate("/home")}>
          <img className="w-[200px] h-[75px]" src={logo} alt="Jeeva Logo" />
        </div>

        <div className="relative">
          <div className="flex items-center cursor-pointer" onClick={() => setShowProfileCard(!showProfileCard)}>
            <CgProfile className="text-zinc-600 " size={40} />
            <GoTriangleDown className={`text-zinc-600 transition-all duration-300 ${showProfileCard ? "rotate-180" : "rotate-0"}`} size={20} />
          </div>

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

      {/* Main Container */}
      <div className="w-full min-h-screen bg-[#f0f9f6] p-6 font-sans">
        <div className="max-w-5xl mx-auto">
          {/* Header & Back Button */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/home")} className="p-2 bg-white rounded-full text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition shadow-sm border border-gray-100">
                <IoArrowBack size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
                <p className="text-sm text-gray-500">Manage your medical details and health vitals</p>
              </div>
            </div>

            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all duration-300 ${
                editMode 
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-teal-600 text-white hover:bg-teal-700 hover:shadow-md"
              }`}
            >
              {editMode ? "Cancel" : <><FaEdit /> Edit Profile</>}
            </button>
          </div>

          {/* Success / Error Toast */}
          {message && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 animate-fadeIn">
              <IoCheckmarkCircleOutline className="text-emerald-600" size={24} />
              <span className="font-medium">{message}</span>
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-3 animate-fadeIn">
              <span className="font-medium">{error}</span>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <FaSpinner className="animate-spin text-teal-600" size={40} />
            </div>
          ) : !profile ? (
            <div className="bg-white p-8 rounded-3xl border border-gray-150 text-center shadow-sm space-y-4">
              <p className="text-gray-500 font-semibold">Could not load profile data. Is the backend server running?</p>
              <button 
                type="button" 
                onClick={loadProfile} 
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-2.5 rounded-xl transition"
              >
                Retry Connection
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6">
              {/* Card 1: Basic Info */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-teal-500"></div>
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaUserCircle className="text-teal-600" /> Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Display Name</label>
                    <input
                      type="text"
                      disabled={!editMode}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 disabled:opacity-75 focus:outline-none focus:border-teal-500 focus:bg-white"
                      value={user?.displayName || "Patient"}
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      disabled
                      className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 opacity-75"
                      value={user?.email || "patient@jeeva.com"}
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Age</label>
                    <input
                      type="number"
                      disabled={!editMode}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 disabled:bg-gray-100 focus:outline-none focus:border-teal-500 focus:bg-white"
                      value={profile.age || ""}
                      onChange={(e) => handleFieldChange("age", Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Gender</label>
                    <select
                      disabled={!editMode}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 disabled:bg-gray-100 focus:outline-none focus:border-teal-500 focus:bg-white"
                      value={profile.gender || "Male"}
                      onChange={(e) => handleFieldChange("gender", e.target.value)}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contact Number</label>
                    <input
                      type="text"
                      disabled={!editMode}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 disabled:bg-gray-100 focus:outline-none focus:border-teal-500 focus:bg-white"
                      value={profile.contact || ""}
                      onChange={(e) => handleFieldChange("contact", e.target.value)}
                      placeholder="+91 9999999999"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Blood Group</label>
                    <select
                      disabled={!editMode}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 disabled:bg-gray-100 focus:outline-none focus:border-teal-500 focus:bg-white"
                      value={profile.bloodGroup || "O+"}
                      onChange={(e) => handleFieldChange("bloodGroup", e.target.value)}
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Card 2: Vitals */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-rose-500"></div>
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaHeartbeat className="text-rose-600" /> Health Vitals
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Blood Pressure</label>
                    <input
                      type="text"
                      disabled={!editMode}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 disabled:bg-gray-100 focus:outline-none focus:border-teal-500 focus:bg-white"
                      value={profile.vitals?.bp || ""}
                      onChange={(e) => handleVitalChange("bp", e.target.value)}
                      placeholder="120/80"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Heart Rate</label>
                    <input
                      type="text"
                      disabled={!editMode}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 disabled:bg-gray-100 focus:outline-none focus:border-teal-500 focus:bg-white"
                      value={profile.vitals?.heartRate || ""}
                      onChange={(e) => handleVitalChange("heartRate", e.target.value)}
                      placeholder="72 bpm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">SpO2 Oxygen</label>
                    <input
                      type="text"
                      disabled={!editMode}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 disabled:bg-gray-100 focus:outline-none focus:border-teal-500 focus:bg-white"
                      value={profile.vitals?.spO2 || ""}
                      onChange={(e) => handleVitalChange("spO2", e.target.value)}
                      placeholder="98%"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Temperature</label>
                    <input
                      type="text"
                      disabled={!editMode}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 disabled:bg-gray-100 focus:outline-none focus:border-teal-500 focus:bg-white"
                      value={profile.vitals?.temp || ""}
                      onChange={(e) => handleVitalChange("temp", e.target.value)}
                      placeholder="98.6°F"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Weight</label>
                    <input
                      type="text"
                      disabled={!editMode}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 disabled:bg-gray-100 focus:outline-none focus:border-teal-500 focus:bg-white"
                      value={profile.vitals?.weight || ""}
                      onChange={(e) => handleVitalChange("weight", e.target.value)}
                      placeholder="75 kg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Height</label>
                    <input
                      type="text"
                      disabled={!editMode}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 disabled:bg-gray-100 focus:outline-none focus:border-teal-500 focus:bg-white"
                      value={profile.vitals?.height || ""}
                      onChange={(e) => handleVitalChange("height", e.target.value)}
                      placeholder="178 cm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">BMI</label>
                    <input
                      type="text"
                      disabled
                      className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 opacity-75"
                      value={profile.vitals?.bmi || ""}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Card 3: Allergies & Medications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Allergies Box */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-yellow-500"></div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Allergies</h3>

                  {editMode && (
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        placeholder="Add new allergy (e.g. Pollen)"
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-500"
                        value={newAllergy}
                        onChange={(e) => setNewAllergy(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={addAllergy}
                        className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-4 py-2 flex items-center justify-center transition"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {profile.allergies?.length > 0 ? (
                      profile.allergies.map((allergy, idx) => (
                        <span key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-yellow-50 border border-yellow-100 text-yellow-800 font-medium">
                          {allergy}
                          {editMode && (
                            <button
                              type="button"
                              onClick={() => removeAllergy(idx)}
                              className="text-yellow-600 hover:text-red-500 hover:scale-110 transition"
                            >
                              <FaTrashAlt size={12} />
                            </button>
                          )}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400 italic">No allergies documented.</span>
                    )}
                  </div>
                </div>

                {/* Medications Box */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-purple-500"></div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaPills className="text-purple-600" /> Active Medications
                  </h3>

                  {editMode && (
                    <div className="space-y-2 mb-4 p-3 bg-purple-50/50 rounded-xl border border-purple-100/50">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Medicine name"
                          className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-teal-500"
                          value={newMedication.name}
                          onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Dosage (e.g. 500mg)"
                          className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-teal-500"
                          value={newMedication.dose}
                          onChange={(e) => setNewMedication({ ...newMedication, dose: e.target.value })}
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Frequency (e.g. Daily)"
                          className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-teal-500"
                          value={newMedication.freq}
                          onChange={(e) => setNewMedication({ ...newMedication, freq: e.target.value })}
                        />
                        <button
                          type="button"
                          onClick={addMedication}
                          className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-4 py-1.5 text-xs font-bold transition flex items-center gap-1"
                        >
                          <FaPlus /> Add
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto">
                    {profile.medications?.length > 0 ? (
                      profile.medications.map((med, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2">
                          <div>
                            <span className="font-semibold text-gray-800 text-sm">{med.name}</span>
                            <span className="text-xs text-gray-500 ml-2">({med.dose} - {med.freq})</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 font-bold border border-emerald-100">
                              {med.status}
                            </span>
                            {editMode && (
                              <button
                                type="button"
                                onClick={() => removeMedication(idx)}
                                className="text-gray-400 hover:text-red-500 transition"
                              >
                                <FaTrashAlt size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 italic py-2">No active medications.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 4: Medical History */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500"></div>
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaNotesMedical className="text-blue-600" /> Medical History
                </h2>

                {editMode && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                    <input
                      type="text"
                      placeholder="Year (e.g. 2023)"
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-500"
                      value={newHistory.year}
                      onChange={(e) => setNewHistory({ ...newHistory, year: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Condition / Surgery"
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-500 animate-fadeIn"
                      value={newHistory.condition}
                      onChange={(e) => setNewHistory({ ...newHistory, condition: e.target.value })}
                    />
                    <select
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-500"
                      value={newHistory.type}
                      onChange={(e) => setNewHistory({ ...newHistory, type: e.target.value })}
                    >
                      <option value="Acute">Acute</option>
                      <option value="Chronic">Chronic</option>
                      <option value="Surgery">Surgery</option>
                      <option value="Infection">Infection</option>
                    </select>
                    <button
                      type="button"
                      onClick={addHistoryItem}
                      className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-4 py-2 font-bold transition flex items-center justify-center gap-2"
                    >
                      <FaPlus /> Add History
                    </button>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 font-medium">
                        <th className="py-2.5">Year</th>
                        <th className="py-2.5">Condition</th>
                        <th className="py-2.5">Type</th>
                        <th className="py-2.5">Status</th>
                        {editMode && <th className="py-2.5 text-center">Action</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {profile.history?.length > 0 ? (
                        profile.history.map((hist, idx) => (
                          <tr key={idx} className="text-gray-700 hover:bg-gray-50/50">
                            <td className="py-3 font-semibold">{hist.year}</td>
                            <td className="py-3">{hist.condition}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                hist.type === 'Surgery' 
                                  ? 'bg-orange-50 border-orange-100 text-orange-700' 
                                  : 'bg-blue-50 border-blue-100 text-blue-700'
                              }`}>
                                {hist.type}
                              </span>
                            </td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                hist.status === 'Resolved' 
                                  ? 'bg-emerald-50 text-emerald-700' 
                                  : 'bg-amber-50 text-amber-700'
                              }`}>
                                {hist.status}
                              </span>
                            </td>
                            {editMode && (
                              <td className="py-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => removeHistoryItem(idx)}
                                  className="text-gray-400 hover:text-red-500 transition"
                                >
                                  <FaTrashAlt size={14} />
                                </button>
                              </td>
                            )}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={editMode ? 5 : 4} className="py-4 text-center text-gray-400 italic">No medical history logged.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Edit Mode Save Button */}
              {editMode && (
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-teal-200 transition-all duration-300 disabled:opacity-50"
                  >
                    {saving ? <FaSpinner className="animate-spin" /> : <><FaSave /> Save Profile Changes</>}
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default PatientProfile;
