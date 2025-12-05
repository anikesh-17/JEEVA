import React from "react";
import { useNavigate } from "react-router-dom";

const JeevaAI = () => {
  const navigate = useNavigate();

  const models = [
    { name: "Diabetes Prediction", route: "/jeeva-ai/diabetes" },
    { name: "Heart Disease Prediction", route: "/jeeva-ai/heart" },
    { name: "Breast Cancer Prediction", route: "/jeeva-ai/breast" },
    { name: "Parkinson’s Disease Prediction", route: "/jeeva-ai/parkinson" },
  ];

  return (
    <div className="w-full min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-[#00ADB5]">
        JEEVA AI – Prediction Models
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {models.map((m, idx) => (
          <div
            key={idx}
            className="p-8 bg-[#222831] text-white rounded-xl shadow-xl 
                       hover:scale-105 transition cursor-pointer border border-[#00ADB5]"
            onClick={() => navigate(m.route)}
          >
            <h2 className="text-2xl font-semibold mb-3">{m.name}</h2>
            <p className="opacity-70">
              Click to start prediction using Machine Learning.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JeevaAI;
