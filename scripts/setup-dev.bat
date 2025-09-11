@echo off
REM FOSSologyUI Development Environment Setup Script for Windows
REM Copyright (C) 2025 FOSSology Contributors
REM SPDX-License-Identifier: GPL-2.0-only

echo FOSSologyUI Development Environment Setup
echo ========================================

REM Set default platform for compatibility
set DOCKER_PLATFORM=linux/amd64
echo Setting DOCKER_PLATFORM to %DOCKER_PLATFORM%

REM Check if .env file exists, if not copy from sample
if not exist ".env" (
    echo Creating .env file from .env.sample...
    copy .env.sample .env
    echo DOCKER_PLATFORM=%DOCKER_PLATFORM% >> .env
    echo Updated .env file with DOCKER_PLATFORM=%DOCKER_PLATFORM%
) else (
    echo .env file already exists. Please check that DOCKER_PLATFORM is set appropriately.
)

echo.
echo Starting development environment...
echo Running: docker-compose -f docker-compose.dev.yml pull fossology_server

REM Pull the latest fossology server image
docker-compose -f docker-compose.dev.yml pull fossology_server

echo Running: docker-compose -f docker-compose.dev.yml up
echo.
echo The development server will be available at http://localhost:3000
echo FOSSology server will be available at http://localhost:8081
echo.

REM Start the development environment
docker-compose -f docker-compose.dev.yml up
