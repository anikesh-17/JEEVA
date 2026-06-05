import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Routing from "./Utils/Routing";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // 👇 hide navbar ONLY on login page
  const hideNavbar = location.pathname === "/login";

  return (
    <div className="w-full h-screen flex overflow-hidden bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* LEFT SIDEBAR */}
      {!hideNavbar && (
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      )}

      {/* RIGHT CONTENT */}
      <div
        className={`
          min-h-screen transition-all duration-300 w-full
          ${!hideNavbar ? (isOpen ? "ml-[220px]" : "ml-[70px]") : "ml-0"}
          overflow-y-auto no-scrollbar
        `}
      >
        <Routing />
      </div>

    </div>
  );
};

export default App;
