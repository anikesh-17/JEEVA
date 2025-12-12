import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Component/Home'
import Inbox from '../Component/Inbox'
import Doctor from '../Component/Doctor'
import Patient from '../Component/Patient'
import Department from '../Component/Department'
import Schedule from '../Component/Schedule'
import Appointment from '../Component/Appointment'
import Report from '../Component/Report'
import Human_Resource from '../Component/Human_Resource'
import Payment from '../Component/Payment'
import Settings from '../Component/Settings'
import Help from '../Component/Help'
import JeevaAI from "../pages/JeevaAI";
import DiabetesPage from "../pages/DiabetesPage";
import HeartPage from "../pages/HeartPage";
import BreastPage from "../pages/BreastPage";
import ParkinsonPage from "../pages/ParkinsonPage";
import Profile_Card from '../Home-Component/Profile_Card'


function Routing() {
  return (
    <div>
    <Routes>
        <Route path='/' element= {<Home />}>
         <Route path='/home/profile' element= {<Profile_Card/>}/>
        </Route>
        <Route path='/inbox' element= {<Inbox/>}/>
        <Route path='/doctor' element= {<Doctor/>}/>
        <Route path='/patient' element= {<Patient/>}/>
        <Route path='/departments' element= {<Department/>}/>
        <Route path='/schedule' element= {<Schedule/>}/>
        <Route path='/appointment' element= {<Appointment/>}/>
        <Route path='/report' element= {<Report/>}/>
        <Route path='/human-resources' element= {<Human_Resource/>}/>
        <Route path='/payment' element= {<Payment/>}/>
        <Route path='/settings' element= {<Settings/>}/>
        <Route path='/help' element= {<Help/>}/>
        <Route path="/jeeva-ai" element={<JeevaAI />} />
        <Route path="/jeeva-ai/diabetes" element={<DiabetesPage />} />
        <Route path="/jeeva-ai/heart" element={<HeartPage />} />
        <Route path="/jeeva-ai/breast" element={<BreastPage />} />
        <Route path="/jeeva-ai/parkinson" element={<ParkinsonPage />} />
       
        
    </Routes>
    </div>
  )
}

export default Routing