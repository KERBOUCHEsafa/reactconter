import { useState } from 'react';
import './produits-cart.css';

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpData, setSignUpData] = useState({
    email: '',
    phone: '',
    password: '',
    name: '',
    surname: ''
  });
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!signUpData.email && !signUpData.phone) {
      alert('Veuillez entrer un email ou un numéro de téléphone');
      return;
    }
    if (!signUpData.password || !signUpData.name || !signUpData.surname) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    alert(
      `Compte créé pour ${signUpData.name} ${signUpData.surname}\nEmail/Téléphone: ${signUpData.email || signUpData.phone}`
    );
    setSignUpData({ email: '', phone: '', password: '', name: '', surname: '' });
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!signInData.email || !signInData.password) {
      alert('Veuillez entrer votre email et mot de passe');
      return;
    }
    alert(`Connecté avec: ${signInData.email}`);
    setSignInData({ email: '', password: '' });
  };

  return (
    <div className='auth-page'>
      <div className='auth-container'>
        <div className='auth-tabs'>
          <button
            className={`auth-tab ${!isSignUp ? 'active' : ''}`}
            onClick={() => setIsSignUp(false)}
          >
            Connexion
          </button>
          <button
            className={`auth-tab ${isSignUp ? 'active' : ''}`}
            onClick={() => setIsSignUp(true)}
          >
            Inscription
          </button>
        </div>

        {!isSignUp ? (
          <div className='auth-form-container'>
            <div className='auth-header'>
              <p className='auth-tag'>Connexion</p>
              <h2>Se connecter</h2>
              <p className='auth-subtitle'>Accédez à votre compte</p>
            </div>

            <form className='auth-form' onSubmit={handleSignInSubmit}>
              <label className='auth-field'>
                <span>Email</span>
                <input
                  type='email'
                  name='email'
                  placeholder='Votre email'
                  value={signInData.email}
                  onChange={handleSignInChange}
                />
              </label>

              <label className='auth-field'>
                <span>Mot de passe</span>
                <input
                  type='password'
                  name='password'
                  placeholder='Votre mot de passe'
                  value={signInData.password}
                  onChange={handleSignInChange}
                />
              </label>

              <button type='submit' className='auth-btn'>Se connecter</button>
            </form>
          </div>
        ) : (
          <div className='auth-form-container'>
            <div className='auth-header'>
              <p className='auth-tag'>Inscription</p>
              <h2>Créer un compte</h2>
              <p className='auth-subtitle'>Rejoignez-nous aujourd'hui</p>
            </div>

            <form className='auth-form' onSubmit={handleSignUpSubmit}>
              <div className='auth-field-row'>
                <label className='auth-field'>
                  <span>Nom</span>
                  <input
                    type='text'
                    name='name'
                    placeholder='Votre nom'
                    value={signUpData.name}
                    onChange={handleSignUpChange}
                  />
                </label>

                <label className='auth-field'>
                  <span>Prénom</span>
                  <input
                    type='text'
                    name='surname'
                    placeholder='Votre prénom'
                    value={signUpData.surname}
                    onChange={handleSignUpChange}
                  />
                </label>
              </div>

              <label className='auth-field'>
                <span>Email</span>
                <input
                  type='email'
                  name='email'
                  placeholder='Votre email'
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                />
              </label>

              <label className='auth-field'>
                <span>Numéro de téléphone (optionnel)</span>
                <input
                  type='tel'
                  name='phone'
                  placeholder='Votre numéro de téléphone'
                  value={signUpData.phone}
                  onChange={handleSignUpChange}
                />
              </label>

              <label className='auth-field'>
                <span>Mot de passe</span>
                <input
                  type='password'
                  name='password'
                  placeholder='Créer un mot de passe'
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                />
              </label>

              <button type='submit' className='auth-btn'>Créer un compte</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
