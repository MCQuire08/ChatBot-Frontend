import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3030',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token agregado a la solicitud:', token);
    } else {
      console.log('No se encontró token en localStorage.');
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
