import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Routing from "./Utils/Routing";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  // 👇 hide navbar ONLY on login page
  const hideNavbar = location.pathname === "/login";

  return (
    <div className="w-full h-screen flex overflow-hidden">

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
