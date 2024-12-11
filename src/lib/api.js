import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    return response.data;
  },
  signup: async ({ email, password, name }) => {
    const response = await api.post('/auth/signup', { email, password, name });
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};

export const images = {
  generate: async (data) => {
    const response = await api.post('/generation/generate-image', data);
    return response.data;
  },
  list: async (page = 1, limit = 10) => {
    const response = await api.get('/generation/history', { params: { page, limit } });
    return response.data;
  }
};

export const videos = {
  generate: async (data) => {
    const formData = new FormData();
    formData.append('prompt', data.prompt);
    if (data.image) {
      formData.append('image', data.image);
    }
    
    const response = await api.post('/generation/generate-video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  list: async (page = 1, limit = 10) => {
    const response = await api.get('/generation/video-history', { params: { page, limit } });
    return response.data;
  }
};

export default api; 