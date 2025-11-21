import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ChartSection() {
    const pieData = [
    { name: "Urgent", value: 35 },
    { name: "Moderate", value: 25 },
    { name: "Low", value: 15 },
  ];

  const COLORS = ["#FF6B6B", "#FFD93D", "#6BCB77"];

  // Line Chart Data
  const lineData = [
    { day: "01-07", new: 30, discharge: 20 },
    { day: "08-12", new: 45, discharge: 32 },
    { day: "13-17", new: 55, discharge: 40 },
    { day: "18-21", new: 40, discharge: 50 },
  ];
  
  return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* LEFT DONUT CHART BOX */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Report</h2>
          <button className="bg-gray-100 px-3 py-1 rounded-md">Add Report</button>
        </div>

        <div className="flex justify-center">
          <ResponsiveContainer width="70%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={75}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Center Percentage Text */}
        <div className="text-center -mt-32 text-2xl font-bold">
          75%
        </div>
        <p className="text-center text-gray-500 mb-4 ">Total Done</p>

        {/* Legends */}
        <div className="flex justify-around text-sm mt-4">
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF6B6B]"></div> Urgent
          </span>
          <span className="flex items-center gap-2 -ml-3">
            <div className="w-3 h-3 rounded-full bg-[#FFD93D]"></div> Moderate
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#6BCB77]"></div> Low
          </span>
        </div>
      </div>

      {/* RIGHT LINE CHART BOX */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Patients Overview</h2>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={lineData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="discharge" stroke="#4D96FF" strokeWidth={3} />
            <Line type="monotone" dataKey="new" stroke="#6BCB77" strokeDasharray="5 5" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>

        {/* Small Card Inside Chart Box */}
        <div className="mt-4 border rounded-lg p-3 shadow-sm">
          <h3 className="font-semibold text-gray-700">Patients</h3>
          <p className="text-2xl font-bold">50 <span className="text-green-600 text-sm">Discharged</span></p>
          <p className="text-sm text-gray-500">10 Executive Room • 20 Premium Room • 16 Appointment • 4 Emergency</p>
        </div>
      </div>
    </div>
  );
}

export default ChartSection