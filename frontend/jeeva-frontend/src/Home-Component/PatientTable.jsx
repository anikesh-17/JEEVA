import React, { useState } from "react";
import axios from "axios";
import { auth } from "../Utils/Config";
import { FaCube, FaLink, FaCheckCircle, FaExclamationTriangle, FaSpinner, FaTimes } from "react-icons/fa";

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

function PatientTable({ predictions = [] }) {
  // Modal states
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [verificationData, setVerificationData] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);

  const handleVerify = async (pred) => {
    setSelectedRecord(pred);
    setVerifying(true);
    setVerificationData(null);
    setError(null);

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("User not authenticated.");

      const token = await currentUser.getIdToken();
      const res = await axios.get(`${BASE}/api/user/predictions/${pred._id}/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data?.success) {
        setVerificationData(res.data);
      } else {
        setError("Verification failed.");
      }
    } catch (err) {
      setError(err?.response?.data?.error || err.message || "Failed to contact blockchain ledger.");
    } finally {
      setVerifying(false);
    }
  };

  const getRiskColor = (result = "") => {
    const text = result.toLowerCase();
    if (text.includes("high") || text.includes("positive") || text.includes("malignant") || text.includes("detected")) {
      return "bg-red-50 text-red-700 border-red-100";
    }
    if (text.includes("moderate") || text.includes("medium")) {
      return "bg-yellow-50 text-yellow-750 border-yellow-100";
    }
    return "bg-emerald-50 text-emerald-700 border-emerald-100";
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-sm mt-6 w-full overflow-hidden px-4 md:px-6">
      
      <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800">My AI Prediction Reports & Blockchain Ledger</h2>
          <p className="text-xs text-gray-400 mt-1">Audit log of all diagnoses submitted to the immutable blockchain ledger.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm table-auto border-collapse">
          <thead>
            <tr className="text-gray-400 font-bold border-b border-gray-100 text-xs uppercase tracking-wider">
              <th className="py-3 px-2">Analysis Type</th>
              <th className="py-3 px-2">Date Created</th>
              <th className="py-3 px-2">Prediction</th>
              <th className="py-3 px-2">Detail Summary</th>
              <th className="py-3 px-2">Blockchain Receipt</th>
              <th className="py-3 px-2 text-center">Ledger Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-55 font-medium">
            {predictions.length > 0 ? (
              predictions.slice().reverse().map((pred) => (
                <tr key={pred._id} className="hover:bg-gray-50/50 transition">
                  <td className="py-4 px-2 font-bold text-gray-800 uppercase tracking-wide text-xs">
                    {pred.endpoint.replace("/predict/", "")}
                  </td>
                  <td className="py-4 px-2 text-gray-500 text-xs">
                    {new Date(pred.createdAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
                  </td>
                  <td className="py-4 px-2">
                    <span className="text-gray-800 font-extrabold">{pred.prediction}</span>
                  </td>
                  <td className="py-4 px-2">
                    <span className={`px-2.5 py-1 text-xs font-bold border rounded-lg ${getRiskColor(pred.result)}`}>
                      {pred.result || "Low Risk"}
                    </span>
                  </td>
                  <td className="py-4 px-2 font-mono text-[10px] text-gray-400">
                    {pred.blockchainHash ? (
                      <span className="flex items-center gap-1">
                        <FaLink className="text-teal-600" /> {pred.blockchainHash.substring(0, 10)}...
                      </span>
                    ) : (
                      "Unsigned"
                    )}
                  </td>
                  <td className="py-4 px-2 text-center">
                    <button
                      onClick={() => handleVerify(pred)}
                      className="px-4 py-2 text-xs font-bold bg-[#e5fdf2] hover:bg-teal-600 text-teal-700 hover:text-white rounded-xl transition-all duration-300 shadow-sm flex items-center gap-1.5 mx-auto"
                    >
                      <FaCube /> Verify Block
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-400 italic">
                  No predictions run yet. Run checks on the Jeeva AI tab to populate this ledger.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* BLOCKCHAIN AUDIT MODAL OVERLAY */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative overflow-hidden animate-zoomIn border border-gray-100">
            <div className="h-1.5 w-full bg-gradient-to-r from-teal-400 to-emerald-400"></div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                  <FaCube className="text-teal-600" /> Blockchain Block Audit
                </h3>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              {verifying ? (
                <div className="py-12 flex flex-col items-center justify-center gap-4">
                  <FaSpinner className="animate-spin text-teal-600" size={40} />
                  <p className="text-sm font-semibold text-gray-500">Querying peer nodes & verifying block hash...</p>
                </div>
              ) : error ? (
                <div className="py-6 text-center space-y-4">
                  <FaExclamationTriangle className="text-rose-500 mx-auto" size={40} />
                  <div>
                    <h4 className="font-bold text-gray-800 text-base">Verification Error</h4>
                    <p className="text-sm text-gray-500 mt-1">{error}</p>
                  </div>
                </div>
              ) : verificationData ? (
                <div className="space-y-6">
                  {/* Ledger Header Badge */}
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                    <FaCheckCircle className="text-emerald-500 shrink-0" size={28} />
                    <div>
                      <h4 className="font-extrabold text-emerald-800 text-sm">Block Hash Integrity Verified</h4>
                      <p className="text-emerald-600 text-xs">Cryptographic link matches database entries perfectly.</p>
                    </div>
                  </div>

                  {/* Ledger Properties Grid */}
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-3 font-mono text-[11px] text-gray-650">
                    <div className="flex justify-between border-b border-gray-200/50 pb-2">
                      <span className="font-bold text-gray-400 uppercase tracking-wide">Status</span>
                      <span className="text-emerald-600 font-extrabold">VALID BLOCK</span>
                    </div>
                    
                    <div className="flex justify-between border-b border-gray-200/50 pb-2">
                      <span className="font-bold text-gray-400 uppercase tracking-wide">Record ID</span>
                      <span className="text-gray-700 font-semibold">{verificationData.predictionId}</span>
                    </div>

                    <div className="flex flex-col gap-1 border-b border-gray-200/50 pb-2">
                      <span className="font-bold text-gray-400 uppercase tracking-wide">Block Hash</span>
                      <span className="text-teal-600 font-bold break-all bg-white border border-gray-100 p-1.5 rounded-md">
                        {verificationData.hash}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 border-b border-gray-200/50 pb-2">
                      <span className="font-bold text-gray-400 uppercase tracking-wide">Transaction Receipt</span>
                      <span className="text-teal-600 font-bold break-all bg-white border border-gray-100 p-1.5 rounded-md">
                        {verificationData.transactionHash}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-gray-200/50 pb-2">
                      <span className="font-bold text-gray-400 uppercase tracking-wide">Mined Timestamp</span>
                      <span className="text-gray-700 font-semibold">
                        {new Date(verificationData.timestamp).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-400 uppercase tracking-wide">Validation Checked</span>
                      <span className="text-gray-750 font-bold">SUCCESS</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedRecord(null)}
                    className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl transition shadow-md shadow-teal-200"
                  >
                    Close Ledger
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default PatientTable;