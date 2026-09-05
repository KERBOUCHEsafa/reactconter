import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

export default function Footer(){
  return (
    <footer className='site-footer'>
      <div className='container footer-inner'>
        <div className='footer-col brand'>
          <div className='logo'>DZShop</div>
          <p>Votre boutique d'électronique en ligne. Livraison dans les 58 wilayas.</p>
        </div>

        <div className='footer-col nav'>
          <h4>Navigation</h4>
          <ul>
            <li><Link to='/'>Accueil</Link></li>
            <li><Link to='/produits'>Produits</Link></li>
            <li><Link to='/panier'>Panier</Link></li>
          </ul>
        </div>

        <div className='footer-col contact'>
          <h4>Contact</h4>
          <div className='contact-item'>📍 Skikda, Algérie</div>
          <div className='contact-item'>📞 0555 12 34 56</div>
          <div className='contact-item'>✉ contact@dzshop.dz</div>
        </div>
      </div>

      <div className='footer-bottom'>
        <div className='container'>© 2026 DZShop — Tous droits réservés</div>
      </div>
    </footer>
  );
}
