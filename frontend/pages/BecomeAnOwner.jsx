import React, {useEffect} from 'react'
import Layout from '../components/Layout'
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { signal } from "@preact/signals-react";


const ownerName = signal('')
const desc = signal('')
function BecomeAnOwner({contract, wallet}) {
    const navigate = useNavigate();
    let isSignedIn = wallet.get_isSignedIn();
    
    // useEffect(() => {
    //   if (!isSignedIn) {
    //     navigate('/', { replace: true });
    //   }
    // }, isSignedIn);
    

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await contract.addNewOwner(ownerName, desc)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        switch (name) {
        case "ownerName":
            ownerName.value = value;
            break;
        case "desc":
            desc.value = value
            break;
        }
      }


    return (
        <Layout wallet={wallet}>
            <div className='pt-[150px] mx-40 font-urbanist'>
                <h2 className='text-3xl text-center font-black uppercase text-[#D45D75]'>Let's become an owner and start leasing!!!</h2>
                
                <form className='flex flex-col mt-10 items-center p-10 gap-10 font-semibold text-[#455579] text-xl' onSubmit={handleSubmit}>
                    <div className='flex flex-col items-between justify-center gap-6 w-full'>
                        <div className='flex items-center flex-row flex-1 justify-between'>
                            <label htmlFor="ownerName" className='text-base'>
                                    Name your shop
                            </label>
                            <input className='max-w-[70%] flex-1 border-2 rounded-lg border-[#455579] px-2 py-2 text-black font-medium text-base' name='ownerName' type="text" id='ownerName' onChange={handleChange} value={ownerName.value} required />
                        </div>

                        <div className='flex items-center justify-between flex-row flex-1'>    
                            <label htmlFor="desc" className='text-base'>
                                    Describe your shop
                            </label>
                            <textarea className='max-w-[70%] flex-1 border-2 rounded-lg border-[#455579] px-2 py-2 text-black font-medium text-base' name='desc' id='desc' onChange={handleChange} value={desc.value} required />
                        </div>
                    </div>

                    <Button pink>Become an Owner!</Button>
                </form>
            </div>
        </Layout>
    )
}

export default BecomeAnOwner


//*: Thêm redirect về trang chủ sau khi submit thành công: Done nhưng mà không đợi 
//*  phản hồi thành công hay thất bại bại nên phải sửa

//TODO: Thêm Toastify 
//TODO: Sửa thành đến khi có kết quả promise mới redirect và thêm thông báo
//TODO: Tự động redirect vào trang này sau khi signin xong & chưa create owner