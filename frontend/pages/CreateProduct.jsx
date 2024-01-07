import React from 'react'
import Layout from '../components/Layout'
import Pinata from '../components/Pinata'
import { useNavigate } from 'react-router-dom';

function CreateProduct({wallet, contract}) {
  const navigate = useNavigate();
  let isSignedIn = wallet.get_isSignedIn();

  React.useEffect(() => {
    if (!isSignedIn) {
      navigate('/', { replace: true });
    }
  }, isSignedIn);

  return (
    <MemoizedLayout wallet={wallet}>
        <div className='h-full px-[10%] flex flex-col justify-center items-center pt-[125px]'>
            <h2 className='text-3xl text-center font-black uppercase text-[#D45D75]'>Tell us something about your new product</h2>
            <Pinata contract={contract} navigate={navigate} wallet={wallet} />
        </div>
    </MemoizedLayout>
  )
}

const MemoizedLayout = React.memo(Layout);

export default CreateProduct