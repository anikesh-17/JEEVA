import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaStar, FaStethoscope, FaCalendarCheck, FaSearch } from "react-icons/fa";

const DOCTORS = [
  { id: 1, name: "Dr. Ramesh Sharma", specialty: "Cardiology", experience: "15 years", rating: 4.9, reviews: 124, availability: "Mon - Fri, 10:00 AM - 4:00 PM", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: 2, name: "Dr. Priya Gupta", specialty: "Neurology", experience: "12 years", rating: 4.8, reviews: 98, availability: "Tue - Thu, 11:30 AM - 5:00 PM", image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: 3, name: "Dr. Amit Roy", specialty: "Oncology", experience: "18 years", rating: 4.9, reviews: 156, availability: "Mon, Wed, Fri, 9:00 AM - 1:00 PM", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: 4, name: "Dr. Anjali Mehta", specialty: "Pediatrics", experience: "8 years", rating: 4.7, reviews: 82, availability: "Mon - Sat, 2:00 PM - 7:00 PM", image: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: 5, name: "Dr. Vikram Malhotra", specialty: "General Medicine", experience: "10 years", rating: 4.6, reviews: 110, availability: "Daily, 8:00 AM - 8:00 PM", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: 6, name: "Dr. Shalini Singh", specialty: "Cardiology", experience: "14 years", rating: 4.8, reviews: 89, availability: "Thu - Sat, 10:00 AM - 3:00 PM", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200" }
];

const SPECIALTIES = ["All", "Cardiology", "Neurology", "Oncology", "Pediatrics", "General Medicine"];

function Doctor() {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesSpecialty = selectedSpecialty === "All" || doc.specialty === selectedSpecialty;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  const handleBook = (doctorName, specialty) => {
    // Navigate to appointment and pass doctor/dept pre-filled
    navigate("/appointment", { state: { doctorName, department: specialty } });
  };

  return (
    <div className="w-full min-h-screen bg-[#f0f9f6] p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Our Specialists</h1>
            <p className="text-gray-500 mt-1">Consult with our world-class medical experts and book sessions instantly.</p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors..."
              className="w-full bg-white border border-gray-150 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-teal-500 shadow-sm transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {SPECIALTIES.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                selectedSpecialty === spec
                  ? "bg-teal-600 text-white shadow-md shadow-teal-200"
                  : "bg-white text-gray-600 border border-gray-100 hover:bg-teal-50 hover:text-teal-600"
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-100 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo & Badge */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-50 shadow-inner"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200"; // fallback
                      }}
                    />
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg hover:text-teal-700 transition">{doc.name}</h3>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md mt-1 uppercase tracking-wider">
                        <FaStethoscope /> {doc.specialty}
                      </span>
                    </div>
                  </div>

                  {/* Rating / Experience */}
                  <div className="flex items-center justify-between border-t border-b border-gray-50 py-3 mb-4">
                    <div className="flex items-center gap-1.5">
                      <FaStar className="text-yellow-500" />
                      <span className="font-bold text-gray-800">{doc.rating}</span>
                      <span className="text-gray-400 text-xs">({doc.reviews} reviews)</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-500">
                      Exp: <span className="text-gray-800">{doc.experience}</span>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="space-y-1 mb-6">
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Availability</span>
                    <span className="block text-sm text-gray-600 font-medium">{doc.availability}</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleBook(doc.name, doc.specialty)}
                  className="w-full py-3 bg-[#e5fdf2] hover:bg-teal-600 text-teal-700 hover:text-white font-bold rounded-2xl shadow-sm transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaCalendarCheck /> Book Appointment
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <FaUserMd className="mx-auto text-gray-300 mb-3" size={48} />
              <p className="text-gray-400 italic font-medium">No doctors found matching your query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Doctor;