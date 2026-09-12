import { useState } from 'react';
import './produits-cart.css';

function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    state: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
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

  return (
    <section className='order-page checkout-page'>
      <div className='order-card'>
        <div className='order-header'>
          <p className='order-tag'>Commande</p>
          <h2>Finaliser votre commande</h2>
          <p className='order-subtitle'>Entrez vos informations de livraison.</p>
        </div>

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

          <button type='submit' className='order-submit-btn'>Confirmer la commande</button>
        </form>
      </div>
    </section>
  );
}

export default CheckoutPage;
