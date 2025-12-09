// src/App.jsx
import React, { useEffect } from "react";
import Navbar from "./Component/Navbar";
import Routing from "./Utils/Routing";
import LocomotiveScroll from "locomotive-scroll";
import Login from "./pages/Login";
// adjust path if your Config.js is at src/Config.js instead of src/Utils/Config.js
import { useAuthState } from "./Utils/Config";

const App = () => {
  const { user, loading } = useAuthState();

  useEffect(() => {
    const scrollEl = document.querySelector("[data-scroll-container]") || document.documentElement;
    const loco = new LocomotiveScroll({ el: scrollEl, smooth: true });
    return () => loco.destroy();
  }, []);

  if (loading) return <div className="text-white p-8">Checking auth...</div>;
  if (!user) return <Login />; // <-- one line that forces login page when unauthenticated

  return (
    <div className="w-full min-h-screen overflow-x-hidden flex" data-scroll-container>
      <div className="left-0 top-0 w-[20px]"><Navbar /></div>
      <div className="ml-[220px] w-full min-h-screen p-4"><Routing /></div>
    </div>
  );
};

export default App;
