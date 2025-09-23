# Docker Compose Setup

This project uses Docker Compose to orchestrate three services: Redis, Backend API, and Frontend React application.

## Services

- **Redis**: Caching service for authentication tokens
- **Backend**: Express.js API server (port 3001)
- **Frontend**: React application (port 3000)

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Start services in detached mode:**
   ```bash
   docker-compose up -d --build
   ```

3. **Stop all services:**
   ```bash
   docker-compose down
   ```

## Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Redis**: localhost:6379

## Development

For development with live reloading:

1. **Backend development:**
   ```bash
   # In one terminal
   cd backend
   npm run dev
   ```

2. **Frontend development:**
   ```bash
   # In another terminal
   cd frontend
   npm start
   ```

## Environment Variables

The backend service uses these environment variables:
- `PORT`: Server port (default: 3000)
- `REDIS_HOST`: Redis hostname (default: redis)
- `REDIS_PORT`: Redis port (default: 6379)

The frontend service uses:
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:3001)

## Troubleshooting

1. **Port conflicts**: Make sure ports 3000, 3001, and 6379 are available
2. **Redis connection**: Ensure Redis service is running before starting backend
3. **Build issues**: Clear Docker cache if needed:
   ```bash
   docker-compose down --volumes
   docker system prune -f
   docker-compose up --build
