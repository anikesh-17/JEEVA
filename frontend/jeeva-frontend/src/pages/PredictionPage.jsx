// src/pages/PredictionPage.jsx
import React, { useState } from "react";
import { predict } from "../api/predict";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuthState, logout } from "../Utils/Config";
import logo from "../assets/Images/final_logo.png";

// Icons
import { CgProfile } from "react-icons/cg";
import { GoTriangleDown } from "react-icons/go";
import { IoArrowBack } from 'react-icons/io5';
import { FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

/**
 * props:
 * - title (string)
 * - featureCount (number)
 * - endpoint (string) e.g. "/predict/diabetes"
 * - featureLabels (optional array of labels for inputs)
 */
const PredictionPage = ({ title, featureCount, endpoint, featureLabels = [] }) => {
  // Logic State
  const [features, setFeatures] = useState(Array(featureCount).fill(""));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // {prediction, result}
  const [error, setError] = useState(null);

  // UI State
  const [showProfileCard, setShowProfileCard] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthState();

  // Handlers
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const setFeatureAt = (idx, val) => {
    const copy = [...features];
    copy[idx] = val;
    setFeatures(copy);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError(null);
    setResult(null);

    // simple validation
    for (let i = 0; i < features.length; i++) {
      // Allow 0 but check for empty string
      if (features[i] === "" || features[i] === null) {
        setError(`Please fill input: ${featureLabels[i] || "Feature " + (i + 1)}`);
        return;
      }
      if (isNaN(Number(features[i]))) {
        setError(`${featureLabels[i] || "Input " + (i + 1)} must be a number`);
        return;
      }
    }

    setLoading(true);
    const parsed = features.map((f) => Number(f));
    const res = await predict(endpoint, parsed);
    setLoading(false);

    if (!res.ok) {
      setError(res.error);
      return;
    }

    setResult(res.data);
  };

  const reset = () => {
    setFeatures(Array(featureCount).fill(""));
    setResult(null);
    setError(null);
  };

  return (
    <>
      {/* --- STICKY TOP NAVBAR --- */}
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

        <div className="max-w-4xl mx-auto">

          {/* Header / Nav Back */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fadeIn">
            <div className="flex items-center gap-6">
              <button onClick={() => navigate('/jeeva-ai')} className="p-3 bg-white rounded-full text-gray-400 hover:bg-teal-50 hover:text-teal-600 transition shadow-sm border border-gray-100 group">
                <IoArrowBack size={24} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{title}</h1>
                <p className="text-gray-500 mt-1 text-lg">Enter patient details below.</p>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="text-right">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Completion</span>
                <span className="text-lg font-bold text-teal-600">{Math.round((features.filter(f => f !== "").length / featureCount) * 100)}%</span>
              </div>
              <div className="w-12 h-12 relative flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-100" />
                  <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="4" fill="transparent"
                    strokeDasharray={113}
                    strokeDashoffset={113 - (113 * (features.filter(f => f !== "").length / featureCount))}
                    className="text-teal-500 transition-all duration-500 ease-out" />
                </svg>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-teal-900/5 border border-gray-100 overflow-hidden relative">
            {/* Decorative Top Accent */}
            <div className="h-2 w-full bg-gradient-to-r from-teal-400 to-emerald-400"></div>

            <div className="p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* Grid of Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                  {features.map((val, i) => {
                    const isValid = val !== "" && !isNaN(Number(val));
                    return (
                      <div key={i} className="flex flex-col gap-2 group relative">
                        <label className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-teal-600 transition-colors">
                          <span>{featureLabels[i] ? featureLabels[i] : `Feature ${i + 1}`}</span>
                          {isValid && <span className="text-teal-500 animate-fadeIn"><FaCheckCircle size={14} /></span>}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            inputMode="decimal"
                            value={val}
                            onChange={(e) => setFeatureAt(i, e.target.value)}
                            className={`w-full bg-gray-50 border rounded-xl px-4 py-3.5 text-gray-800 font-medium 
                                           placeholder-gray-400
                                           focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 
                                           transition-all duration-300
                                           ${isValid ? 'border-teal-500 bg-teal-50/10' : 'border-gray-200 focus:border-teal-500'}
                                           `}
                            placeholder="0.00"
                          />
                          {isValid && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-500 pointer-events-none transition-opacity">

                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 border-t border-gray-50">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-xl 
                                 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold text-lg
                                 shadow-lg shadow-teal-200 hover:shadow-teal-300 hover:-translate-y-0.5
                                 disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none
                                 transition-all duration-300"
                  >
                    {loading ? <FaSpinner className="animate-spin" /> : "Run Prediction"}
                  </button>

                  <button
                    type="button"
                    onClick={reset}
                    className="text-gray-400 hover:text-gray-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Reset fields
                  </button>

                  <div className="ml-auto text-xs text-gray-300 font-mono hidden sm:block selection:bg-teal-100">{endpoint}</div>
                </div>

              </form>
            </div>

            {/* --- RESULTS SECTION (Overlay or Expand) --- */}
            {(result || error) && (
              <div className="bg-gray-50 border-t border-gray-100 p-8 md:p-10 animate-slideUp">

                {error && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-700 flex items-start gap-4">
                    <div className="p-2 bg-white rounded-full text-red-500 shadow-sm"><FaExclamationCircle size={24} /></div>
                    <div>
                      <h4 className="font-bold text-lg">Prediction Error</h4>
                      <p className="text-red-600/80">{error}</p>
                    </div>
                  </div>
                )}

                {result && (
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div className="flex items-start gap-5">
                      <div className="p-3 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl text-white shadow-lg shadow-teal-200">
                        <FaCheckCircle size={32} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-1">Analysis Complete</div>
                        <div className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">{result.prediction}</div>
                        <p className="text-gray-600 text-lg">{result.result}</p>
                      </div>
                    </div>

                    {result?.probability && (
                      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center min-w-[140px]">
                        <span className="text-3xl font-bold text-teal-600">{result.probability}</span>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Confidence</span>
                      </div>
                    )}
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default PredictionPage;

