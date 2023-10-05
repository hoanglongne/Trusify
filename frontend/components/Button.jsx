import React from 'react'

function Button({pink, children}) {
  return (
    <div>
        {pink ? <button class="px-6 py-3 text-base rounded-[13px] border-[1px] bg-[#D45D75] text-white hover:bg-white hover:border-[#D45D75] hover:text-[#D45D75] duration-300">{children}</button> : <button className='px-6 py-3 rounded-[13px] border-[1px] border-[#D45D75] text-[#D45D75] hover:bg-[#D45D75] hover:text-white duration-300'>{children}</button>}
    </div>
  )
}

export default Button