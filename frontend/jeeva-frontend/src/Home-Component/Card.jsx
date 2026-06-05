import React from 'react';

function Card({ val }) {
  return (
    <div className='bg-white p-5 rounded-2xl border border-gray-100 shadow-sm font-sora flex flex-col justify-between hover:shadow-md transition-shadow duration-300 w-full'>
      <div>
        <div className='flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider'>
          {val.icon}
          <span>{val.name}</span>
        </div>
        <h2 className='text-2xl font-extrabold text-gray-800 mt-3 tracking-tight'>{val.number}</h2>
      </div>
      <p className='mt-4 text-xs text-gray-400 font-medium leading-relaxed'>{val.description}</p>
    </div>
  );
}

export default Card;