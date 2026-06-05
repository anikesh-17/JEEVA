import React from "react";
import { FaHeartbeat, FaBrain, FaRibbon, FaBaby, FaBriefcaseMedical, FaXRay } from "react-icons/fa";

const DEPARTMENTS_DATA = [
  { name: "Cardiology", desc: "Advanced diagnostics and treatment options for cardiovascular diseases.", icon: <FaHeartbeat className="text-rose-500" size={24} />, doctors: 14, ext: "#120" },
  { name: "Neurology", desc: "Expert assessment and therapy for nervous system and brain disorders.", icon: <FaBrain className="text-blue-500" size={24} />, doctors: 8, ext: "#145" },
  { name: "Oncology", desc: "Compassionate cancer diagnostics, screening, and treatment pathways.", icon: <FaRibbon className="text-pink-500" size={24} />, doctors: 6, ext: "#110" },
  { name: "Pediatrics", desc: "Specialized clinical care and developmental tracking for children.", icon: <FaBaby className="text-amber-500" size={24} />, doctors: 10, ext: "#180" },
  { name: "General Medicine", desc: "Comprehensive adult health assessments and preventive care programs.", icon: <FaBriefcaseMedical className="text-teal-500" size={24} />, doctors: 18, ext: "#100" },
  { name: "Radiology", desc: "High-resolution imaging including CT, MRI, and ultrasound checks.", icon: <FaXRay className="text-purple-500" size={24} />, doctors: 5, ext: "#195" }
];

function Department() {
  return (
    <div className="w-full min-h-screen bg-[#f0f9f6] p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Hospital Departments</h1>
          <p className="text-gray-500 mt-1">Explore specialized medical wings, check staffing, and find extension coordinates.</p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS_DATA.map((dept, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-100 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 bg-teal-50/50 rounded-2xl flex items-center justify-center">
                    {dept.icon}
                  </div>
                  <h3 className="font-extrabold text-gray-800 text-base">{dept.name}</h3>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed font-medium">{dept.desc}</p>
              </div>

              <div className="flex justify-between items-center border-t border-gray-55/40 pt-4 mt-6 text-xs text-gray-400 font-bold uppercase tracking-wide">
                <span>{dept.doctors} Specialists</span>
                <span className="font-mono text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">Ext: {dept.ext}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Department;