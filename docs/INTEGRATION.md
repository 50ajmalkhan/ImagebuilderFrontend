# Frontend Integration Guide

## Getting Started

### Base URL Configuration
```typescript
const API_BASE_URL = 'http://localhost:8000';
```

### Authentication Setup

1. Initialize authentication in your frontend:
```typescript
// Example using axios
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
```

### Example Integration Code

#### 1. User Authentication
```typescript
const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};
```

#### 2. Image Generation
```typescript
interface GenerateImageRequest {
  prompt: string;
  style?: string;
  size?: string;
}

const generateImage = async (data: GenerateImageRequest) => {
  try {
    const response = await api.post('/api/generate-image', data);
    return response.data;
  } catch (error) {
    console.error('Image generation failed:', error);
    throw error;
  }
};
```

#### 3. Fetch Generated Images
```typescript
interface ImageListParams {
  page?: number;
  limit?: number;
}

const fetchImages = async (params: ImageListParams) => {
  try {
    const response = await api.get('/api/images', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch images:', error);
    throw error;
  }
};
```

### Error Handling

```typescript
interface ApiError {
  detail: string;
  status_code: number;
}

const handleApiError = (error: any) => {
  if (error.response) {
    const { status, data } = error.response;
    switch (status) {
      case 401:
        // Handle unauthorized
        redirectToLogin();
        break;
      case 403:
        // Handle forbidden
        showForbiddenError();
        break;
      case 422:
        // Handle validation errors
        showValidationErrors(data.detail);
        break;
      default:
        // Handle other errors
        showGenericError();
    }
  }
};
```

### WebSocket Integration (if applicable)

```typescript
const connectWebSocket = () => {
  const ws = new WebSocket(`ws://localhost:8000/ws`);
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // Handle real-time updates
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  return ws;
};
```

## Best Practices

1. **Error Handling**
   - Always implement proper error handling
   - Show user-friendly error messages
   - Log errors for debugging

2. **Authentication**
   - Store tokens securely
   - Implement token refresh mechanism
   - Handle expired sessions

3. **Loading States**
   - Show loading indicators during API calls
   - Implement skeleton loading where appropriate
   - Handle timeout scenarios

4. **Data Caching**
   - Cache frequently accessed data
   - Implement proper cache invalidation
   - Use optimistic updates for better UX

5. **Rate Limiting**
   - Implement request throttling
   - Show appropriate feedback for rate limits
   - Queue requests if necessary 