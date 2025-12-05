// src/pages/PredictionPage.jsx
import React, { useState } from "react";
import { predict } from "../api/predict";
import { ArrowPathIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

/**
 * props:
 * - title (string)
 * - featureCount (number)
 * - endpoint (string) e.g. "/predict/diabetes"
 * - featureLabels (optional array of labels for inputs)
 */
const PredictionPage = ({ title, featureCount, endpoint, featureLabels = [] }) => {
  const [features, setFeatures] = useState(Array(featureCount).fill(""));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // {prediction, result}
  const [error, setError] = useState(null);

  const setFeatureAt = (idx, val) => {
    const copy = [...features];
    copy[idx] = val;
    setFeatures(copy);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError(null);
    setResult(null);

    // simple validation
    for (let i = 0; i < features.length; i++) {
      if (features[i] === "" || features[i] === null) {
        setError(`Please fill input #${i + 1}`);
        return;
      }
      if (isNaN(Number(features[i]))) {
        setError(`Input #${i + 1} must be a number`);
        return;
      }
    }

    setLoading(true);
    const parsed = features.map((f) => Number(f));
    const res = await predict(endpoint, parsed);
    setLoading(false);

    if (!res.ok) {
      setError(res.error);
      return;
    }

    setResult(res.data);
  };

  const reset = () => {
    setFeatures(Array(featureCount).fill(""));
    setResult(null);
    setError(null);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#00ADB5]">{title}</h1>
        <p className="text-gray-400 mt-2">Enter {featureCount} numerical features and click Predict.</p>
      </div>

      <div className="bg-[#151515] p-6 rounded-2xl shadow-lg border border-[#222]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((val, i) => (
              <div key={i} className="flex flex-col">
                <label className="text-sm text-gray-300 mb-1">
                  {featureLabels[i] ? featureLabels[i] : `Feature ${i + 1}`}
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={val}
                  onChange={(e) => setFeatureAt(i, e.target.value)}
                  className="bg-[#0f1720] border border-[#2b2b2b] rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                  placeholder={featureLabels[i] ? `Enter ${featureLabels[i]}` : `Value ${i + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-[#00ADB5] to-[#00b3c2] text-black font-semibold shadow hover:scale-[1.01] transition"
            >
              {loading ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : "Predict"}
            </button>

            <button
              type="button"
              onClick={reset}
              className="px-4 py-2 rounded-lg border border-[#2b2b2b] text-gray-200 hover:bg-[#111] transition"
            >
              Reset
            </button>

            <div className="ml-auto text-sm text-gray-400">Model endpoint: <span className="text-gray-200">{endpoint}</span></div>
          </div>

          {error && (
            <div className="mt-3 p-3 rounded-md bg-red-900/20 border border-red-700 text-red-100 flex items-center gap-2">
              <ExclamationCircleIcon className="w-5 h-5 text-red-400" />
              <div>{error}</div>
            </div>
          )}

          {result && (
            <div className="mt-4 p-4 rounded-md bg-green-900/10 border border-green-700 text-green-100">
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-400" />
                <div>
                  <div className="font-semibold">Prediction: {result.prediction}</div>
                  <div className="opacity-80 mt-1">{result.result}</div>
                  {result?.probability && <div className="text-sm opacity-60 mt-1">Confidence: {result.probability}</div>}
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PredictionPage;
