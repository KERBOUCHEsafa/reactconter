import { BrowserRouter, Routes, Route  ,Link } from 'react-router-dom';
import Navbar from "./navbar.jsx";
import './navbar.css';
import "./App.css";
import Footer from "./footer.jsx";
import './footer.css';
import Dashbored from './dashbored.jsx';
import Produits from './produits.jsx';  
import './produits.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="content">
        <Routes>
          <Route path='/' element={<Dashbored />} />
          <Route path='/produits' element={<Produits />} />  {/* ✅ Use Produits */}
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
