import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from './api/axios';
import './produits.css';

import pic1 from './pic.png/pic1.jpeg';
import pic2 from './pic.png/pic2.jpeg';
import pic3 from './pic.png/pic3.jpeg';
import pic4 from './pic.png/pic4.jpeg';
import pic5 from './pic.png/pic5.jpeg';
import pic6 from './pic.png/pic6.jpeg';

const productImages = [pic1, pic2, pic3, pic4, pic5, pic6];

function getProductImage(product, index) {
  if (typeof product?.image === 'string' && product.image.startsWith('http')) {
    return product.image;
  }

  if (typeof product?.image === 'string' && product.image.startsWith('/')) {
    const fileNumber = product.image.match(/(\d+)/)?.[1];
    if (fileNumber) {
      const imageIndex = Number(fileNumber) - 1;
      return productImages[imageIndex] || productImages[index % productImages.length];
    }
  }

  return productImages[index % productImages.length];
}

function Product() {
  const [produits, setProduits] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [categorie, setCategorie] = useState('');
  const [tri, setTri] = useState('');
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    api
      .get('/products')
      .then((response) => setProduits(response.data))
      .catch(() => {
        setErreur('Serveur injoignable — le backend est-il lancé ?');
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = [...new Set(produits.map((p) => p.category || 'Autres'))];

  const resultats = produits
    .filter((p) => (p.name || '').toLowerCase().includes(recherche.toLowerCase()))
    .filter((p) => categorie === '' || (p.category || 'Autres') === categorie);

  const resultatsTries = [...resultats].sort((a, b) => {
    if (tri === 'prix-asc') return Number(a.price) - Number(b.price);
    if (tri === 'prix-desc') return Number(b.price) - Number(a.price);
    if (tri === 'nom') return (a.name || '').localeCompare(b.name || '');
    return 0;
  });

  if (loading) {
    return <div className='products'>Chargement des produits...</div>;
  }

  if (erreur) {
    return <div className='products'>{erreur}</div>;
  }

  return (
    <div className='products'>
      <h1>Nos produits</h1>

      <div className='products-toolbar'>
        <input
          className='search-input'
          placeholder='Rechercher un produit...'
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />

        <select
          className='filter-select'
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
        >
          <option value=''>Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className='filter-select'
          value={tri}
          onChange={(e) => setTri(e.target.value)}
        >
          <option value=''>Trier par...</option>
          <option value='prix-asc'>Prix croissant</option>
          <option value='prix-desc'>Prix décroissant</option>
          <option value='nom'>Nom A-Z</option>
        </select>
      </div>

      {resultatsTries.length === 0 ? (
        <p className='text-muted'>Aucun produit ne correspond.</p>
      ) : (
        <div className='products-grid'>
          {resultatsTries.map((p, index) => (
            <div key={p._id || p.id} className='product'>
              <img src={getProductImage(p, index)} alt={p.name} />
              <h3>{p.name}</h3>
              <p>{Number(p.price).toLocaleString('fr-FR')} DA</p>
              <Link to={`/produits/${p._id || p.id}`}>View details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Product;