import React from 'react'
import Card from '../Home-Component/Card'
import Cards from '../Home-Component/Cards'
import ChartSection from '../Home-Component/ChartSection'
import PatientTable from '../Home-Component/PatientTable'

function Home() {
  return (
       <div className="w-full min-h-screen bg-sky-100 p-4 overflow-x-hidden">

      {/* TOP BAR (Dashboard + Search) */}
      <div className="flex items-center justify-between bg-white p-3 rounded-md mb-4 shadow-sm">
        <h1 className="text-xl font-semibold">Dashboard</h1>

        {/* Right Side Search Bar */}
        <input 
          type="text" 
          placeholder="Search..." 
          className="px-3 py-2 w-[250px] bg-gray-100 border border-gray-300 rounded-md outline-none focus:border-blue-500"
        />
      </div>
      <Cards />
      <div className="mt-2">
        <ChartSection />
      </div>

      {/* Table */}
      <div className="mt-2">
        <PatientTable />
      </div>

    </div>

  )
}

export default Home