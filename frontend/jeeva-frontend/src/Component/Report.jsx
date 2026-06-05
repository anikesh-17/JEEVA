import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchUserPredictions } from "../api/user";
import { auth, useAuthState } from "../Utils/Config";
import { useNavigate } from "react-router-dom";
import { FaFilePdf, FaCube, FaLink, FaCheckCircle, FaSpinner, FaFileInvoice, FaEye, FaArrowDown, FaExclamationTriangle, FaTimes } from "react-icons/fa";

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

function Report() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuthState();
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Verification states
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationData, setVerificationData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        loadReports();
      } else {
        navigate("/login");
      }
    }
  }, [user, authLoading]);

  const loadReports = async () => {
    setLoading(true);
    const res = await fetchUserPredictions();
    setLoading(false);
    if (res.ok && res.data?.predictions) {
      setPredictions(res.data.predictions);
    }
  };

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

  const downloadReportPDF = (pred) => {
    alert(`Downloading PDF Clinical Report for ${pred.endpoint.replace('/predict/', '').toUpperCase()} analysis (${pred.prediction})...`);
  };

  return (
    <div className="w-full min-h-screen bg-[#f0f9f6] p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Clinical Reports</h1>
          <p className="text-gray-500 mt-1">Review diagnostic results, download PDF sheets, and verify block receipts.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-teal-600" size={40} />
          </div>
        ) : (
          <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-teal-500"></div>

            <div className="space-y-4 divide-y divide-gray-100 max-h-[600px] overflow-y-auto pr-2">
              {predictions.length > 0 ? (
                predictions.slice().reverse().map((pred) => (
                  <div key={pred._id} className="flex flex-col md:flex-row md:items-center justify-between pt-4 first:pt-0 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded uppercase tracking-wider">
                          {pred.endpoint.replace("/predict/", "")}
                        </span>
                        <span className="text-xs text-gray-400 font-semibold">
                          {new Date(pred.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-gray-800 text-base">{pred.prediction}</h3>
                      <p className="text-xs text-gray-500">Result: <span className="font-bold text-gray-700">{pred.result}</span> {pred.probability && `| Confidence: ${Math.round(parseFloat(pred.probability)*100)}%`}</p>
                    </div>

                    <div className="flex items-center gap-3 border-t md:border-t-0 pt-3 md:pt-0">
                      <button
                        onClick={() => downloadReportPDF(pred)}
                        className="px-3.5 py-2 text-xs font-bold bg-gray-50 hover:bg-gray-100 text-gray-650 hover:text-gray-800 border border-gray-100 rounded-xl transition flex items-center gap-1.5"
                        title="Download PDF Report"
                      >
                        <FaFilePdf className="text-red-500" /> PDF <FaArrowDown size={10} />
                      </button>

                      <button
                        onClick={() => handleVerify(pred)}
                        className="px-3.5 py-2 text-xs font-bold bg-[#e5fdf2] hover:bg-teal-600 text-teal-700 hover:text-white rounded-xl transition flex items-center gap-1.5"
                      >
                        <FaCube /> Verify Block
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-gray-400 italic">
                  <FaFileInvoice className="mx-auto text-gray-200 mb-3" size={40} />
                  No diagnosis records found. Run screening checks in the Jeeva AI tab.
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* BLOCKCHAIN AUDIT MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative overflow-hidden border border-gray-100">
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
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                    <FaCheckCircle className="text-emerald-500 shrink-0" size={28} />
                    <div>
                      <h4 className="font-extrabold text-emerald-800 text-sm">Block Hash Integrity Verified</h4>
                      <p className="text-emerald-600 text-xs">Cryptographic link matches database entries perfectly.</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-3 font-mono text-[11px] text-gray-650">
                    <div className="flex justify-between border-b border-gray-200/50 pb-2">
                      <span className="font-bold text-gray-400 uppercase tracking-wide">Status</span>
                      <span className="text-emerald-600 font-extrabold">VALID BLOCK</span>
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

                    <div className="flex justify-between">
                      <span className="font-bold text-gray-400 uppercase tracking-wide">Mined Timestamp</span>
                      <span className="text-gray-700 font-semibold">
                        {new Date(verificationData.timestamp).toLocaleString()}
                      </span>
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

export default Report;