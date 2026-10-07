#!/bin/bash

ARCH=$(uname -m)

if [ "$ARCH" = "arm64" ] || [ "$ARCH" = "aarch64" ]; then
  echo "Detected Apple Silicon ARM64 — enabling amd64 emulation..."
  export DOCKER_PLATFORM="linux/amd64"
else
  echo "Detected x86_64 architecture."
fi

docker-compose -f docker-compose.dev.yml pull fossology_server
docker-compose -f docker-compose.dev.yml up