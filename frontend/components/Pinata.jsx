import { useState } from "react";

import React from 'react'
import axios from 'axios';
import Button from "./Button";

function Pinata({contract}) {
  const [fileImg, setFileImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState();

  const handleImgChange = (e) => {
    setFileImg(e.target.files[0]);
  };

  if(fileImg) {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(fileImg);
  }
  
  const sendFileToIPFS = async (e) => {
    e.preventDefault()
    if (fileImg) {
        try {
            const formData = new FormData();
            formData.append("file", fileImg);

            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                    'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
                    'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
                    "Content-Type": "multipart/form-data"
                },
            });
            // contract
            const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
         console.log(ImgHash); 
        } catch (error) {
            console.log("Error sending File to IPFS: ")
            console.log(error)
        }
    }
}

  return (
    <form className="flex justify-center gap-6 h-[60vh] w-full mx-36 my-10" onSubmit = {sendFileToIPFS} > 

      <div className="flex-1 flex flex-col rounded-xl justify-center items-center bg-[#FAFFFE] border-2 border-[#7E9996] border-dashed max-h-full">
        
        {previewUrl ? 
        <div className="rounded-xl overflow-clip mb-2 max-h-[70%] max-w-[70%]">
          <img className="h-full" src={previewUrl} alt="Selected image" />
        </div>  :
        <div className="mx-20 mb-8 text-xl font-urbanist text-[#7E9996] text-center flex flex-col gap-5 justify-center items-center">
            <svg width="110" height="100" viewBox="0 0 110 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M93.5 27.5C93.5 34.4036 87.3439 40 79.75 40C72.1561 40 66 34.4036 66 27.5C66 20.5964 72.1561 15 79.75 15C87.3439 15 93.5 20.5964 93.5 27.5ZM88 27.5C88 31.6421 84.3064 35 79.75 35C75.1936 35 71.5 31.6421 71.5 27.5C71.5 23.3579 75.1936 20 79.75 20C84.3064 20 88 23.3579 88 27.5Z" fill="#7E9996"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 12.5C0 5.59644 6.15608 0 13.75 0H96.25C103.844 0 110 5.59644 110 12.5V87.5C110 94.4035 103.844 100 96.25 100H13.75C6.15609 100 0 94.4036 0 87.5V12.5ZM13.75 5C9.19365 5 5.5 8.35787 5.5 12.5V63.1064L30.7358 35.6368C32.8983 33.2829 36.8606 33.2373 39.088 35.5406L69.1384 66.6155L83.3918 56.9345C85.7561 55.3286 89.0932 55.7054 90.9535 57.7883L104.5 72.9552V12.5C104.5 8.35786 100.806 5 96.25 5H13.75ZM5.5 87.5V70.9066L34.9573 38.8419L65.0077 69.9168C66.9014 71.875 70.1326 72.1816 72.4303 70.621L86.6837 60.94L104.5 80.8874V87.5C104.5 91.6421 100.806 95 96.25 95H13.75C9.19365 95 5.5 91.6421 5.5 87.5Z" fill="#7E9996"/>
            </svg>

            <div>
            Drag and drop your product’s images here to start uploading (up to 5 images)
            </div>

        </div>           
        }
        <label className="cursor-pointer font-urbanist text-[14px] bg-[#7E9996] p-4 text-white flex items-center justify-center rounded-3xl" htmlFor="inputTag">
          Select Images
          <input className="hidden" accept="image/*" id="inputTag" type="file"  onChange = {handleImgChange} required/>   
        </label>
      </div>
      <div className="flex-1 font-urbanist flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label className="flex-1" htmlFor="productId">
                Product ID
              </label>
              <input className="flex-1 border-2 rounded-lg border-[#455579] px-2 py-2 text-black font-medium text-base" name="productId"  id="productId" type="text" />
            </div>
            
            <div className="flex flex-col">
              <label className="flex-1" htmlFor="name">
                Name
              </label>
              <input className="flex-1 border-2 rounded-lg border-[#455579] px-2 py-2 text-black font-medium text-base" name="name"  id="name" type="text" />
            </div>
            
            <div className="flex flex-col">
              <label className="flex-1" htmlFor="desc">
                Desc
              </label>
              <input className="flex-1 border-2 rounded-lg border-[#455579] px-2 py-2 text-black font-medium text-base" name="desc"  id="desc" type="text" />
            </div>
            
            <div className="flex flex-col">
              <label className="flex-1" htmlFor="price">
                Price
              </label>
              <input className="flex-1 border-2 rounded-lg border-[#455579] px-2 py-2 text-black font-medium text-base" name="price"  id="price" type="text" />
            </div>

            <div className="flex flex-col">
              <label className="flex-1" htmlFor="category">
                Category
              </label>
              <input className="flex-1 border-2 rounded-lg border-[#455579] px-2 py-2 text-black font-medium text-base" name="category"  id="category" type="text" />
            </div>
            
                
          </div>

          <Button  type='submit'> Create new Product </Button> 
      </div>

    </form>
  )
}

export default Pinata