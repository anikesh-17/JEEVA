import React, { useState } from "react";
import { FaUserMd, FaPaperPlane, FaSearch, FaCheckDouble } from "react-icons/fa";

const INITIAL_THREADS = [
  {
    id: 1,
    doctor: "Dr. Ramesh Sharma",
    dept: "Cardiology",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150&h=150",
    lastMsg: "Please keep track of your daily heart rate and report any sudden spikes.",
    time: "10:30 AM",
    unread: true,
    messages: [
      { sender: "doctor", text: "Hello! I reviewed your cardiovascular risk results.", time: "10:25 AM" },
      { sender: "doctor", text: "Please keep track of your daily heart rate and report any sudden spikes.", time: "10:30 AM" }
    ]
  },
  {
    id: 2,
    doctor: "Dr. Priya Gupta",
    dept: "Neurology",
    avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=150&h=150",
    lastMsg: "Let's schedule a brief voice analysis review next week.",
    time: "Yesterday",
    unread: false,
    messages: [
      { sender: "user", text: "Hello Doctor, I updated my voice biomarkers on the AI screening page.", time: "4:15 PM" },
      { sender: "doctor", text: "Great! Let's schedule a brief voice analysis review next week.", time: "4:30 PM" }
    ]
  }
];

function Inbox() {
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [activeThreadId, setActiveThreadId] = useState(1);
  const [typedMessage, setTypedMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const activeThread = threads.find(t => t.id === activeThreadId);

  const handleSend = (e) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const newMsg = {
      sender: "user",
      text: typedMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setThreads(prev => prev.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          lastMsg: newMsg.text,
          time: newMsg.time,
          unread: false,
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    }));

    setTypedMessage("");

    // Mock an automatic doctor reply after 2 seconds
    setTimeout(() => {
      const replyMsg = {
        sender: "doctor",
        text: `Got your message! I'll review this shortly. Let me know if you experience any worsening vitals.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setThreads(prev => prev.map(t => {
        if (t.id === activeThreadId) {
          return {
            ...t,
            lastMsg: replyMsg.text,
            time: replyMsg.time,
            messages: [...t.messages, replyMsg]
          };
        }
        return t;
      }));
    }, 2000);
  };

  const filteredThreads = threads.filter(t => 
    t.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.dept.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-screen bg-[#f0f9f6] flex font-sans overflow-hidden">
      
      {/* THREADS SIDEBAR */}
      <div className="w-80 bg-white border-r border-gray-150 flex flex-col h-full shrink-0">
        
        {/* Search */}
        <div className="p-4 border-b border-gray-50 flex flex-col gap-3">
          <h1 className="text-xl font-bold text-gray-800">Messages</h1>
          <div className="relative">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search consultations..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {filteredThreads.map(t => {
            const isActive = t.id === activeThreadId;
            return (
              <div
                key={t.id}
                onClick={() => {
                  setActiveThreadId(t.id);
                  setThreads(prev => prev.map(item => item.id === t.id ? { ...item, unread: false } : item));
                }}
                className={`p-4 flex gap-3 cursor-pointer transition-colors ${
                  isActive ? "bg-teal-50/40" : "hover:bg-gray-50/30"
                }`}
              >
                <img src={t.avatar} alt={t.doctor} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-gray-850 text-xs truncate">{t.doctor}</h4>
                    <span className="text-[10px] text-gray-400 font-semibold">{t.time}</span>
                  </div>
                  <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded uppercase mt-1 inline-block">
                    {t.dept}
                  </span>
                  <p className={`text-xs mt-1.5 truncate ${t.unread ? "font-bold text-gray-900" : "text-gray-500"}`}>
                    {t.lastMsg}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CHAT VIEWPORT */}
      <div className="flex-1 flex flex-col h-full bg-[#f8fcfb]">
        
        {activeThread ? (
          <>
            {/* Active Header */}
            <div className="h-16 bg-white border-b border-gray-150 px-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <img src={activeThread.avatar} alt={activeThread.doctor} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">{activeThread.doctor}</h3>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{activeThread.dept} Specialist</span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeThread.messages.map((m, idx) => {
                const isUser = m.sender === "user";
                return (
                  <div key={idx} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] rounded-2xl p-4 shadow-sm text-sm ${
                      isUser
                        ? "bg-teal-600 text-white rounded-tr-none"
                        : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                    }`}>
                      <p className="leading-relaxed">{m.text}</p>
                      <div className="flex justify-end items-center gap-1.5 mt-2">
                        <span className={`text-[9px] font-medium ${isUser ? "text-teal-200" : "text-gray-400"}`}>
                          {m.time}
                        </span>
                        {isUser && <FaCheckDouble className="text-teal-200" size={10} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-150 flex gap-3 shrink-0">
              <input
                type="text"
                placeholder="Type your reply here..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-teal-500"
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-5 py-3 transition flex items-center justify-center shadow-md shadow-teal-200"
              >
                <FaPaperPlane size={14} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-2">
            <FaUserMd className="text-gray-300" size={48} />
            <p className="text-gray-450 italic">Select a conversation thread to begin messaging.</p>
          </div>
        )}

      </div>

    </div>
  );
}

export default Inbox;