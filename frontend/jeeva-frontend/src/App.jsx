import React, { useState } from "react";
import Navbar from "./Component/Navbar";
import Routing from "./Utils/Routing";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full h-screen flex overflow-hidden">

      {/* LEFT SIDEBAR */}
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* RIGHT CONTENT */}
      <div
        className={`
          min-h-screen transition-all duration-300 w-full
          ${isOpen ? "ml-[220px]" : "ml-[70px]"}
          overflow-y-auto no-scrollbar
        `}
      >
        <Routing />
      </div>

    </div>
  );
};

export default App;