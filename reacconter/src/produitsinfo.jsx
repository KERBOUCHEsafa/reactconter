import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import api from './api/axios';
import './produits-cart.css';
import pic1 from './pic.png/pic1.jpeg';
import pic2 from './pic.png/pic2.jpeg';
import pic3 from './pic.png/pic3.jpeg';
import pic4 from './pic.png/pic4.jpeg';
import pic5 from './pic.png/pic5.jpeg';
import pic6 from './pic.png/pic6.jpeg';

const productImages = {
  1: pic1,
  2: pic2,
  3: pic3,
  4: pic4,
  5: pic5,
  6: pic6,
};

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

  const resolvedId = Number(product.id ?? product._id?.toString().slice(-1) ?? 1);
  const imageSource = productImages[resolvedId] || product.image || 'https://placehold.co/600x600/efe7f4/5a2a6d?text=Product';

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
            src={imageSource}
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