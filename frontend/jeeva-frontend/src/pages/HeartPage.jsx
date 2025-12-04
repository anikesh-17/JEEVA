// src/pages/HeartPage.jsx
import React from "react";
import PredictionPage from "./PredictionPage";

const HeartPage = () => {
  const labels = [
    "age","sex","cp","trestbps","chol","fbs","restecg","thalach","exang","oldpeak","slope","ca","thal"
  ];
  return <PredictionPage title="Heart Disease Prediction" featureCount={13} endpoint="/predict/heart" featureLabels={labels} />;
};

export default HeartPage;
