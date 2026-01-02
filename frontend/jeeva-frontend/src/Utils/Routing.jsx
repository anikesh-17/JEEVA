import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Component/Home";
import Inbox from "../Component/Inbox";
import Doctor from "../Component/Doctor";
import Patient from "../Component/Patient";
import Department from "../Component/Department";
import Schedule from "../Component/Schedule";
import Appointment from "../Component/Appointment";
import Report from "../Component/Report";
import Human_Resource from "../Component/Human_Resource";
import Payment from "../Component/Payment";
import Settings from "../Component/Settings";
import Help from "../Component/Help";
import Profile_Card from "../Home-Component/Profile_Card";

import Login from "../pages/Login";
import JeevaAI from "../pages/JeevaAI";
import DiabetesPage from "../pages/DiabetesPage";
import HeartPage from "../pages/HeartPage";
import BreastPage from "../pages/BreastPage";
import ParkinsonPage from "../pages/ParkinsonPage";

import PatientProfile from "../pages/PatientProfile";

function Routing() {
  return (
    <Routes>
      {/* Default → Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Protected Home Layout */}
      <Route path="/home" element={<Home />}>
        {/* If you want profile to appear INSIDE the Home layout (width sidebar etc), keep it nested.
            However, the design requested a full-page feel or potentially a different layout. 
            If the user wants a standalone profile page, we might want to move it out or use an 'index' route or similar.
            Based on the request "redirect me into this page", replacing the nested Profile_Card with PatientProfile.
        */}
        {/* Note: The user asked for /home/profile to redirect to this new page. 
             If Home.jsx renders an Outlet, this will render INSIDE Home. 
             If Home.jsx DOES NOT render an Outlet, this nested route won't show.
             Checking Home.jsx... it has routing children? No, Home.jsx doesn't seem to have an <Outlet />. 
             Wait, looking at Home.jsx content again... it does NOT have <Outlet />. 
             The previous routing had `Route path="/home" element={<Home />}> ... </Route>`.
             If Home.jsx doesn't have <Outlet/>, nested routes won't verify.
             
             CORRECTION: I see existing code `Route path="profile" element={<Profile_Card />} />`. 
             This implies Home MIGHT need to change or I should make this a sibling route if Home isn't a layout.
             
             Let's check Home.jsx content again. 
             Home.jsx returns `<div>...</div>`. It exports `Home`.
             It does NOT seem to have an `<Outlet />`.
             
             So, `Route path="/home/profile"` should probably be a separate route IF `Home` is just a dashboard page and not a layout.
             But `Routing.jsx` had it nested. This is suspicious. 
             
             Let's look at `App.jsx`. 
             App.jsx has `<Routing />` inside "RIGHT CONTENT".
             
             If `Home` is the Dashboard, then `/home` renders Home.
             If we want `/home/profile` to render `PatientProfile`, we should probably make it a sibling if Home isn't a wrapper.
        */}
      </Route>

      {/* 
         Change Plan: 
         Make /home/profile a sibling of /home or a child if we add Outlet. 
         Given Home.jsx seems specific to the "Dashboard" view (charts, cards), 
         it's better to separate Profile.
      */}
      <Route path="/home" element={<Home />} />
      <Route path="/home/profile" element={<PatientProfile />} />

      {/* Other pages */}
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/doctor" element={<Doctor />} />
      <Route path="/patient" element={<Patient />} />
      <Route path="/departments" element={<Department />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/report" element={<Report />} />
      <Route path="/human-resources" element={<Human_Resource />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/help" element={<Help />} />

      {/* AI */}
      <Route path="/jeeva-ai" element={<JeevaAI />} />
      <Route path="/jeeva-ai/diabetes" element={<DiabetesPage />} />
      <Route path="/jeeva-ai/heart" element={<HeartPage />} />
      <Route path="/jeeva-ai/breast" element={<BreastPage />} />
      <Route path="/jeeva-ai/parkinson" element={<ParkinsonPage />} />
    </Routes>
  );
}

export default Routing;
