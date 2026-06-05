import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBell, FaPalette, FaLock, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, useAuthState } from "../Utils/Config";
import { fetchUserSettings, updateUserSettings } from "../api/user";

function Settings() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuthState();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loadingReset, setLoadingReset] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(true);

  // Preference states loaded from localStorage/db
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [emailAlerts, setEmailAlerts] = useState(() => localStorage.getItem("emailAlerts") !== "false");
  const [smsAlerts, setSmsAlerts] = useState(() => localStorage.getItem("smsAlerts") === "true");

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        loadSettings();
      } else {
        navigate("/login");
      }
    }
  }, [user, authLoading]);

  const loadSettings = async () => {
    setLoadingSettings(true);
    const res = await fetchUserSettings();
    setLoadingSettings(false);
    if (res.ok && res.data?.settings) {
      const dbSettings = res.data.settings;
      setDarkMode(dbSettings.darkMode);
      setEmailAlerts(dbSettings.emailAlerts);
      setSmsAlerts(dbSettings.smsAlerts);

      // sync to local elements immediately
      if (dbSettings.darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      localStorage.setItem("emailAlerts", String(dbSettings.emailAlerts));
      localStorage.setItem("smsAlerts", String(dbSettings.smsAlerts));
    }
  };

  const handleToggleDarkMode = async () => {
    const nextValue = !darkMode;
    setDarkMode(nextValue);
    if (nextValue) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    // sync to backend
    await updateUserSettings({ darkMode: nextValue, emailAlerts, smsAlerts });
  };

  const handleToggleEmailAlerts = async () => {
    const nextValue = !emailAlerts;
    setEmailAlerts(nextValue);
    localStorage.setItem("emailAlerts", String(nextValue));
    await updateUserSettings({ darkMode, emailAlerts: nextValue, smsAlerts });
  };

  const handleToggleSmsAlerts = async () => {
    const nextValue = !smsAlerts;
    setSmsAlerts(nextValue);
    localStorage.setItem("smsAlerts", String(nextValue));
    await updateUserSettings({ darkMode, emailAlerts, smsAlerts: nextValue });
  };

  const handlePasswordReset = async () => {
    const userEmail = auth.currentUser?.email;
    if (!userEmail) {
      setError("No authenticated user found.");
      return;
    }

    setLoadingReset(true);
    setError(null);
    setSuccess(null);

    try {
      await sendPasswordResetEmail(auth, userEmail);
      setSuccess("Password reset email sent! Please check your inbox.");
    } catch (err) {
      setError(err?.message || "Failed to trigger password reset.");
    } finally {
      setLoadingReset(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f0f9f6] dark:bg-zinc-950 p-6 font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-zinc-100 tracking-tight">Settings</h1>
          <p className="text-gray-500 dark:text-zinc-400 mt-1">Configure your personal preferences, interface layout, and account security.</p>
        </div>

        {/* Alerts */}
        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-450 flex items-center gap-3">
            <FaCheckCircle className="text-emerald-600 dark:text-emerald-500 animate-fadeIn" />
            <span className="font-semibold">{success}</span>
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/35 border border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-450 flex items-center gap-3">
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {loadingSettings || authLoading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-teal-600" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Menu Guide Links */}
            <div className="md:col-span-1 space-y-4">
              <button
                onClick={() => navigate("/home/profile")}
                className="w-full flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 hover:bg-teal-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:text-teal-600 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm font-semibold transition"
              >
                <FaUser /> Manage Profile
              </button>
              <div className="p-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm text-xs text-gray-400 dark:text-zinc-400 leading-relaxed">
                <span className="font-bold text-gray-500 dark:text-zinc-400 block mb-1">Account Info</span>
                Logged in as:<br />
                <span className="font-semibold text-gray-600 dark:text-zinc-350 break-all select-all">{auth.currentUser?.email || "patient@jeeva.com"}</span>
              </div>
            </div>

            {/* Form Settings */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Theme Preferences */}
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-150 dark:border-zinc-805 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-teal-500"></div>
                <h2 className="text-base font-bold text-gray-800 dark:text-zinc-150 mb-4 flex items-center gap-2">
                  <FaPalette className="text-teal-600 dark:text-teal-400" /> Interface Theme
                </h2>

                <div className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-zinc-800">
                  <div>
                    <h3 className="font-semibold text-gray-700 dark:text-zinc-300 text-sm">Dark Mode</h3>
                    <p className="text-xs text-gray-400 dark:text-zinc-450 mt-0.5">Toggle interface dark theme appearance.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleToggleDarkMode}
                    className={`w-12 h-6 rounded-full transition duration-300 relative ${
                      darkMode ? "bg-teal-600" : "bg-gray-200 dark:bg-zinc-700"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition duration-300 ${
                      darkMode ? "right-0.5" : "left-0.5"
                    }`} />
                  </button>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-150 dark:border-zinc-805 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-purple-500"></div>
                <h2 className="text-base font-bold text-gray-800 dark:text-zinc-150 mb-4 flex items-center gap-2">
                  <FaBell className="text-purple-600 dark:text-purple-400" /> Notifications & Alerts
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-zinc-800">
                    <div>
                      <h3 className="font-semibold text-gray-700 dark:text-zinc-300 text-sm">Email Reminders</h3>
                      <p className="text-xs text-gray-400 dark:text-zinc-450 mt-0.5">Receive reminders for upcoming appointments via email.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleToggleEmailAlerts}
                      className={`w-12 h-6 rounded-full transition duration-300 relative ${
                        emailAlerts ? "bg-teal-600" : "bg-gray-200 dark:bg-zinc-700"
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition duration-300 ${
                        emailAlerts ? "right-0.5" : "left-0.5"
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-semibold text-gray-700 dark:text-zinc-300 text-sm">SMS Reminders</h3>
                      <p className="text-xs text-gray-400 dark:text-zinc-450 mt-0.5">Get instant text alerts on your registered contact number.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleToggleSmsAlerts}
                      className={`w-12 h-6 rounded-full transition duration-300 relative ${
                        smsAlerts ? "bg-teal-600" : "bg-gray-200 dark:bg-zinc-700"
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition duration-300 ${
                        smsAlerts ? "right-0.5" : "left-0.5"
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Account & Security */}
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-150 dark:border-zinc-805 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-rose-500"></div>
                <h2 className="text-base font-bold text-gray-800 dark:text-zinc-150 mb-4 flex items-center gap-2">
                  <FaLock className="text-rose-600 dark:text-rose-450" /> Account Security
                </h2>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="font-semibold text-gray-700 dark:text-zinc-300 text-sm">Reset Account Password</h3>
                    <p className="text-xs text-gray-400 dark:text-zinc-450 mt-0.5">Sends a secure reset link to your registered email address.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handlePasswordReset}
                    disabled={loadingReset}
                    className="bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-400 font-bold px-5 py-2 rounded-xl text-xs transition flex items-center gap-2"
                  >
                    {loadingReset ? <FaSpinner className="animate-spin" /> : "Reset Password"}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Settings;