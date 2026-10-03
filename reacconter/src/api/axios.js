import axios from 'axios';

const resolveApiBaseUrl = () => {
  const configuredUrl = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');

  if (configuredUrl) {
    return configuredUrl;
  }

  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:5000';
  }

  return 'https://reactconter.onrender.com';
};

const api = axios.create({
  baseURL: `${resolveApiBaseUrl()}/api`
});

function getStoredToken() {
  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
}

export function setAuthToken(t) {
  try {
    localStorage.setItem('token', t || '');
  } catch {
    // ignore write errors
  }
}

api.interceptors.request.use(function (config) {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

export default api;