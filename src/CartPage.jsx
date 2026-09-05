
import { useNavigate } from 'react-router-dom';
import './produits-cart.css';

function CartItem({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
}) {
  return (
    <div className='cart-item'>
      <img src={item.image} alt={`Image of ${item.name}`} />

      <div className='cart-item-info'>
        <h3>{item.name}</h3>
        <p>${Number(item.price).toFixed(2)}</p>

        <div className='quantity'>
          <button onClick={() => decreaseQuantity(item.id)} aria-label='Decrease quantity'>−</button>
          <span>{item.quantity}</span>
          <button onClick={() => increaseQuantity(item.id)} aria-label='Increase quantity'>+</button>
        </div>
      </div>

      <div className='cart-item-right'>
        <strong>${(Number(item.price) * item.quantity).toFixed(2)}</strong>
        <button className='remove-btn' onClick={() => removeFromCart(item.id)} aria-label='Remove item'>🗑️</button>
      </div>
    </div>
  );
}

function CartPage({ items, increaseQuantity, decreaseQuantity, removeFromCart }) {
  const navigate = useNavigate();
  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  if (!items.length) {
    return (
      <div className='cart-empty'>
        <h2>Votre panier est vide</h2>
        <p>
          Ajoutez quelques produits pour commencer votre achat.{' '}
          <a href='/produits'>Voir les produits</a>
        </p>
      </div>
    );
  }

  return (
    <div className='cart-page'>
      <div className='cart-header'>
        <h2>Panier</h2>
      </div>

      <div className='cart-layout'>
        <div className='cart-items'>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>

        <aside className='cart-summary'>
          <h3>Résumé</h3>
          <div className='summary-row'>
            <span>Sous-total</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className='summary-row'>
            <span>Livraison</span>
            <strong>Gratuite</strong>
          </div>
          <div className='summary-row total'>
            <span>Total</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <button className='checkout-btn' onClick={() => navigate('/checkout')}>Passer la commande</button>
        </aside>
      </div>
    </div>
  );
}

export default CartPage;
