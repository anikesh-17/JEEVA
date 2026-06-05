import React, { useState } from "react";
import { FaQuestionCircle, FaEnvelope, FaChevronDown, FaPaperPlane, FaCheckCircle, FaSpinner } from "react-icons/fa";

const FAQS = [
  {
    q: "How does the Medical AI diagnosis work?",
    a: "Our system takes clinical markers (e.g. Glucose, Blood Pressure, Voice patterns) and processes them through trained machine learning models (Support Vector Machines, Random Forests) to estimate risk probabilities for specific conditions like Diabetes, Heart Disease, Breast Cancer, and Parkinson's."
  },
  {
    q: "What is the role of blockchain in Jeeva?",
    a: "Blockchain provides an immutable cryptographic audit trail of all medical screening reports. When a prediction is saved, a SHA-256 block containing the report metadata is mined onto our distributed ledger. This ensures that records cannot be altered or tampered with by unauthorized parties."
  },
  {
    q: "How do I verify a medical record?",
    a: "Go to your dashboard or report history. Next to each record is a 'Verify Blockchain' button. Clicking it will query the blockchain ledger by the record's transaction hash to confirm if the clinical details match the mined record block, showing the index, timestamp, and mining nonce."
  },
  {
    q: "Are my medical records safe?",
    a: "Yes! Jeeva is designed around user isolation. All communication uses Firebase Authentication with JSON Web Tokens (JWT) verified on our Express backend. Only the authenticated owner can access their medical history and prediction reports."
  }
];

function Help() {
  const [openFaq, setOpenFaq] = useState(null);
  
  // Support Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);

    // Simulate contact form submission
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#f0f9f6] p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Help & Support</h1>
          <p className="text-gray-500 mt-1">Access answers to common inquiries or send questions directly to our support desk.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* FAQ Accordion */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaQuestionCircle className="text-teal-600" /> Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 flex items-center justify-between text-left font-semibold text-gray-800 hover:bg-teal-50/20 transition-colors"
                    >
                      <span className="text-sm md:text-base">{faq.q}</span>
                      <FaChevronDown
                        className={`text-gray-400 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-teal-600" : "rotate-0"
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3 bg-gray-50/30 animate-slideDown">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* SUPPORT TICKET FORM */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-150 shadow-sm relative overflow-hidden h-fit">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-teal-500"></div>
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaEnvelope className="text-teal-600 text-sm" /> Contact Desk
            </h2>

            {success && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-150 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <FaCheckCircle className="text-emerald-600" /> Message submitted! We'll reply shortly.
              </div>
            )}

            <form onSubmit={handleSupportSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-teal-500 focus:bg-white transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-teal-500 focus:bg-white transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Message</label>
                <textarea
                  placeholder="How can we assist you?"
                  rows="4"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-teal-500 focus:bg-white transition resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md shadow-teal-200 hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
              >
                {submitting ? (
                  <>
                    <FaSpinner className="animate-spin" /> Dispatching...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Help;