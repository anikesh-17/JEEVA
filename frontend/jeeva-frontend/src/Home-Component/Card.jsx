import React from 'react'

function Card({val}) {
  return (
    <div className='w-[24%] bg-white mt-5 ml-2 rounded-lg p-2'>
      <h1 className='flex items-center gap-2 text-sm font-semibold'>{val.icon}{val.name}</h1>
      <div className='flex gap-5 mt-4'>
        <h1 className='text-2xl'>{val.number}</h1>
<button className="px-2  text-black border border-blue-300 rounded-full text-xs">
  Available
</button>
      </div>
      <p className='mt-5 text-sm'>{val.description}</p>
    </div>
    
  )
}

export default Card