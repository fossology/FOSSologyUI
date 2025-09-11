#!/bin/bash

# FOSSologyUI Development Environment Setup Script
# Copyright (C) 2025 FOSSology Contributors
# SPDX-License-Identifier: GPL-2.0-only

# Script to automatically detect architecture and set up development environment

set -e

echo "FOSSologyUI Development Environment Setup"
echo "========================================"

# Detect architecture
ARCH=$(uname -m)
echo "Detected architecture: $ARCH"

# Set default platform based on architecture
if [[ "$ARCH" == "arm64" ]]; then
    echo "Apple Silicon (ARM64) detected. Setting platform to linux/amd64 for compatibility."
    export DOCKER_PLATFORM="linux/amd64"
elif [[ "$ARCH" == "x86_64" ]]; then
    echo "x86_64 architecture detected. Using native platform."
    export DOCKER_PLATFORM="linux/amd64"
else
    echo "Unknown architecture: $ARCH. Using default platform linux/amd64."
    export DOCKER_PLATFORM="linux/amd64"
fi

# Check if .env file exists, if not copy from sample
if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.sample..."
    cp .env.sample .env
    
    # Add or update DOCKER_PLATFORM in .env file
    if grep -q "DOCKER_PLATFORM" .env; then
        sed -i.bak "s/^DOCKER_PLATFORM=.*/DOCKER_PLATFORM=$DOCKER_PLATFORM/" .env && rm .env.bak
    else
        echo "DOCKER_PLATFORM=$DOCKER_PLATFORM" >> .env
    fi
    echo "Updated .env file with DOCKER_PLATFORM=$DOCKER_PLATFORM"
else
    echo ".env file already exists. Please check that DOCKER_PLATFORM is set appropriately."
fi

echo ""
echo "Starting development environment..."
echo "Running: docker-compose -f docker-compose.dev.yml pull fossology_server"

# Pull the latest fossology server image
docker-compose -f docker-compose.dev.yml pull fossology_server

echo "Running: docker-compose -f docker-compose.dev.yml up"
echo ""
echo "The development server will be available at http://localhost:3000"
echo "FOSSology server will be available at http://localhost:8081"
echo ""

# Start the development environment
docker-compose -f docker-compose.dev.yml up
