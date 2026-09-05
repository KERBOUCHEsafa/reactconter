import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './navbar.jsx';
import './navbar.css';
import './App.css';
import Footer from './footer.jsx';
import './footer.css';
import Dashbored from './dashbored.jsx';
import Produits from './produits.jsx';
import ProductDetails from './produitsinfo.jsx';
import './produits.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((currentCart) => [...currentCart, product]);
  };

  return (
    <BrowserRouter>
      <Navbar cartCount={cartItems.length} />

      <main className="content">
        <Routes>
          <Route path='/' element={<Dashbored />} />
          <Route path='/produits' element={<Produits />} />
          <Route path='/produits/:id' element={<ProductDetails addToCart={addToCart} />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
