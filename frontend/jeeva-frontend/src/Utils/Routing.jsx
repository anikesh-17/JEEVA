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
import JeevaAi from '../Component/JeevaAi'
import Payment from '../Component/Payment'
import Settings from '../Component/Settings'
import Help from '../Component/Help'
import Layout from '../Component/Layout'

function Routing() {
  return (
    <div>
    <Routes>
        <Route path='/' element= {<Home />}/>
        <Route path='/inbox' element= {<Inbox/>}/>
        <Route path='/doctor' element= {<Doctor/>}/>
        <Route path='/patient' element= {<Patient/>}/>
        <Route path='/departments' element= {<Department/>}/>
        <Route path='/schedule' element= {<Schedule/>}/>
        <Route path='/appointment' element= {<Appointment/>}/>
        <Route path='/report' element= {<Report/>}/>
        <Route path='/human-resources' element= {<Human_Resource/>}/>
        <Route path='/jeevaAi' element= {<JeevaAi/>}/>
        <Route path='/payment' element= {<Payment/>}/>
        <Route path='/settings' element= {<Settings/>}/>
        <Route path='/help' element= {<Help/>}/>
    </Routes>
    </div>
  )
}

export default Routing