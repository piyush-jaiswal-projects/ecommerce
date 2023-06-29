import { Product, Login, Signup, ProductPage, UserCart, UserPortal } from './components'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import UserWishlist from './components/User/userWishlist';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<h1>HOME</h1>} />
          <Route path='/products/:category' element={<Product />} />
          <Route path='/product/:productId' element={<ProductPage />} />
          <Route path='/cart' element={<UserCart />} />
          <Route path='/wishlist' element={<div className='mt-[8vw] md:mt-[5vw]'><UserWishlist /></div>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/userportal' element={<UserPortal />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
