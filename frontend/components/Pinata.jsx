import React from 'react'
import axios from 'axios';
import Button from "./Button";
import { signal } from "@preact/signals-react";
import { v4 as uuidv4 } from 'uuid';

const fileImg = signal(null)
const previewUrl = signal()
const productId = signal(null)
const price = signal(0)
const productName = signal("")
const desc = signal("")
const category = signal("")


function Pinata({contract, navigate}) {

  if (!productId.value) {
    const generatedUuid = uuidv4();
    productId.value = generatedUuid;
  }

  const handleChange = (e) => {
    switch (e.target.name) {
      case "price":
        price.value = parseFloat(e.target.value); // Handle price as a number
        break;
      case "productName":
        productName.value = e.target.value;
        break;
      case "desc":
        desc.value = e.target.value;
        break;
      case "category":
        category.value = e.target.value;
        break;
    }
  };
  

  const handleRedirect = () => {
    navigate('/');
  };

  const handleImgChange = (e) => {
    fileImg.value = e.target.files[0];
  };

  if(fileImg.value) {
    const reader = new FileReader();
    reader.onload = () => {
      previewUrl.value = reader.result;
    };
    reader.readAsDataURL(fileImg.value);
  }
  
  const sendFileToIPFS = async (e) => {
    e.preventDefault()

    if (fileImg.value) {
      try {
        const formData = new FormData();
        formData.append("file", fileImg.value);
        
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
        const ImgHash = `https://maroon-odd-mole-2.mypinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        const img_arr = [ImgHash]
        const timelimit = 2
        contract.addNewProduct(productId.value, parseInt(price.value), productName.value, desc.value, category.value, img_arr, timelimit )
        navigate('/')
      } catch (error) {
            console.log("Error sending File to IPFS: ")
            console.log(error)
        }
    }
}

  return (
    <form className="flex justify-center gap-6 h-[60vh] w-full mx-36 my-10" onSubmit = {sendFileToIPFS} > 

      <div className="flex-1 flex flex-col rounded-xl justify-center items-center bg-[#FAFFFE] border-2 border-[#7E9996] border-dashed max-h-full">
        
        {previewUrl.value ? 
        <div className="rounded-xl overflow-clip mb-2 max-h-[70%] max-w-[70%]">
          <img className="h-full" src={previewUrl.value} alt="Selected image" />
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
          <input className="hidden" accept="image/*" id="inputTag" type="file" name="selectImage"  onChange = {handleImgChange} required/>   
        </label>
      </div>
      <div className="flex-1 font-urbanist flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label className="flex-1" htmlFor="productId">
                Product ID (Automatically generated)
              </label>
              <input onChange={handleChange} value={productId.value} disabled className="flex-1 border-2 rounded-lg border-[#455579] px-2 py-2 text-black font-medium text-base focus:outline-[#7E9996]" name="productId"  id="productId" type="text" />
            </div>
            
            <div className="flex flex-col">
              <label className="flex-1" htmlFor="name">
                Name
              </label>
              <input onChange={handleChange} value={productName.value} className="flex-1 border-2 rounded-lg border-[#455579] px-2 py-2 text-black font-medium text-base focus:outline-[#7E9996]" name="productName"  id="productName" type="text" />
            </div>
            
            <div className="flex flex-col">
              <label className="flex-1" htmlFor="desc">
                Desc
              </label>
              <input onChange={handleChange} value={desc.value} className="flex-1 border-2 rounded-lg border-[#455579] px-2 py-2 text-black font-medium text-base focus:outline-[#7E9996]" name="desc"  id="desc" type="text" />
            </div>
            
            <div className="flex flex-col">
              <label className="flex-1" htmlFor="price">
                Price
              </label>
              <input onChange={handleChange} value={price.value} className="flex-1 border-2 rounded-lg border-[#455579] px-2 py-2 text-black font-medium text-base focus:outline-[#7E9996]" name="price"  id="price" type="number" />
            </div>

            <div className="flex flex-col">
              <label className="flex-1" htmlFor="category">
                Category
              </label>
              <input onChange={handleChange} value={category.value} className="flex-1 border-2 rounded-lg border-[#455579] px-2 py-2 text-black font-medium text-base focus:outline-[#7E9996]" name="category"  id="category" type="text" />
            </div>
            
                
          </div>

          <div className="flex gap-5">
            <Button pink type='submit'> Create new Product </Button> 
            <button className="px-6 py-3 text-base rounded-[13px] border-[1px] bg-[#D45D75] text-white hover:bg-white hover:border-[#D45D75] hover:text-[#D45D75] duration-300" onClick={handleRedirect}>Cancel</button>
          </div>

      </div>

    </form>
  )
}

export default Pinata


//TODO: Tự động redirect về lại trang chủ nếu chưa signin 
//TODO: Nghiên cứu cách để biết người dùng để đăng ký owner chưa, nếu chưa thì redirect về trang chủ
//TODO: Tự động quản lý product để owner ko phải tự điền -> tránh bị trùng 
//TODO: Thêm Toastify 