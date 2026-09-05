import { Link, useParams } from "react-router-dom";
import { produits} from "./produits.jsx";
import './produits cart.css';

function ProductDetails({ addToCart }) {

  const { id } = useParams();

  const product = produits.find(
    item => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>

        <Link to="/">
          Back to Products
        </Link>
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
            ${product.price.toFixed(2)}
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
