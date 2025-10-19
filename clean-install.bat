@echo off
REM Clean Install Script for Healthcare Management System (Windows)
REM This script performs a clean install with minimal warnings

echo 🏥 Healthcare Management System - Clean Install
echo ==============================================

REM Navigate to frontend directory
cd frontend

echo 🧹 Cleaning previous installations...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist yarn.lock del yarn.lock

echo 📦 Installing dependencies with minimal warnings...
npm install --no-audit --no-fund --silent

if %errorlevel% equ 0 (
    echo ✅ Installation completed successfully!
    echo.
    echo 🚀 Ready to start development:
    echo    npm run dev
    echo.
    echo 🏗️ Ready to build for production:
    echo    npm run build
) else (
    echo ❌ Installation failed!
    pause
    exit /b 1
)
pause
