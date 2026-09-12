import './produits.css';
import { Link } from 'react-router-dom';
import { produits } from './produits-data.js';

function Product() {
  return (
    <div className='products'>
      {produits.map((p) => (
        <div key={p.id} className='product'>
          <img src={p.image} alt={p.name} />
          <h3>{p.name}</h3>
          <p>{p.price}</p>
          <Link to={`/produits/${p.id}`}>View details</Link>
        </div>
      ))}
    </div>
  );
}

export default Product;