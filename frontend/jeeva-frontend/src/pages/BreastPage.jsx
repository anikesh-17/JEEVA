// src/pages/BreastPage.jsx
import React from "react";
import PredictionPage from "./PredictionPage";

// if you want full 30 labels copy from dataset; here we keep generic names
const generateLabels = () => {
  const base = [
    "mean radius","mean texture","mean perimeter","mean area","mean smoothness",
    "mean compactness","mean concavity","mean concave points","mean symmetry","mean fractal dimension",
    "radius error","texture error","perimeter error","area error","smoothness error",
    "compactness error","concavity error","concave points error","symmetry error","fractal dimension error",
    "worst radius","worst texture","worst perimeter","worst area","worst smoothness",
    "worst compactness","worst concavity","worst concave points","worst symmetry","worst fractal dimension"
  ];
  return base;
};

const BreastPage = () => {
  return <PredictionPage title="Breast Cancer Prediction" featureCount={30} endpoint="/predict/breast" featureLabels={generateLabels()} />;
};

export default BreastPage;
