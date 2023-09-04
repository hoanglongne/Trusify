import React from 'react'
import pinitaImage from '../assets/pinata.png'

function RightPane() {
  return (
    <div className='flex flex-col justify-center items-center h-full gap-4 pl-32'>
        <div className='mt-16 w-full h-[70%] border-2 border-[#B9D3D0] rounded-3xl overflow-hidden'>
            <img className='object-contain h-full w-full p-10' src={pinitaImage} alt="" />
        </div>
        <div className='flex gap-5 justify-center items-center w-full flex-1 border-b-2 border-white'>
            <div className='h-full flex-1 border-[#B9D3D0] rounded-3xl border-2'></div>
            <div className='h-full flex-1 border-[#B9D3D0] rounded-3xl border-2'></div>
            <div className='h-full flex-1 border-[#B9D3D0] rounded-3xl border-2'></div>
            <div className='h-full flex-1 border-[#B9D3D0] rounded-3xl border-2'></div>
        </div>
    </div>
  )
}

export default RightPane