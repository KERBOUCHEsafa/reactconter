import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api/axios';
import './produits-cart.css';

function CheckoutPage({ cartItems = [], clearCart }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    state: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState('');

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const total = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErreur('');

    if (cartItems.length === 0) {
      setErreur('Votre panier est vide.');
      return;
    }

    setEnvoi(true);

    try {
      await api.post('/orders', {
        items: cartItems.map((item) => ({ id: item._id, quantity: item.quantity })),
        nom: formData.name,
        prenom: formData.surname,
        email: formData.email,
        wilaya: formData.state,
      });

      if (clearCart) {
        clearCart();
      }
      setSubmitted(true);
    } catch (error) {
      setErreur(error?.response?.data?.message || 'Erreur lors de la commande');
    }

    setEnvoi(false);
  };

  if (submitted) {
    return (
      <section className='order-page checkout-page'>
        <div className='order-card checkout-confirmation'>
          <span className='checkout-confirmation-icon' aria-hidden='true'>✓</span>
          <h2>Commande confirmée</h2>
          <p>Merci {formData.name}. Votre commande sera traitée prochainement.</p>
        </div>
      </section>
    );
  }

  if (!localStorage.getItem('token')) {
    return (
      <section className='order-page checkout-page'>
        <div className='order-card'>
          <div className='order-header'>
            <p className='order-tag'>Commande</p>
            <h2>Connectez-vous pour commander</h2>
            <p className='order-subtitle'>Il faut avoir un compte pour passer une commande.</p>
          </div>
          <button type='button' className='order-submit-btn' onClick={() => navigate('/connexion')}>
            Se connecter
          </button>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className='order-page checkout-page'>
        <div className='order-card'>
          <div className='order-header'>
            <p className='order-tag'>Commande</p>
            <h2>Votre panier est vide</h2>
            <p className='order-subtitle'>Ajoutez des produits avant de commander.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='order-page checkout-page'>
      <div className='order-card'>
        <div className='order-header'>
          <p className='order-tag'>Commande</p>
          <h2>Finaliser votre commande</h2>
          <p className='order-subtitle'>Entrez vos informations de livraison.</p>
        </div>

        <p className='order-total'>Total : {total.toLocaleString('fr-FR')} DA</p>

        {erreur && <p className='order-error'>{erreur}</p>}

        <form className='order-form' onSubmit={handleSubmit}>
          <div className='order-field-row'>
            <label className='order-field'>
              <span>Nom</span>
              <input name='name' type='text' value={formData.name} onChange={updateField} required />
            </label>
            <label className='order-field'>
              <span>Prénom</span>
              <input name='surname' type='text' value={formData.surname} onChange={updateField} required />
            </label>
          </div>

          <label className='order-field'>
            <span>Email</span>
            <input name='email' type='email' value={formData.email} onChange={updateField} required />
          </label>

          <label className='order-field'>
            <span>Wilaya</span>
            <select name='state' value={formData.state} onChange={updateField} required>
              <option value=''>Choisir la wilaya</option>
              <option value='Alger'>Alger</option>
              <option value='Skikda'>Skikda</option>
              <option value='Oran'>Oran</option>
              <option value='Constantine'>Constantine</option>
              <option value='Tlemcen'>Tlemcen</option>
            </select>
          </label>

          <button type='submit' className='order-submit-btn' disabled={envoi}>
            {envoi ? 'Envoi...' : 'Confirmer la commande'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default CheckoutPage;