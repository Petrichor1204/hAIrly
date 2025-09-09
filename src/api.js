import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

// Override headers for multipart/form-data requests
api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    // Let the browser set the Content-Type header for form-data
    delete config.headers['Content-Type'];
  }
  return config;
});

export default api;
