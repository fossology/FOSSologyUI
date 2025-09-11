# Apple Silicon (ARM64) Setup Guide

This guide provides specific instructions for setting up FOSSologyUI on Apple Silicon Macs (M1, M2, M3, etc.).

## Issue Description

Apple Silicon Macs use ARM64 architecture, but the FOSSology server Docker image is primarily built for x86_64 (AMD64) architecture. This causes compatibility issues when running the development environment.

## Solutions

### Option 1: Automated Setup (Recommended)

Use the provided setup script that automatically detects your architecture:

```bash
./scripts/setup-dev.sh
```

This script will:
- Detect your Apple Silicon architecture
- Set the appropriate Docker platform
- Create/update your `.env` file
- Start the development environment

### Option 2: Manual Environment Variable

Set the Docker platform environment variable before running Docker Compose:

```bash
export DOCKER_PLATFORM=linux/amd64
docker-compose -f docker-compose.dev.yml pull fossology_server
docker-compose -f docker-compose.dev.yml up
```

### Option 3: Update .env File

1. Copy the environment template:
   ```bash
   cp .env.sample .env
   ```

2. Add or update the following line in your `.env` file:
   ```bash
   DOCKER_PLATFORM=linux/amd64
   ```

3. Run the development environment:
   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

## Troubleshooting

### Architecture Compatibility Errors

If you see errors related to architecture compatibility:

1. Ensure Docker Desktop is running and up-to-date
2. Clear Docker cache:
   ```bash
   docker system prune -a
   ```
3. Re-pull the fossology image:
   ```bash
   DOCKER_PLATFORM=linux/amd64 docker-compose -f docker-compose.dev.yml pull fossology_server
   ```

### Performance Considerations

Running x86_64 containers on Apple Silicon uses emulation (Rosetta 2), which may result in:
- Slightly slower performance compared to native ARM64 containers
- Higher memory usage
- Increased battery consumption

This is a temporary solution until native ARM64 FOSSology images are available.

## Alternative Approaches

### Native Development (Without Docker)

If you prefer not to use Docker emulation, you can set up the development environment natively:

1. Install Node.js and pnpm directly on macOS
2. Run only the UI development server:
   ```bash
   pnpm install
   pnpm run dev
   ```
3. Connect to a remote FOSSology server or use a different backend setup

## Support

If you continue to experience issues:

1. Check the [main troubleshooting section](README.md#troubleshooting) in the README
2. Report issues on [GitHub](https://github.com/fossology/FOSSologyUI/issues)
3. Join the [FOSSology Slack](https://join.slack.com/t/fossology/shared_invite/enQtNzI0OTEzMTk0MjYzLTYyZWQxNDc0N2JiZGU2YmI3YmI1NjE4NDVjOGYxMTVjNGY3Y2MzZmM1OGZmMWI5NTRjMzJlNjExZGU2N2I5NGY) for community support
