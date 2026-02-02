# Payreq Frontend

Frontend development repository for Payreq. This repository contains the React and Ember frontends, configured to work with the test.payreq.com backend.

## Prerequisites

- [Docker Desktop](https://docs.docker.com/desktop/)

## Getting Started

### 1. Start the Docker Compose stack

```sh
docker compose up -d
```

This will start:
- **frontend** - React frontend on port 80
- **frontend-ember** - Ember frontend on port 80
- **traefik** - Reverse proxy on port 80 (or `STACK_PORT` if set)

### 2. Access the application

Open your browser and navigate to:
- `http://localhost` - Main application

Traefik routes requests automatically:
- Frontend paths (`/portal`, `/pay`, `/fastform`, etc.) → React frontend
- Ember paths (`/customer`, `/css`, `/js`, etc.) → Ember frontend
- API paths (`/auth`, `/sys`, `/api`) → test.payreq.com backend

### 3. Stop the stack

```sh
docker compose down
```

To also remove volumes:

```sh
docker compose down -v
```

## Running Frontend Tests

### React Frontend

```sh
docker compose run --rm frontend npm test
```

### Building Frontends

The frontends are automatically built when you start the stack. If you need to rebuild manually:

```sh
# React frontend
docker compose run --rm frontend npm run build

# Ember frontend
docker compose run --rm frontend-ember bash -c 'yarnpkg install && mkdir -p build/js && cp -Rv node_modules/@bower_components build/js/lib && node ./r.js -o ./build.js'
```

## Configuration

The stack uses environment variables that can be set in your shell or `.env` file:

- `COMPOSE_PROJECT_NAME` - Project name (default: `payreq`)
- `STACK_PORT` - Port to expose (default: `80`)

All API requests are proxied to `https://test.payreq.com` via Traefik.

You can create a `.env` file in the project root if you want to override defaults:

```sh
COMPOSE_PROJECT_NAME=payreq
STACK_PORT=80
```
