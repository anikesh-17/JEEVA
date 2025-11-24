import React from 'react'

function PatientTable() {

      const patients = [
    {
      name: "Sabrina Carpenter",
      age: 42,
      gender: "Female",
      id: "0701",
      date: "2025-01-07",
      diagnose: "Bruised Rib",
      status: "Urgent",
      color: "bg-red-500",
    },
    {
      name: "Kim Renee",
      age: 25,
      gender: "Female",
      id: "1215",
      date: "2025-01-12",
      diagnose: "Throat Infection",
      status: "Moderate",
      color: "bg-yellow-500",
    },
    {
      name: "George Vanessa",
      age: 38,
      gender: "Male",
      id: "1704",
      date: "2025-01-17",
      diagnose: "Fractured Leg",
      status: "Low",
      color: "bg-blue-500",
    },
  ];

  return (
          <div className="bg-white rounded-xl p-6 shadow mt-6 w-full overflow-x-hidden px-4 md:px-6">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Patients</h2>

        <div className="flex gap-3">
          <button className="px-4 py-1 bg-blue-100 text-blue-600 rounded-md">Today</button>
          <button className="px-4 py-1 bg-gray-100 rounded-md">Last Week</button>
        </div>
      </div>

      <table className="w-full table-fixed">
        <thead>
  <tr className="text-gray-600 border-b">
    <th className="p-3 w-[40px] text-left">
      <input type="checkbox" />
    </th>
    <th className="p-3 text-left">Name</th>
    <th className="p-3 text-left">ID Number</th>
    <th className="p-3 text-left">Date</th>
    <th className="p-3 text-left">Diagnose</th>
    <th className="p-3 text-left">Status</th>
  </tr>
</thead>

        <tbody>
          {patients.map((p, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition">

              <td className="p-3">
                <input type="checkbox" />
              </td>

              <td className="p-3">
                <div className="font-semibold">{p.name}</div>
                <div className="text-gray-500 text-sm">
                  {p.age} yrs • {p.gender}
                </div>
              </td>

              <td className="p-3 font-medium">{p.id}</td>

              <td className="p-3 text-gray-600">{p.date}</td>

              <td className="p-3 text-gray-700">{p.diagnose}</td>

              <td className="p-3">
                <span className={`px-3 py-1 text-white rounded-full ${p.color}`}>
                  {p.status}
                </span>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default PatientTable