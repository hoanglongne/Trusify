import React from 'react'
import {Link} from 'react-router-dom'

function NavItems() {
  return (
    <div>
        <ul className='flex gap-8 text-md font-urbanist font-semibold duration-300'>
            <li><Link className='hover:text-[#7E9996] duration-300' to="/">Products</Link></li>
            <li><Link className='hover:text-[#7E9996] duration-300' to="/">Shops</Link></li>
            <li><Link className='hover:text-[#7E9996] duration-300' to="/">Catergories</Link></li>
            <li><Link className='hover:text-[#7E9996] duration-300' to="/">Become an Owner</Link></li>
        </ul>
    </div>
  )
}

export default NavItems