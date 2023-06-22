import { Product, Login, Signup, ProductPage, UserCart } from './components'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<h1>HOME</h1>} />
          <Route path='/products/:category' element={<Product />} />
          <Route path='/product/:productId' element={<ProductPage />} />
          <Route path='/cart' element={<UserCart />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
