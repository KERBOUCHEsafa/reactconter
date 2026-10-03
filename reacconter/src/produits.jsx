import { useState, useEffect } from 'react';
import './produits.css';
import { Link } from 'react-router-dom';
import api from './api/axios';

function Product() {
  const [produits, setProduits] = useState([]);

  useEffect(function () {
    api.get('/products')
      .then(function (response) {
        setProduits(response.data);
      })
      .catch(function () {
        setProduits([]);
      });
  }, []);

  return (
    <div className='products'>
      {produits.map((p) => (
        <div key={p._id} className='product'>
          <img src={p.image} alt={p.name} />
          <h3>{p.name}</h3>
          <p>{p.price}</p>
          <Link to={`/produits/${p._id}`}>View details</Link>
        </div>
      ))}
    </div>
  );
}

export default Product;