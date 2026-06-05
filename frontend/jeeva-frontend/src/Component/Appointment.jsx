import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchUserProfile, updateUserProfile } from "../api/user";
import { FaCalendarAlt, FaClock, FaUserMd, FaHeartbeat, FaTrashAlt, FaPlus, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { useAuthState } from "../Utils/Config";

const DOCTOR_LIST = [
  { name: "Dr. Ramesh Sharma", dept: "Cardiology" },
  { name: "Dr. Priya Gupta", dept: "Neurology" },
  { name: "Dr. Amit Roy", dept: "Oncology" },
  { name: "Dr. Anjali Mehta", dept: "Pediatrics" },
  { name: "Dr. Vikram Malhotra", dept: "General Medicine" },
  { name: "Dr. Shalini Singh", dept: "Cardiology" }
];

const DEPARTMENTS = ["Cardiology", "Neurology", "Oncology", "Pediatrics", "General Medicine"];

function Appointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuthState();

  // States
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Form states
  const [doctor, setDoctor] = useState("");
  const [dept, setDept] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("Check-up");

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        loadProfileAndAppointments();
      } else {
        navigate("/login");
      }
    }
  }, [user, authLoading]);

  const loadProfileAndAppointments = async () => {
    setLoading(true);
    const res = await fetchUserProfile();
    setLoading(false);
    if (res.ok && res.data?.user) {
      setProfile(res.data.user.profile);
      setAppointments(res.data.user.profile.appointments || []);
      
      // Prefill if state passed from Doctor page
      if (location.state?.doctorName) {
        setDoctor(location.state.doctorName);
        setDept(location.state.department || "");
      }
    } else {
      setError(res.error || "Failed to load appointments");
    }
  };

  const handleDeptChange = (selectedDept) => {
    setDept(selectedDept);
    // Auto set first doctor of that department
    const docOfDept = DOCTOR_LIST.find(d => d.dept === selectedDept);
    if (docOfDept) {
      setDoctor(docOfDept.name);
    } else {
      setDoctor("");
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!doctor || !dept || !date || !time) {
      setError("Please fill in all booking fields.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const newAppt = {
      id: Math.random().toString(36).substr(2, 9),
      doctor,
      dept,
      date,
      time,
      type
    };

    const updatedProfile = {
      ...profile,
      appointments: [...appointments, newAppt]
    };

    const res = await updateUserProfile(updatedProfile);
    setSubmitting(false);

    if (res.ok) {
      setProfile(updatedProfile);
      setAppointments(updatedProfile.appointments);
      setSuccess("Appointment booked successfully!");
      // Reset form
      setDoctor("");
      setDept("");
      setDate("");
      setTime("");
      setType("Check-up");
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError(res.error || "Failed to book appointment.");
    }
  };

  const handleCancel = async (apptId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    setError(null);
    setSuccess(null);

    const updatedAppts = appointments.filter(appt => appt.id !== apptId && appt._id !== apptId);
    const updatedProfile = {
      ...profile,
      appointments: updatedAppts
    };

    const res = await updateUserProfile(updatedProfile);
    if (res.ok) {
      setProfile(updatedProfile);
      setAppointments(updatedAppts);
      setSuccess("Appointment cancelled successfully.");
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError(res.error || "Failed to cancel appointment.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f0f9f6] p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Appointments</h1>
          <p className="text-gray-500 mt-1">Schedule new consultations and monitor your medical timetable.</p>
        </div>

        {/* Notifications */}
        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 animate-fadeIn">
            <FaCheckCircle className="text-emerald-600" />
            <span className="font-semibold">{success}</span>
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-3 animate-fadeIn">
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-teal-600" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* BOOKING FORM */}
            <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-150 shadow-sm flex flex-col justify-between relative overflow-hidden h-fit">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-teal-500"></div>
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaPlus className="text-teal-600 text-sm" /> Schedule Session
                </h2>

                <form onSubmit={handleBook} className="space-y-4">
                  {/* Department */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Department</label>
                    <select
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition"
                      value={dept}
                      onChange={(e) => handleDeptChange(e.target.value)}
                      required
                    >
                      <option value="">Select Department</option>
                      {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>

                  {/* Doctor */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Doctor</label>
                    <select
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition"
                      value={doctor}
                      onChange={(e) => setDoctor(e.target.value)}
                      required
                      disabled={!dept}
                    >
                      <option value="">Select Doctor</option>
                      {DOCTOR_LIST.filter(d => d.dept === dept).map(d => (
                        <option key={d.name} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date</label>
                    <input
                      type="date"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition"
                      value={date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Time Slot</label>
                    <input
                      type="time"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Appointment Type</label>
                    <select
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="Check-up">General Check-up</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Report Review">Report Review</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 mt-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md shadow-teal-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? <FaSpinner className="animate-spin" /> : "Confirm Booking"}
                  </button>
                </form>
              </div>
            </div>

            {/* UPCOMING LIST */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-150 shadow-sm relative overflow-hidden h-fit">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500"></div>
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaCalendarAlt className="text-blue-600" /> Booked Appointments
              </h2>

              <div className="space-y-4 divide-y divide-gray-100 max-h-[500px] overflow-y-auto pr-2">
                {appointments.length > 0 ? (
                  appointments.map((appt, idx) => (
                    <div key={appt.id || appt._id || idx} className="flex justify-between items-center pt-4 first:pt-0">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                          <FaUserMd size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-base">{appt.doctor}</h3>
                          <p className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md inline-block mt-0.5 uppercase tracking-wide">
                            {appt.dept}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                            <span className="flex items-center gap-1"><FaCalendarAlt /> {appt.date}</span>
                            <span className="flex items-center gap-1"><FaClock /> {appt.time}</span>
                            <span className="flex items-center gap-1"><FaHeartbeat /> {appt.type || "Check-up"}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCancel(appt.id || appt._id)}
                        className="p-3.5 bg-gray-50 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all duration-300"
                        title="Cancel Appointment"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center text-gray-400 italic">
                    <FaCalendarAlt className="mx-auto text-gray-200 mb-3" size={40} />
                    No upcoming appointments scheduled.
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Appointment;