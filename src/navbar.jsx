import './navbar.css';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar({ cartCount = 0 }) {
  return (
    <header className="navbar">
      <nav className="navbar-container">
        <span className="navbar-logo">DZShop</span>

        <div className="navbar-links">
          <Link to='/'>ACCUEIL</Link>
          <NavLink to='/produits'>produits</NavLink>
        </div>

        <div className="navbar-actions">
          <a href='/panier' className='btn btn-outline'>
            Panier
            {cartCount > 0 && <span className='badge'>{cartCount}</span>}
          </a>
          <a href='/connexion' className='btn btn-primary'>
            Connexion
          </a>
        </div>
      </nav>
    </header>
  );
}