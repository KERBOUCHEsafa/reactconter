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
import CartPage from './CartPage.jsx';
import CheckoutPage from './CheckoutPage.jsx';
import AuthPage from './user-page.jsx';
import AdminPage from './AdminPage.jsx';
import './produits.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (productId) => {
    setCartItems((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  return (
    <BrowserRouter>
      <Navbar cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />

      <main className='content'>
        <Routes>
          <Route path='/' element={<Dashbored />} />
          <Route path='/produits' element={<Produits />} />
          <Route path='/products' element={<Produits />} />
          <Route path='/produits/:id' element={<ProductDetails addToCart={addToCart} />} />
          <Route
            path='/cart'
            element={
              <CartPage
                items={cartItems}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route
            path='/panier'
            element={
              <CartPage
                items={cartItems}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/connexion' element={<AuthPage />} />
          <Route path='/admin' element={<AdminPage />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
