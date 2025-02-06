import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    const { access_token, user } = response.data;
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(user));
    return response.data;
  },
  signup: async ({ email, password, name }) => {
    const response = await api.post('/auth/signup', { email, password, full_name: name });
    const { access_token, user } = response.data;
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(user));
    return response.data;
  },
  verifyEmail: async (token) => {
    const response = await api.post('/auth/verify-email', null, {
      params: { token }
    });
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  resendVerification: async (email) => {
    const response = await api.post('/auth/resend-verification', { email });
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

export const images = {
  generate: async (data) => {
    const response = await api.post('/generation/generate-image', data);
    return response.data;
  },
  list: async (page = 1, limit = 10) => {
    const response = await api.get('/generation/history', { params: { type: "image" } });
    return response.data;
  }
};

export const videos = {
  generate: async (data) => {
    const formData = new FormData();
    formData.append('prompt', data.prompt);
    if (data.image) {
      formData.append('reference_image', data.image);
    }
    
    const response = await api.post('/generation/generate-video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  list: async (page = 1, limit = 10) => {
    const response = await api.get('/generation/history', { params: { type: "video" } });
    return response.data;
  }
};

export const tokens = {
  history: async () => {
    try {
      const response = await api.get('/tokens/history');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Failed to fetch token history';
      throw new Error(errorMessage);
    }
  },
  updateBalance: (newBalance) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.tokens = newBalance;
      localStorage.setItem('user', JSON.stringify(user));
      // Dispatch a custom event for real-time UI updates
      window.dispatchEvent(new CustomEvent('tokenBalanceUpdated', { detail: { balance: newBalance } }));
    } catch (error) {
      console.error('Failed to update token balance:', error);
    }
  }
};

export default api; 