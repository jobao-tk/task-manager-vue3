import axios from 'axios';

// Crie uma instância do axios
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Altere para o URL do seu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicione um interceptor para adicionar headers de validação
apiClient.interceptors.request.use(
  (config) => {
    // Adicione o header de validação
    const token = localStorage.getItem('authToken'); // Supondo que você armazene o token no localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
