import React from 'react'
import { Link } from 'react-router-dom'

function AddProductButton() {

  return (
    <Link to="/create-product">
        <div className='w-[80px] h-[80px] cursor-pointer fixed flex z-10 items-center justify-center right-0 bottom-0 m-20 bg-pink-500 text-white rounded-full'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2V22M22 12L2 12" stroke="white" stroke-width="4" stroke-linecap="round"/>
            </svg>
        </div>
    </Link>
  )
}

export default AddProductButton