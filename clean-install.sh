#!/bin/bash

# Clean Install Script for Healthcare Management System
# This script performs a clean install with minimal warnings

echo "🏥 Healthcare Management System - Clean Install"
echo "=============================================="

# Navigate to frontend directory
cd frontend

echo "🧹 Cleaning previous installations..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

echo "📦 Installing dependencies with minimal warnings..."
npm install --no-audit --no-fund --silent

if [ $? -eq 0 ]; then
    echo "✅ Installation completed successfully!"
    echo ""
    echo "🚀 Ready to start development:"
    echo "   npm run dev"
    echo ""
    echo "🏗️ Ready to build for production:"
    echo "   npm run build"
else
    echo "❌ Installation failed!"
    exit 1
fi
