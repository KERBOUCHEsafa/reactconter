import React from 'react';
import { Link } from 'react-router-dom';
import './dashbored.css';

export default function Dashbored(){
  return (
    <div className='landing'>
      <section className='hero'>
        <div className='container hero-inner'>
          <h1>Bienvenue sur DZShop</h1>
          <p className='lead'>Le meilleur de l'électronique, livré partout en Algérie.</p>
          <Link className='btn primary hero-cta' to='/produits'>Découvrir nos produits</Link>
        </div>
      </section>

      <section className='features'>
        <div className='container features-grid'>
          <div className='feature'>
            <div className='feature-icon'>🚚</div>
            <h4>Livraison 58 wilayas</h4>
            <p className='muted'>Gratuite dès 10 000 DZD d'achat.</p>
          </div>

          <div className='feature'>
            <div className='feature-icon'>🔒</div>
            <h4>Paiement à la livraison</h4>
            <p className='muted'>Vous payez à la réception.</p>
          </div>

          <div className='feature'>
            <div className='feature-icon'>↩️</div>
            <h4>Retour sous 7 jours</h4>
            <p className='muted'>Produit non conforme ? On le reprend.</p>
          </div>
        </div>
      </section>

      <section className='products container'>
        <h2>Produits vedettes</h2>
        <div className='see-all'>
          <Link className='btn outline' to='/produits'>Voir tous les produits</Link>
        </div>
      </section>
    </div>
  );
}
