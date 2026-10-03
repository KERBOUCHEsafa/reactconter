import { useEffect, useState } from 'react';
import './navbar.css';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar({ cartCount = 0 }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const syncUser = () => {
      try {
        setUser(JSON.parse(localStorage.getItem('user') || 'null'));
      } catch {
        setUser(null);
      }
    };

    syncUser();
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <header className='navbar'>
      <nav className='navbar-container'>
        <span className='navbar-logo'>DZShop</span>

        <div className='navbar-links'>
          <Link to='/'>ACCUEIL</Link>
          <NavLink to='/produits'>PRODUITS</NavLink>
        </div>

        <div className='navbar-actions'>
          <Link to='/panier' className='btn btn-outline'>
            Panier
            {cartCount > 0 && <span className='badge'>{cartCount}</span>}
          </Link>

          {user ? (
            <>
              <span className='user-badge'>Bonjour {user.nom?.split(' ')[0] || 'client'}</span>
              <Link to='/connexion' className='btn btn-primary'>Mes commandes</Link>
              {user.role === 'admin' && (
                <Link to='/admin' className='btn btn-admin'>Admin</Link>
              )}
              <button type='button' className='btn btn-outline' onClick={handleLogout}>Déconnexion</button>
            </>
          ) : (
            <>
              <Link to='/connexion' className='btn btn-primary'>Connexion</Link>
              <Link to='/admin' className='btn btn-admin'>Admin</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}