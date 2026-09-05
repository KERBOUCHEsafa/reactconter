import { useState } from 'react';
import './produits-cart.css';

function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    state: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.surname || !formData.email || !formData.state) {
      alert('Veuillez remplir tous les champs !');
      return;
    }

    alert(
      `Commande envoyée pour ${formData.name} ${formData.surname}, Email: ${formData.email}, Wilaya: ${formData.state}`
    );
  };

  return (
    <div className='order-page'>
      <div className='order-card'>
        <div className='order-header'>
          <p className='order-tag'>Paiement</p>
          <h2>Formulaire de commande</h2>
          <p className='order-subtitle'>Remplissez vos informations pour confirmer votre commande.</p>
        </div>

        <form className='order-form' onSubmit={handleSubmit}>
          <div className='order-field-row'>
            <label className='order-field'>
              <span>Nom</span>
              <input
                type='text'
                placeholder='Nom'
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </label>

            <label className='order-field'>
              <span>Prénom</span>
              <input
                type='text'
                placeholder='Prénom'
                value={formData.surname}
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
              />
            </label>
          </div>

          <label className='order-field'>
            <span>Email</span>
            <input
              type='email'
              placeholder='Email'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </label>

          <label className='order-field'>
            <span>Wilaya</span>
            <select
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            >
              <option value=''>Choisir la wilaya</option>
              <option value='Alger'>Alger</option>
              <option value='Mila'>Mila</option>
              <option value='Oran'>Oran</option>
            </select>
          </label>

          <button type='submit' className='order-submit-btn'>Envoyer la commande</button>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;
