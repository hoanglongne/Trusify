import React, {useState} from 'react'
import Layout from '../components/Layout'

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
            <div className='pt-[125px]'>
                <form onSubmit={handleSubmit}>
                <label htmlFor="ownerName">
                        Name for your shop
                        <input name='name' type="text" id='ownerName' onChange={handleChange} value={state.name} required />
                    </label>
                <label htmlFor="desc">
                        Please describe your shop in about 100 words
                        <input name='desc' type="text" id='desc' onChange={handleChange} value={state.desc} required />
                    </label>

                <button type='submit'>Become an Owner!</button>
                </form>
            </div>
        </Layout>
    )
}

export default BecomeAnOwner