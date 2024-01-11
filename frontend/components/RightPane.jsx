import React, { useState } from 'react'
import pinitaImage from '../assets/pinata.png'
import beachImage from '../assets/camera.png'
import longImage from '../assets/iphone.png'
import sunshineImage from '../assets/headphone.png'

function RightPane() {
  const [selectedProduct, setSelectedProduct] = useState(pinitaImage);

  const products = [pinitaImage, beachImage, longImage, sunshineImage];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  }

  return (
    <div className='flex flex-col justify-center items-center h-full gap-4 pl-0 md:pl-10 lg:pl-24'>
        <div className='mt-16 md:mt-0 w-full h-full border-2 border-[#B9D3D0] rounded-3xl overflow-hidden'>
            <div className='h-[45vh] flex justify-center items-center'>
                <img className='object-contain h-2/3 w-2/3' src={selectedProduct} alt="" />
            </div>
        </div>
        <div className='flex gap-5 justify-center items-center w-full h-24 border-b-2 border-white'>
            {products.map((product, index) => (
                <div key={index} className='h-full flex justify-center items-center w-full border-[#B9D3D0] rounded-3xl border-2' onClick={() => handleProductClick(product)}>
                    <img className='object-contain h-2/3 w-2/3' src={product} alt="" />
                </div>
            ))}
        </div>
    </div>
  )
}

export default RightPane