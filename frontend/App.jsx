import 'regenerator-runtime/runtime';
import React from 'react';

// import './assets/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import ConfirmSuccess from './pages/ConfirmSuccess';

import { EducationalText, SignInPrompt, SignOutButton } from './ui-components';
import CreateProduct from './pages/CreateProduct';

function App({wallet, contract}) {
  
  return ( 
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home wallet={wallet} contract={contract}/>} />
          <Route path='/productdetail/:productId' element={<ProductDetail wallet={wallet} contract={contract}/>} />
          {/* <Route path='/login' element={<ProductDetail wallet={wallet} contract={contract}/>} /> */}
          {/* <Route path='/signup' element={<ProductDetail wallet={wallet} contract={contract}/>} /> */}
          <Route path='/confirmsuccess' element={<ConfirmSuccess/>} />
          <Route path='/create-product' element={<CreateProduct wallet={wallet} contract={contract}/>} />
        </Routes>
      </div>
    </Router>
   );
}

export default App;
