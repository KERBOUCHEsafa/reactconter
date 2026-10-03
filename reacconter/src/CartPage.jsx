import { useNavigate } from 'react-router-dom';
import './produits-cart.css';

const FRAIS_LIVRAISON = 500;
const LIVRAISON_GRATUITE_DES = 10000;

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
        <p>{Number(item.price).toLocaleString('fr-FR')} DA</p>

        <div className='quantity'>
          <button onClick={() => decreaseQuantity(item._id)} aria-label='Decrease quantity'>−</button>
          <span>{item.quantity}</span>
          <button onClick={() => increaseQuantity(item._id)} aria-label='Increase quantity'>+</button>
        </div>
      </div>

      <div className='cart-item-right'>
        <strong>{(Number(item.price) * item.quantity).toLocaleString('fr-FR')} DA</strong>
        <button className='remove-btn' onClick={() => removeFromCart(item._id)} aria-label='Remove item'>🗑️</button>
      </div>
    </div>
  );
}

function CartPage({ items, increaseQuantity, decreaseQuantity, removeFromCart }) {
  const navigate = useNavigate();
  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const livraison = subtotal >= LIVRAISON_GRATUITE_DES ? 0 : FRAIS_LIVRAISON;
  const total = subtotal + livraison;

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
              key={item._id}
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
            <strong>{subtotal.toLocaleString('fr-FR')} DA</strong>
          </div>
          <div className='summary-row'>
            <span>Livraison</span>
            <strong>{livraison === 0 ? 'Gratuite' : `${livraison.toLocaleString('fr-FR')} DA`}</strong>
          </div>
          <div className='summary-row total'>
            <span>Total</span>
            <strong>{total.toLocaleString('fr-FR')} DA</strong>
          </div>
          <button className='checkout-btn' onClick={() => navigate('/checkout')}>Passer la commande</button>
        </aside>
      </div>
    </div>
  );
}

export default CartPage;