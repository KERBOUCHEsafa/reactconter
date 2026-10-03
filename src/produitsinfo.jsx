import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from './api/axios';
import './produits-cart.css';

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => {
        console.error('Erreur chargement produit:', error);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className='not-found'>Chargement du produit...</div>;
  }

  if (!product) {
    return (
      <div className='not-found'>
        <h2>Product not found</h2>
        <Link to='/produits'>Back to Products</Link>
      </div>
    );
  }

  return (
    <div className='product-details'>
      <Link to='/produits' className='back-link'>
        ← Back to Products
      </Link>

      <div className='details-container'>
        <div className='details-image'>
          <img src={product.image} alt={product.name} />
        </div>

        <div className='details-info'>
          <span className='category'>{product.category || 'Produit'}</span>
          <h1>{product.name}</h1>
          <p className='details-title'>{product.title || product.name}</p>

          <div className='details-rating'>
            <span>★★★★★</span>
            <span>
              {product.rating || 0} ({product.reviews || 0} reviews)
            </span>
          </div>

          <div className='details-price'>
            <p>{Number(product.price || 0).toLocaleString('fr-FR')} DA</p>
          </div>

          <p className='description'>{product.description || 'Aucun descriptif disponible.'}</p>

          <div className='stock'>
            {product.stock > 0 ? `✓ ${product.stock} items available` : 'Out of stock'}
          </div>

          <button
            className='details-cart-btn'
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
