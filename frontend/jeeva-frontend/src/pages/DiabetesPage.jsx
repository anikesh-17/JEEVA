// src/pages/DiabetesPage.jsx
import React from "react";
import PredictionPage from "./PredictionPage";

const DiabetesPage = () => {
  // optionally add real labels if you want
  const labels = [
    "Pregnancies","Glucose","BloodPressure","SkinThickness",
    "Insulin","BMI","DiabetesPedigreeFunction","Age"
  ];
  return <PredictionPage title="Diabetes Prediction" featureCount={8} endpoint="/predict/diabetes" featureLabels={labels} />;
};

export default DiabetesPage;
