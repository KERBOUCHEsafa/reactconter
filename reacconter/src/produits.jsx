import { useState, useEffect } from 'react';
import './produits.css';
import { Link } from 'react-router-dom';
import api from './api/axios';
import pic1 from './pic.png/pic1.jpeg';
import pic2 from './pic.png/pic2.jpeg';
import pic3 from './pic.png/pic3.jpeg';
import pic4 from './pic.png/pic4.jpeg';
import pic5 from './pic.png/pic5.jpeg';
import pic6 from './pic.png/pic6.jpeg';

const productImages = [pic1, pic2, pic3, pic4, pic5, pic6];

function getProductImage(product, index) {
  const rawId = Number(product?.id ?? product?._id ?? index + 1);
  const normalizedId = Number.isFinite(rawId) ? rawId : index + 1;
  const imageIndex = ((normalizedId - 1) % productImages.length + productImages.length) % productImages.length;

  return productImages[imageIndex] || product?.image || 'https://placehold.co/600x600/efe7f4/5a2a6d?text=Product';
}

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
      {produits.map((p, index) => {
        const imageUrl = getProductImage(p, index);

        return (
          <div key={p._id || p.id || index} className='product'>
            <div className='product-image'>
              <img src={imageUrl} alt={p.name || 'Produit'} />
            </div>

            <div className='product-info'>
              <h3>{p.name || 'Produit'}</h3>
              <p>{Number(p.price || 0).toLocaleString('fr-FR')} DA</p>
              <Link to={`/produits/${p._id || p.id}`}>Voir détails</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Product;