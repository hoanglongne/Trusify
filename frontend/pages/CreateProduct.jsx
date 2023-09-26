import React from 'react'
import Layout from '../components/Layout'
import Pinata from '../components/Pinata'

function CreateProduct({wallet, contract}) {
  return (
    <Layout wallet={wallet}>
        <div className='h-full w-full flex justify-center items-center pt-[125px]'>
            <Pinata contract={contract} />
        </div>
    </Layout>
  )
}

export default CreateProduct