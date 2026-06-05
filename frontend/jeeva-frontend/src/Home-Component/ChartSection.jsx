import React from 'react';
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

function ChartSection({ profile, predictions = [] }) {
  
  // 1. Process Donut Chart Data (Distribution of Prediction Risk Levels)
  let highCount = 0;
  let moderateCount = 0;
  let lowCount = 0;

  predictions.forEach(pred => {
    const resultText = (pred.result || "").toLowerCase();
    const predText = (pred.prediction || "").toLowerCase();
    
    if (resultText.includes("high") || resultText.includes("positive") || resultText.includes("malignant") || predText.includes("detected") || predText.includes("positive")) {
      highCount++;
    } else if (resultText.includes("moderate") || resultText.includes("medium")) {
      moderateCount++;
    } else {
      lowCount++;
    }
  });

  // Default values if no predictions
  if (predictions.length === 0) {
    highCount = 1;
    moderateCount = 2;
    lowCount = 5;
  }

  const pieData = [
    { name: "Urgent/High", value: highCount },
    { name: "Moderate", value: moderateCount },
    { name: "Low/Healthy", value: lowCount },
  ];

  const COLORS = ["#FF6B6B", "#FFD93D", "#6BCB77"];
  const totalReports = highCount + moderateCount + lowCount;
  const healthyPercent = totalReports > 0 ? Math.round(((lowCount + moderateCount) / totalReports) * 100) : 100;

  // 2. Process Line Chart Data (Health Risk Probability Trend Over Time)
  const lineData = predictions.length > 0 
    ? predictions.slice(-6).map((pred, idx) => {
        const dateStr = new Date(pred.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        // probability is decimal (0-1) or string percentage
        let probVal = parseFloat(pred.probability);
        if (isNaN(probVal)) probVal = 0.5;
        if (probVal > 1) probVal = probVal / 100; // convert percentage to decimal if needed

        return {
          name: dateStr,
          risk: Math.round(probVal * 100),
          label: pred.endpoint.replace('/predict/', '').toUpperCase()
        };
      })
    : [
        { name: "Baseline", risk: 30, label: "Heart" },
        { name: "May 10", risk: 45, label: "Diabetes" },
        { name: "May 20", risk: 25, label: "Parkinsons" },
        { name: "Jun 01", risk: 35, label: "Heart" },
      ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full overflow-x-hidden">

      {/* LEFT DONUT CHART */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm w-full overflow-hidden flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Risk Distribution</h2>
            <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md">
              {predictions.length} Total Analysis Run
            </span>
          </div>

          <div className="flex justify-center w-full overflow-hidden mt-6 relative h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-2xl font-extrabold text-gray-850">{healthyPercent}%</span>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Stable Ratio</p>
            </div>
          </div>
        </div>

        <div className="flex justify-around text-xs mt-6 border-t border-gray-50 pt-4">
          <span className="flex items-center gap-1.5 font-semibold text-gray-650">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]"></div> Urgent/High ({highCount})
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-gray-650">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFD93D]"></div> Moderate ({moderateCount})
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-gray-650">
            <div className="w-2.5 h-2.5 rounded-full bg-[#6BCB77]"></div> Low/Healthy ({lowCount})
          </span>
        </div>
      </div>

      {/* RIGHT LINE CHART */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm w-full overflow-hidden flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Risk Probability Trend (%)</h2>

          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} tickLine={false} />
              <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line type="monotone" dataKey="risk" stroke="#10b981" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 border border-gray-50 bg-gray-50/30 rounded-2xl p-4">
          <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wide">Last Diagnosis</h3>
          {predictions.length > 0 ? (
            <div>
              <p className="text-xl font-extrabold text-teal-600 mt-1">
                {predictions[predictions.length - 1].prediction}
              </p>
              <p className="text-xs text-gray-550 mt-0.5">
                Model: {predictions[predictions.length - 1].endpoint.replace('/predict/', '').toUpperCase()} • {predictions[predictions.length - 1].result}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-base font-bold text-gray-500 mt-1">No AI screening reports yet.</p>
              <p className="text-xs text-gray-400 mt-0.5">Run screening checks on the Jeeva AI tab to view trends.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChartSection;