# Setup Guide

## Prerequisites
- Docker and Docker Compose
- Python 3.11+
- Git

## Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd VidGen
```

2. Create and configure `.env` file:
```bash
cp .env.example .env
```

Required environment variables:
```
# API Settings
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=True

# Supabase Configuration
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
SUPABASE_SERVICE_KEY=your-supabase-service-key

# JWT Configuration
JWT_SECRET=your-jwt-secret

# AI Model Configuration
AI_MODEL_KEY=your-openai-key
RUNWAY_API_KEY=your-runway-key

# Database Configuration
DB_HOST=your-db-host
DB_PORT=6543
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
```

## Running with Docker

1. Build and start the containers:
```bash
docker compose up --build
```

2. The API will be available at `http://localhost:8000`

## Development Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run database migrations:
```bash
alembic upgrade head
```

4. Start the development server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Testing

Run tests using pytest:
```bash
pytest
```

## API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc` 