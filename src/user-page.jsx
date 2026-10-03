import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import api, { setAuthToken } from './api/axios';
import './produits-cart.css';

function AuthPage() {
  const navigate = useNavigate();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

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

  const saveAuth = (userData) => {
    setAuthToken(userData.token);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/');
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (!signUpData.email) {
      alert('Veuillez entrer un email');
      return;
    }

    if (!signUpData.password || !signUpData.name || !signUpData.surname) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        nom: `${signUpData.name} ${signUpData.surname}`.trim(),
        email: signUpData.email,
        password: signUpData.password
      });

      saveAuth(response.data);
      setSignUpData({ email: '', phone: '', password: '', name: '', surname: '' });
    } catch (error) {
      alert(error?.response?.data?.message || 'Erreur lors de la création du compte');
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    if (!signInData.email || !signInData.password) {
      alert('Veuillez entrer votre email et mot de passe');
      return;
    }

    try {
      const response = await api.post('/auth/login', {
        email: signInData.email,
        password: signInData.password
      });

      saveAuth(response.data);
      setSignInData({ email: '', password: '' });
    } catch (error) {
      alert(error?.response?.data?.message || 'Erreur lors de la connexion');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await api.post('/auth/google', {
        credential: credentialResponse.credential
      });

      saveAuth(response.data);
    } catch (error) {
      alert(error?.response?.data?.message || 'La connexion Google a échoué');
    }
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

        <div className='google-auth-box'>
          {googleClientId ? (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => alert('Google login failed')}
              text='continue_with'
              size='large'
              shape='pill'
            />
          ) : (
            <p className='google-auth-warning'>Ajoutez VITE_GOOGLE_CLIENT_ID dans votre fichier .env pour activer Google.</p>
          )}
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
