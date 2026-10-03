import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { setAuthToken } from './api/axios';
import './index.css';
import App from './App.jsx';

// Si on était déjà connectée avant un F5, on renvoie le token au serveur
// pour chaque appel, sans avoir à se reconnecter.
const savedToken = localStorage.getItem('token');
if (savedToken) {
  setAuthToken(savedToken);
}

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const app = (
  <StrictMode>
    {googleClientId ? (
      <GoogleOAuthProvider clientId={googleClientId}>
        <App />
      </GoogleOAuthProvider>
    ) : (
      <App />
    )}
  </StrictMode>
);

createRoot(document.getElementById('root')).render(app);