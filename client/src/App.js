import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import {
  Product,
  Login,
  Signup,
  ProductPage,
  UserCart,
  UserPortal,
  PaymentStatus,
  Home
} from './components'

import UserWishlist from './components/User/userWishlist';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:category' element={<Product />} />
          <Route path='/product/:productId' element={<ProductPage />} />
          <Route path='/cart' element={<UserCart />} />
          <Route path='/wishlist' element={<div className='mt-[8vw] md:mt-[5vw]'><UserWishlist /></div>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/userportal' element={<UserPortal />} />
          <Route path='/paymentsuccess' element={<PaymentStatus status="success" />} />
          <Route path='/paymentfailed' element={<PaymentStatus status="failed" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
