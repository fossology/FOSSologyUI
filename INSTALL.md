# Installation Guide

This guide covers different installation methods for FOSSology UI.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v18 or higher)
- [pnpm](https://pnpm.io/installation)
- For Docker installations: [Docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/install/)

## Installation Methods

### Method 1: Docker Development (Recommended)

#### Quick Start

```bash
docker-compose -f docker-compose.dev.yml pull fossology_server
docker-compose -f docker-compose.dev.yml up
```

This starts the development server on `http://localhost:3000` with:
- Username: `fossy`
- Password: `fossy`

#### Development Workflow

**Run in background:**
```bash
docker-compose -f docker-compose.dev.yml up -d
docker-compose logs  # View logs
```

**Install npm packages:**
```bash
docker-compose -f docker-compose.dev.yml exec -w /usr/src/fossologyui fossologyui_server pnpm add <package-name>
```

**Clean up:**
```bash
docker-compose -f docker-compose.dev.yml down
```

### Method 2: Docker Production

#### Build and Run

```bash
# Build the image
docker build \
  -t fossologyui:latest \
  --build-arg REACT_APP_SERVER_URL="localhost/repo/api/v2" \
  --build-arg REACT_APP_HTTPS="false" .

# Run the container
docker run -p 3000:3000 fossologyui:latest
```

#### Using docker-compose

```bash
docker-compose up
```

Access at `http://localhost:3000` with username `fossy` and password `fossy`.

### Method 3: Local Development

#### Setup

1. **Environment Configuration**
   ```bash
   cp .env.sample .env
   # Edit .env with your configuration
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Start Development Server**
   ```bash
   pnpm run dev
   ```

   The app will be available at `http://localhost:3000`.

#### Production Build

```bash
pnpm build
```

It correctly bundles NextJS in production mode and optimizes the build for the best performance.
 
The build is minified and the filenames include the hashes. Your app is ready to be deployed!
See the section about [deployment](https://nextjs.org/docs/14/app/building-your-application/deploying) for more information.

## Configuration

### Environment Variables

Key environment variables to configure in your `.env` file:

- `REACT_APP_SERVER_URL`: Backend API URL
- `REACT_APP_HTTPS`: Use HTTPS (true/false)
- Additional variables as defined in `.env.sample`

### Port Configuration

- Default port: `3000`
- To change port, modify the port in your docker-compose file or use:
  ```bash
  pnpm run dev -- -p <port>
  ```



### Getting Help

- Check the [FOSSology documentation](https://www.fossology.org)
- Join the [Slack channel](https://join.slack.com/t/fossology/shared_invite/enQtNzI0OTEzMTk0MjYzLTYyZWQxNDc0N2JiZGU2YmI3YmI1NjE4NDVjOGYxMTVjNGY3Y2MzZmM1OGZmMWI5NTRjMzJlNjExZGU2N2I5NGY)
- Visit the [GitHub discussions](https://github.com/fossology/fossology/discussions)
