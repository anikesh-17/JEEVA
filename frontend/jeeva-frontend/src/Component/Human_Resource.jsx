import React from "react";
import { FaUserNurse, FaPhoneAlt, FaEnvelope, FaClock, FaClipboardList } from "react-icons/fa";

const HR_CONTACTS = [
  { name: "Nurse Sarah Jenkins", role: "Head Nursing Supervisor (General Medicine)", contact: "+91 98765 43210", email: "sarah.j@jeeva.com", shift: "Morning Shift (8:00 AM - 4:00 PM)", image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=100&h=100" },
  { name: "Nurse David Miller", role: "Duty Supervisor (Emergency Care)", contact: "+91 98765 43211", email: "david.m@jeeva.com", shift: "Night Shift (12:00 AM - 8:00 AM)", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=100&h=100" },
  { name: "Support Executive Rohini Sen", role: "Billing & Accounts Coordinator", contact: "+91 98765 43212", email: "rohini.s@jeeva.com", shift: "Day Shift (9:00 AM - 6:00 PM)", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100" }
];

function Human_Resource() {
  return (
    <div className="w-full min-h-screen bg-[#f0f9f6] p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Hospital Directory & HR Support</h1>
          <p className="text-gray-500 mt-1">Get in touch with nursing supervisors, emergency coordinators, and support staff.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Support Contacts */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaUserNurse className="text-teal-600" /> Active Staff on Shift
            </h2>

            <div className="space-y-4">
              {HR_CONTACTS.map((staff, idx) => (
                <div key={idx} className="bg-white p-5 border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <img src={staff.image} alt={staff.name} className="w-14 h-14 rounded-2xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-850 text-sm">{staff.name}</h3>
                    <p className="text-xs text-gray-400 font-semibold mt-0.5">{staff.role}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-2 font-medium">
                      <span className="flex items-center gap-1"><FaPhoneAlt className="text-teal-500" /> {staff.contact}</span>
                      <span className="flex items-center gap-1"><FaClock className="text-gray-400" /> {staff.shift}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EMERGENCY CONTACTS */}
          <div className="md:col-span-1 bg-white p-6 rounded-3xl border border-gray-150 shadow-sm relative overflow-hidden h-fit">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-red-500"></div>
            <h2 className="text-base font-bold text-gray-850 mb-4 flex items-center gap-2">
              <FaClipboardList className="text-red-500 text-sm" /> Emergency Care lines
            </h2>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-red-50 rounded-2xl border border-red-100/50">
                <span className="block text-[10px] font-bold text-red-500 uppercase tracking-wide">Main Ambulance Line</span>
                <span className="block text-base font-extrabold text-red-700 mt-1 select-all">+91 102 (24/7 Toll-free)</span>
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">Triage / Front Desk</span>
                <span className="block text-sm text-gray-800 font-extrabold mt-1 select-all">+91 98765 00000</span>
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">Duty Pharmacist</span>
                <span className="block text-sm text-gray-800 font-extrabold mt-1 select-all">+91 98765 11111</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Human_Resource;