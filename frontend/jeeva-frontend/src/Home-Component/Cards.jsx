import React from 'react';
import Card from './Card';
import { FaHeartbeat, FaThermometerHalf, FaWeight } from "react-icons/fa";
import { MdOutlineBloodtype } from "react-icons/md";

function Cards({ profile }) {
  const vitals = profile?.vitals || {};
  
  const comp = [
    {
      name: "Heart Rate",
      number: vitals.heartRate || "72 bpm",
      description: "Recorded heart beats per minute",
      icon: <FaHeartbeat className="text-rose-500" size={20} />
    },
    {
      name: "Blood Pressure",
      number: vitals.bp || "120/80",
      description: "Systolic / Diastolic pressure",
      icon: <MdOutlineBloodtype className="text-red-500" size={20} />
    },
    {
      name: "Body Mass Index (BMI)",
      number: vitals.bmi || "23.7",
      description: `Weight: ${vitals.weight || "75 kg"} | Height: ${vitals.height || "178 cm"}`,
      icon: <FaWeight className="text-teal-500" size={20} />
    }
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
      {comp.map((elem, index) => (
        <Card key={index} val={elem} />
      ))}
    </div>
  );
}

export default Cards;