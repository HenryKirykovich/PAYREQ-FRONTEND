# Payreq Frontend — Capstone Project

> **Bellevue College — Capstone I & II (Spring 2026)**
> Team: Henry Kirykovich, Gunhee Kim, Eyob Worku, Diep Huynh, Brandon Galli
> Sponsor: Andrew Stein (Payreq Pty Ltd)
> Advisor: Stephane LABRUYERE

---

## About This Project

This repository is the result of a **Capstone I & II software engineering project** at Bellevue College, completed in collaboration with our industry sponsor **Payreq Pty Ltd** (Australia).

### Project Goal

Payreq is a B2B billing and payments platform used by property managers, accountants, and enterprises across Australia. The existing frontend was built in **EmberJS** — an aging framework that is costly to maintain and difficult to extend. The sponsor's requirement was to **migrate the entire customer-facing frontend from EmberJS to React**, screen by screen, while maintaining full feature parity, i18n support (English/French), and visual consistency.

### What Was Built

- **66 screens** identified for migration from Ember to React
- **~43 screens fully migrated** as of project completion (~65% complete)
- Full routing architecture using React Router v5 with flat route structure
- i18n support via `react-intl` (English AU + French)
- Docker-based local development environment (React + Ember + Traefik proxy)
- CI/CD pipeline via Bitbucket Pipelines
- Per-screen pull requests with code review on every change
- Complete migration documentation and specification tracking

### Key Screens Migrated (Henry Kirykovich)

- **Connections Settings** — Xero, MYOB, Reckon Accounts Hosted, PropertyMe integrations
- **Account Permissions** — user management and permission settings
- **Import MyBills Registrations** — bulk import flow

### Development Approach

> **This project was developed entirely with AI-assisted coding using GitHub Copilot (Claude Sonnet) as a pair programmer.**

All implementation, code review analysis, bug investigation, PR creation, pipeline monitoring, and merge conflict resolution was performed with AI assistance. This demonstrates a modern engineering workflow where AI tools accelerate development while the developer maintains full ownership and understanding of the codebase.

### Sponsor Requirements Met

- ✅ React migration with Ember fallback via Traefik routing
- ✅ Visual parity with existing Ember UI (accordion layouts, Bootstrap 3 components)
- ✅ Internationalization (en-AU / fr) maintained across all migrated screens
- ✅ Modular per-provider architecture for Connections (Xero, MYOB, Reckon, PropertyMe)
- ✅ CI/CD pipeline with automated build and test on every PR
- ✅ Full code review process on Bitbucket with documented merge history

---

## Technical Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 16.12, React Router v5 |
| Legacy Frontend | EmberJS (being replaced) |
| Styling | Bootstrap 3, CSS Modules |
| i18n | react-intl |
| Forms | Formik |
| HTTP | axios |
| Proxy | Traefik |
| CI/CD | Bitbucket Pipelines |
| Container | Docker Compose |

---

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
