import axios from 'axios';

// Un seul endroit qui connaît l'adresse du serveur.
// En local : http://localhost:5000. En ligne : la variable VITE_API_URL.
const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api'
});

let token = null;

export function setAuthToken(t) {
  token = t;
}

api.interceptors.request.use(function (config) {
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

export default api;