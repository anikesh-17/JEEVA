import React, { useState } from "react";
import { FaRegCreditCard, FaCheckCircle, FaSpinner, FaHistory, FaFileInvoiceDollar, FaReceipt, FaLink } from "react-icons/fa";

const INVOICES = [
  { id: "INV-8902", service: "Cardiology consultation (Dr. Ramesh Sharma)", amount: "$50.00", dueDate: "2026-06-15", status: "Unpaid" },
  { id: "INV-8741", service: "Diabetes Screening Lab Test", amount: "$120.00", dueDate: "2026-06-20", status: "Unpaid" }
];

const INITIAL_PAID = [
  { id: "INV-7210", service: "General Check-up & Consultation", amount: "$40.00", paidDate: "2026-05-10", txHash: "0x39a1c8f1e687b1c3c5b7f9a8654cdeef129aa45b8cf7429188e4010a30b0ee1f" },
  { id: "INV-6981", service: "Voice Biomarker Analysis Test", amount: "$80.00", paidDate: "2026-04-28", txHash: "0x78f2d5c6b9e8a7d65c4b3a210f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a210f" }
];

function Payment() {
  const [invoices, setInvoices] = useState(INVOICES);
  const [transactions, setTransactions] = useState(INITIAL_PAID);
  
  // Checkout Modal State
  const [activeInvoice, setActiveInvoice] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  const [minedTxHash, setMinedTxHash] = useState("");
  
  // Tabs
  const [tab, setTab] = useState("pending");

  // Credit card form inputs
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayClick = (invoice) => {
    setActiveInvoice(invoice);
    setPaySuccess(false);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate payment processing and mining block receipt
    setTimeout(() => {
      setSubmitting(false);
      setPaySuccess(true);
      
      const newTxHash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
      setMinedTxHash(newTxHash);

      // Move invoice to paid
      setInvoices(prev => prev.filter(inv => inv.id !== activeInvoice.id));
      setTransactions(prev => [
        {
          id: activeInvoice.id,
          service: activeInvoice.service,
          amount: activeInvoice.amount,
          paidDate: new Date().toISOString().split("T")[0],
          txHash: newTxHash
        },
        ...prev
      ]);
    }, 2500);
  };

  return (
    <div className="w-full min-h-screen bg-[#f0f9f6] p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Payments & Billing</h1>
          <p className="text-gray-500 mt-1">Manage bills, handle payments, and review secure blockchain receipts.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setTab("pending")}
            className={`pb-3 text-sm font-bold transition flex items-center gap-2 px-1 ${
              tab === "pending"
                ? "text-teal-600 border-b-2 border-teal-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <FaFileInvoiceDollar /> Pending Invoices
          </button>
          <button
            onClick={() => setTab("history")}
            className={`pb-3 text-sm font-bold transition flex items-center gap-2 px-1 ${
              tab === "history"
                ? "text-teal-600 border-b-2 border-teal-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <FaHistory /> Transaction History
          </button>
        </div>

        {/* TAB 1: PENDING INVOICES */}
        {tab === "pending" && (
          <div className="bg-white rounded-3xl border border-gray-150 shadow-sm overflow-hidden p-6">
            <div className="space-y-4">
              {invoices.length > 0 ? (
                invoices.map((inv) => (
                  <div key={inv.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 border border-gray-100 rounded-2xl bg-gray-50/50 hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="mb-4 md:mb-0">
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{inv.id}</span>
                      <h3 className="font-bold text-gray-800 text-base mt-1">{inv.service}</h3>
                      <p className="text-xs text-gray-400 mt-1">Due Date: <span className="font-semibold">{inv.dueDate}</span></p>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                      <div className="text-lg font-extrabold text-gray-800">{inv.amount}</div>
                      <button
                        onClick={() => handlePayClick(inv)}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md shadow-teal-150 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                      >
                        <FaRegCreditCard /> Pay Now
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-gray-400 italic">
                  <FaCheckCircle className="mx-auto text-emerald-500 mb-3" size={40} />
                  All bills cleared! No pending invoices.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: TRANSACTION HISTORY */}
        {tab === "history" && (
          <div className="bg-white rounded-3xl border border-gray-150 shadow-sm p-6">
            <div className="space-y-4 divide-y divide-gray-100">
              {transactions.map((tx, idx) => (
                <div key={tx.id} className="flex flex-col md:flex-row md:items-center justify-between pt-4 first:pt-0">
                  <div className="mb-3 md:mb-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{tx.id}</span>
                      <span className="px-2 py-0.5 text-[9px] bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 rounded">PAID</span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm mt-1">{tx.service}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-gray-400 mt-2">
                      <span>Paid On: <span className="font-semibold">{tx.paidDate}</span></span>
                      <span className="flex items-center gap-1 font-mono bg-gray-50 border border-gray-100 rounded-md px-2 py-0.5 text-[10px] break-all select-all">
                        <FaLink className="text-teal-600" /> Tx: {tx.txHash.substring(0, 16)}...
                      </span>
                    </div>
                  </div>

                  <div className="text-base font-extrabold text-teal-600">{tx.amount}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHECKOUT MODAL OVERLAY */}
        {activeInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden animate-zoomIn border border-gray-100">
              <div className="h-1.5 w-full bg-gradient-to-r from-teal-400 to-emerald-400"></div>

              {/* SUCCESS PANEL */}
              {paySuccess ? (
                <div className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <FaCheckCircle size={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Payment Verified!</h3>
                    <p className="text-gray-500 mt-1 text-sm">Receipt block mined successfully onto our simulated ledger.</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl text-left border border-gray-100 space-y-2.5">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Invoice</span>
                      <span className="font-bold text-gray-700">{activeInvoice.id}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Service</span>
                      <span className="font-bold text-gray-700 truncate max-w-[200px]">{activeInvoice.service}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Amount</span>
                      <span className="font-extrabold text-emerald-600">{activeInvoice.amount}</span>
                    </div>
                    <div className="border-t border-gray-200/50 pt-2.5 flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Blockchain Receipt Hash</span>
                      <span className="font-mono text-[9px] break-all bg-white border border-gray-100 p-1.5 rounded-md text-teal-600 select-all leading-normal">
                        {minedTxHash}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveInvoice(null)}
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl transition shadow-md shadow-teal-200"
                  >
                    Done
                  </button>
                </div>
              ) : (
                /* CHECKOUT FORM */
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                      <FaReceipt className="text-teal-600 text-sm" /> Secure Checkout
                    </h3>
                    <button
                      onClick={() => setActiveInvoice(null)}
                      className="text-gray-400 hover:text-gray-600 text-sm font-bold"
                    >
                      Close
                    </button>
                  </div>

                  <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 mb-6">
                    <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest block mb-1">Paying For</span>
                    <h4 className="font-bold text-gray-800 text-sm">{activeInvoice.service}</h4>
                    <span className="text-lg font-extrabold text-teal-700 mt-2 block">{activeInvoice.amount}</span>
                  </div>

                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition"
                        value={cardNum}
                        onChange={(e) => setCardNum(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength="5"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">CVV</label>
                        <input
                          type="password"
                          placeholder="***"
                          maxLength="3"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 mt-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-md shadow-teal-200 hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <FaSpinner className="animate-spin" /> Mining Receipt block...
                        </>
                      ) : (
                        "Authorize Payment"
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Payment;