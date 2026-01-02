import React, { useState } from 'react';
import {
    FaUserInjured, FaPhoneAlt, FaNotesMedical, FaPills,
    FaFileMedical, FaCalendarCheck, FaFileInvoiceDollar,
    FaSyringe, FaHeartbeat, FaWeight, FaRulerVertical,
    FaAllergies
} from 'react-icons/fa';
import { MdBloodtype, MdMonitorHeart } from 'react-icons/md';
import { BsThermometerHalf, BsDropletFill } from 'react-icons/bs';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuthState, logout } from '../Utils/Config';
import logo from "../assets/Images/final_logo.png";
import { CgProfile } from "react-icons/cg";
import { GoTriangleDown } from "react-icons/go";

const PatientProfile = () => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [showProfileCard, setShowProfileCard] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuthState();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    // --- MOCK DATA ---
    const patient = {
        name: user?.displayName || "Guest User",
        id: "PAT-2024-8592",
        age: 32,
        gender: "Male",
        bloodGroup: "O+",
        contact: "+91 1234567890",
        email: user?.email || "guest@jeeva.ai",
        avatar: "https://via.placeholder.com/150", // Replace with real avatar or icon
        allergies: ["Penicillin", "Peanuts"],
        vitals: {
            bp: "120/80",
            heartRate: "72 bpm",
            spO2: "98%",
            temp: "98.6°F",
            weight: "75 kg",
            height: "178 cm",
            bmi: "23.7"
        },
        history: [
            { year: "2023", condition: "Appendectomy", type: "Surgery", status: "Resolved" },
            { year: "2021", condition: "Mild Asthma", type: "Chronic", status: "Ongoing" },
            { year: "2019", condition: "Viral Fever", type: "Acute", status: "Recovered" },
        ],
        medications: [
            { name: "Amoxicillin", dose: "500mg", freq: "Twice Daily", status: "Active" },
            { name: "Paracetamol", dose: "650mg", freq: "SOS", status: "Active" },
        ],
        appointments: [
            { date: "12 Oct 2024", doctor: "Dr. Sharma", dept: "Cardiology", type: "Follow-up", time: "10:00 AM" },
            { date: "05 Nov 2024", doctor: "Dr. Gupta", dept: "General", type: "Check-up", time: "11:30 AM" },
        ]
    };

    const tabs = [
        { name: 'Overview', icon: <FaUserInjured /> },
        { name: 'Medical History', icon: <FaNotesMedical /> },
        { name: 'Medications', icon: <FaPills /> },
        { name: 'Lab Reports', icon: <FaFileMedical /> },
        { name: 'Appointments', icon: <FaCalendarCheck /> },
        { name: 'Billing', icon: <FaFileInvoiceDollar /> },
    ];

    return (
        <>
            {/* Top Section - Sticky Header */}
            <div className="w-full h-14 flex justify-between relative items-center sticky top-0 z-50 bg-[#dffdef]">

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




            <div className="w-full min-h-screen bg-[#f0f9f6] text-gray-800 font-sans">

                {/* --- STICKY HEADER --- */}
                <div className="sticky top-14 z-40 bg-white border-b border-gray-100 p-4 flex justify-between items-center transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/home')}
                            className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                        >
                            <IoArrowBack size={24} />
                        </button>

                        <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-2xl font-bold border-2 border-teal-50 shadow-sm">
                            {/* Initials */}
                            {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>

                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{patient.name}</h1>
                            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-100 font-medium">{patient.id}</span>
                                <span className="flex items-center gap-1"><FaUserInjured size={12} /> {patient.age} Y • {patient.gender}</span>
                                <span className="flex items-center gap-1 text-red-500 font-semibold"><MdBloodtype /> {patient.bloodGroup}</span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-col items-end text-right">
                        <div className="flex items-center gap-2 text-gray-600 font-medium">
                            <FaPhoneAlt className="text-teal-500" size={14} /> {patient.contact}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">Last Visit: 2 Days ago</div>
                    </div>
                </div>


                {/* --- MAIN LAYOUT --- */}
                <div className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* LEFT SIDEBAR (TABS) */}
                    <div className="md:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-44">
                            <div className="p-4 bg-gray-50 border-b border-gray-100 font-semibold text-gray-500 text-sm tracking-wide">
                                MENU
                            </div>
                            <div className="flex flex-col">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.name}
                                        onClick={() => setActiveTab(tab.name)}
                                        className={`flex items-center gap-3 px-5 py-4 text-sm font-medium transition-colors border-l-4 
                    ${activeTab === tab.name
                                                ? 'bg-teal-50 text-teal-700 border-teal-500'
                                                : 'text-gray-600 hover:bg-gray-50 border-transparent hover:text-teal-600'
                                            }`}
                                    >
                                        <span className="text-lg">{tab.icon}</span>
                                        {tab.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* RIGHT CONTENT AREA */}
                    <div className="md:col-span-9 space-y-6">

                        {/* DYNAMIC CONTENT BASED ON TAB */}
                        {activeTab === 'Overview' && (
                            <div className="space-y-6 animate-fadeIn">

                                {/* Allergies Alert */}
                                {patient.allergies.length > 0 && (
                                    <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl flex items-start gap-3 shadow-sm">
                                        <FaAllergies className="mt-1 text-red-500" size={20} />
                                        <div>
                                            <h3 className="font-bold">Medical Alert: Allergies Detected</h3>
                                            <p className="text-sm mt-1 text-red-600">Patient is allergic to: <span className="font-semibold">{patient.allergies.join(", ")}</span></p>
                                        </div>
                                    </div>
                                )}

                                {/* Vitals Grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <VitalCard title="Blood Pressure" value={patient.vitals.bp} unit="mmHg" icon={<FaHeartbeat />} color="text-rose-500" bg="bg-rose-50" />
                                    <VitalCard title="Heart Rate" value={patient.vitals.heartRate} unit="" icon={<MdMonitorHeart />} color="text-blue-500" bg="bg-blue-50" />
                                    <VitalCard title="SpO2" value={patient.vitals.spO2} unit="" icon={<BsDropletFill />} color="text-teal-500" bg="bg-teal-50" />
                                    <VitalCard title="Temperature" value={patient.vitals.temp} unit="" icon={<BsThermometerHalf />} color="text-orange-500" bg="bg-orange-50" />
                                </div>

                                {/* BMI & Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                                        <div className="p-3 bg-gray-100 rounded-full text-gray-600"><FaWeight size={24} /></div>
                                        <div><p className="text-sm text-gray-500">Weight</p><p className="text-xl font-bold text-gray-800">{patient.vitals.weight}</p></div>
                                    </div>
                                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                                        <div className="p-3 bg-gray-100 rounded-full text-gray-600"><FaRulerVertical size={24} /></div>
                                        <div><p className="text-sm text-gray-500">Height</p><p className="text-xl font-bold text-gray-800">{patient.vitals.height}</p></div>
                                    </div>
                                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                                        <div className="p-3 bg-indigo-50 rounded-full text-indigo-600"><span className="text-xl font-bold">BMI</span></div>
                                        <div><p className="text-sm text-gray-500">Body Mass Index</p><p className="text-xl font-bold text-gray-800">{patient.vitals.bmi}</p></div>
                                    </div>
                                </div>

                            </div>
                        )}

                        {activeTab === 'Medical History' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fadeIn">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Medical History</h3>
                                <div className="space-y-4">
                                    {patient.history.map((item, idx) => (
                                        <div key={idx} className="flex gap-4 items-start">
                                            <div className="w-16 text-right font-bold text-gray-500 pt-1">{item.year}</div>
                                            <div className="relative pt-2 pl-4 border-l-2 border-teal-200">
                                                <div className="absolute -left-[9px] top-2 w-4 h-4 bg-white border-4 border-teal-500 rounded-full"></div>
                                                <h4 className="font-bold text-gray-800">{item.condition}</h4>
                                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full mt-1 inline-block">{item.type}</span>
                                                <p className="text-sm text-gray-500 mt-1">Status: {item.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'Medications' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fadeIn">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><FaPills className="text-teal-500" /> Active Medications</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50 text-sm text-gray-500 font-semibold border-b">
                                                <th className="p-3">Medication</th>
                                                <th className="p-3">Dosage</th>
                                                <th className="p-3">Frequency</th>
                                                <th className="p-3">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {patient.medications.map((med, idx) => (
                                                <tr key={idx} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                                                    <td className="p-3 font-medium text-gray-800">{med.name}</td>
                                                    <td className="p-3 text-gray-600">{med.dose}</td>
                                                    <td className="p-3 text-gray-600">{med.freq}</td>
                                                    <td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">● {med.status}</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Appointments' && (
                            <div className="grid grid-cols-1 gap-4 animate-fadeIn">
                                {patient.appointments.map((apt, idx) => (
                                    <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                                                {apt.date.split(' ')[0]}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800">{apt.doctor}</h4>
                                                <p className="text-sm text-gray-500">{apt.dept} • {apt.type}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold text-gray-700">{apt.date}</div>
                                            <div className="text-sm text-teal-600 font-medium">{apt.time}</div>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-3 bg-teal-50 text-teal-700 font-semibold rounded-xl border border-dashed border-teal-300 hover:bg-teal-100 transition-colors">
                                    + Schedule New Appointment
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
};

// --- SUB_COMPONENTS ---
const VitalCard = ({ title, value, unit, icon, color, bg }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:translate-y-[-2px] transition-transform">
        <div className={`w-10 h-10 ${bg} ${color} rounded-full flex items-center justify-center text-xl`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <div className="flex items-end gap-1">
                <span className="text-2xl font-bold text-gray-800">{value}</span>
                <span className="text-xs text-gray-400 mb-1">{unit}</span>
            </div>
        </div>
    </div>
);

export default PatientProfile;
