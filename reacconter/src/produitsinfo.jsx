import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import api from './api/axios';
import './produits-cart.css';

function ProductDetails({ addToCart }) {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(function () {
    let annule = false;

    api.get(`/products/${id}`)
      .then(function (response) {
        if (!annule) setProduct(response.data);
      })
      .catch(function () {
        if (!annule) setNotFound(true);
      });

    return function () {
      annule = true;
    };
  }, [id]);

  if (notFound) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>

        <Link to="/">
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found">
        <h2>Chargement...</h2>
      </div>
    );
  }

  return (
    <div className="product-details">

      <Link
        to="/"
        className="back-link"
      >
        ← Back to Products
      </Link>

      <div className="details-container">

        <div className="details-image">

          <img
            src={product.image}
            alt={product.name}
          />

        </div>

        <div className="details-info">

          <span className="category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <p className="details-title">
            {product.title}
          </p>

          <div className="details-rating">

            <span>
              ★★★★★
            </span>

            <span>
              {product.rating} ({product.reviews} reviews)
            </span>

          </div>

          <div className="details-price">
            <p>{product.price.toLocaleString('fr-FR')} DA</p>
          </div>

          <p className="description">
            {product.description}
          </p>

          <div className="stock">
            {product.stock > 0
              ? `✓ ${product.stock} items available`
              : "Out of stock"
            }
          </div>

          <button
            className="details-cart-btn"
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