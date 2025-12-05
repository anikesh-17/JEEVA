// src/pages/ParkinsonPage.jsx
import React from "react";
import PredictionPage from "./PredictionPage";

const ParkinsonPage = () => {
  // If you have specific labels you can list them here. Using numeric labels is fine too.
  const labels = Array.from({ length: 22 }, (_, i) => `Feature ${i + 1}`);
  return <PredictionPage title="Parkinson's Disease Prediction" featureCount={22} endpoint="/predict/parkinsons" featureLabels={labels} />;
};

export default ParkinsonPage;
