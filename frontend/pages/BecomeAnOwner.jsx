import React, {useState} from 'react'
import Layout from '../components/Layout'
import Button from '../components/Button';

function BecomeAnOwner({contract, wallet}) {
    const [state, setState] = useState({
        name:"",
        desc:""
    });

    function handleSubmit(e) {
        e.preventDefault()
        contract.addNewOwner(state.name, state.desc)
    }

    function handleChange(evt) {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      }

    

    return (
        <Layout wallet={wallet}>
            <div className='pt-[150px] mx-40 font-urbanist'>
                <h2 className='text-3xl text-center font-black uppercase text-[#D45D75]'>Let's become an owner and start leasing!!!</h2>
                
                <form className='flex flex-col mt-10 items-center p-10 gap-6 font-semibold text-[#455579] text-xl' onSubmit={handleSubmit}>
                    <div className='flex flex-col items-between justify-center gap-6 w-full'>
                        <div className='flex items-center flex-row flex-1 justify-between'>
                            <label htmlFor="ownerName">
                                    Name your shop
                            </label>
                            <input className='max-w-[70%] flex-1 border-2 rounded-lg border-[#455579] px-4 py-5 text-black font-medium text-base' name='name' type="text" id='ownerName' onChange={handleChange} value={state.name} required />
                        </div>

                        <div className='flex items-center justify-between flex-row flex-1'>    
                            <label htmlFor="desc">
                                    Describe your shop
                            </label>
                            <textarea className='max-w-[70%] flex-1 border-2 rounded-lg border-[#455579] px-4 py-5 text-black font-medium text-base' name='desc' id='desc' onChange={handleChange} value={state.desc} required />
                        </div>
                    </div>

                    <Button pink>Become an Owner!</Button>
                </form>
            </div>
        </Layout>
    )
}

export default BecomeAnOwner