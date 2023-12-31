import React from 'react'
import Navbar from './Navbar'
function Layout({children, wallet}) {
  return (
  <div className='abc relative'>
      <Navbar wallet={wallet} />
      {children}
  </div>
  )
}

export default Layout