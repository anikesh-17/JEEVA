import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../api/user";
import { useNavigate } from "react-router-dom";
import { FaCalendarPlus, FaCalendarCheck, FaClock, FaUserMd, FaSpinner, FaArrowRight } from "react-icons/fa";
import { useAuthState } from "../Utils/Config";

function Schedule() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuthState();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSchedule = async () => {
      setLoading(true);
      const res = await fetchUserProfile();
      setLoading(false);
      if (res.ok && res.data?.user) {
        setAppointments(res.data.user.profile.appointments || []);
      }
    };

    if (!authLoading) {
      if (user) {
        loadSchedule();
      } else {
        navigate("/login");
      }
    }
  }, [user, authLoading]);

  return (
    <div className="w-full min-h-screen bg-[#f0f9f6] p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Clinic Schedule</h1>
            <p className="text-gray-500 mt-1">Track clinic hours, active timelines, and upcoming checkups.</p>
          </div>
          <button
            onClick={() => navigate("/appointment")}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-3 rounded-xl shadow-md shadow-teal-200 transition flex items-center gap-2 text-sm"
          >
            <FaCalendarPlus /> Schedule Vitals
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-teal-600" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* TIMELINE */}
            <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-gray-150 shadow-sm relative overflow-hidden h-fit">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-teal-500"></div>
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaCalendarCheck className="text-teal-600" /> Weekly Agenda
              </h2>

              <div className="space-y-6 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100 pr-2">
                {appointments.length > 0 ? (
                  appointments.map((appt, idx) => (
                    <div key={appt.id || appt._id || idx} className="flex gap-4 relative">
                      {/* Circle bullet */}
                      <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shrink-0 z-10 font-bold">
                        {idx + 1}
                      </div>
                      
                      <div className="flex-1 bg-gray-50/50 p-4 border border-gray-100 rounded-2xl">
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <div>
                            <h3 className="font-bold text-gray-800 text-sm">{appt.doctor}</h3>
                            <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md uppercase tracking-wider inline-block mt-1">
                              {appt.dept}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-400 font-semibold bg-white border border-gray-100 px-2.5 py-1 rounded-lg">
                            <FaClock /> {appt.time}
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                          <span>Scheduled on: <span className="font-semibold text-gray-700">{appt.date}</span></span>
                          <span className="font-bold text-gray-400 uppercase tracking-widest">{appt.type || "Check-up"}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center text-gray-400 italic">
                    <FaCalendarCheck className="mx-auto text-gray-200 mb-3" size={40} />
                    No sessions scheduled. Book a check-up to create clinic hours!
                  </div>
                )}
              </div>
            </div>

            {/* CLINIC HOURS */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500"></div>
                <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaClock className="text-blue-600" /> General Clinic Hours
                </h2>

                <div className="space-y-3.5 text-xs font-semibold text-gray-500">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-gray-800 font-bold">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-gray-800 font-bold">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-teal-600 font-extrabold uppercase">Emergency Only</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-purple-500"></div>
                <h2 className="text-base font-bold text-gray-800 mb-2">Need Urgent Consultation?</h2>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">Get immediate diagnostic screening via our automated artificial intelligence system.</p>
                <button
                  onClick={() => navigate("/jeeva-ai")}
                  className="w-full mt-4 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1"
                >
                  Launch Jeeva AI <FaArrowRight size={10} />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Schedule;