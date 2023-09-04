import React from 'react'
import Button from './Button'

function LeftPane() {
  return (
    <div className='flex flex-col gap-8 justify-center font-urbanist items-start h-full'>
        <div className='font-black text-[34px] leading-[110%] tracking-[-0.045em] text-[#455579]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <span className='text-[#D45D75]'>Phasellus ut!!</span></div>
        <div className='text-[#455579] leading-[150%] tracking-[0.075rem] text-[18px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id lorem laoreet, hendrerit lorem a, interdum leo. Nullam tempor velit non ornare accumsan. Vivamus viverra est et neque mattis commodo et ac ipsum. Nunc tincidunt eros nec congue semper. Nunc risus justo, dictum et erat ut, accumsan tempus mauris. Etiam pellentesque feugiat nibh quis sollicitudin. Pellentesque diam arcu, egestas sit amet est et, tincidunt suscipit tortor. Praesent hendrerit ipsum nec neque gravida tincidunt.</div>
        <div className='flex gap-5'>
            <Button pink>Become an Owner</Button>
            <Button>Become an Renter</Button>
        </div>
    </div>
  )
}

export default LeftPane