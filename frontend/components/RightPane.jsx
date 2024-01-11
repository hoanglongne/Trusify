import React, { useState } from 'react'
import pinitaImage from '../assets/pinata.png'
import beachImage from '../assets/beach.png'
import longImage from '../assets/long.webp'
import sunshineImage from '../assets/sunshine.png'

function RightPane() {
  const [selectedProduct, setSelectedProduct] = useState(pinitaImage);

  const products = [pinitaImage, beachImage, longImage, sunshineImage];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  }

  return (
    <div className='flex flex-col justify-center items-center h-full gap-4 pl-0 md:pl-10 lg:pl-32'>
        <div className='mt-16 md:mt-0 w-full h-full border-2 border-[#B9D3D0] rounded-3xl overflow-hidden'>
            <div className='h-[40vh] relative'>
                <img className='absolute top-0 left-0 object-contain h-full w-full' src={selectedProduct} alt="" />
            </div>
        </div>
        <div className='flex gap-5 justify-center items-center w-full h-24 border-b-2 border-white'>
            {products.map((product, index) => (
                <div key={index} className='h-full w-24 border-[#B9D3D0] rounded-3xl border-2 relative' onClick={() => handleProductClick(product)}>
                    <img className='absolute top-0 left-0 object-cover h-full w-full' src={product} alt="" />
                </div>
            ))}
        </div>
    </div>
  )
}

export default RightPane