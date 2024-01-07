import 'regenerator-runtime/runtime';
import React, { Suspense } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load the components
const Home = React.lazy(() => import('./pages/Home'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const ConfirmSuccess = React.lazy(() => import('./pages/ConfirmSuccess'));
const CreateProduct = React.lazy(() => import('./pages/CreateProduct'));
const BecomeAnOwner = React.lazy(() => import('./pages/BecomeAnOwner'));

function App({ wallet, contract }) {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home wallet={wallet} contract={contract} />
              </Suspense>
            }
          />
          <Route
            path="/productdetail/:productId"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProductDetail wallet={wallet} contract={contract} />
              </Suspense>
            }
          />
          {/* Other routes */}
          <Route
            path="/confirmsuccess"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ConfirmSuccess />
              </Suspense>
            }
          />
          <Route
            path="/create-product"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <CreateProduct wallet={wallet} contract={contract} />
              </Suspense>
            }
          />
          <Route
            path="/create-owner"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <BecomeAnOwner wallet={wallet} contract={contract} />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
