# ImageBuilder Backend API Documentation

## Base URL
```
http://localhost:8000
```

## Authentication
The API uses JWT (JSON Web Token) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### POST /auth/login
Login to get access token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "access_token": "string",
  "token_type": "bearer"
}
```

### Image Generation

#### POST /api/generate-image
Generate an image based on text prompt.

**Request Body:**
```json
{
  "prompt": "string",
  "style": "string",
  "size": "1024x1024"
}
```

**Response:**
```json
{
  "image_url": "string",
  "status": "success"
}
```

#### GET /api/images
Get list of generated images.

**Query Parameters:**
- page (optional): int
- limit (optional): int

**Response:**
```json
{
  "items": [
    {
      "id": "string",
      "url": "string",
      "prompt": "string",
      "created_at": "string",
      "style": "string"
    }
  ],
  "total": 0,
  "page": 0,
  "size": 0
}
```

### Error Responses
All endpoints may return these error responses:

```json
{
  "detail": "string"
}
```

Common HTTP Status Codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Validation Error
- 500: Internal Server Error 