#!/bin/bash

# Healthcare Management System - Vercel Deployment Script
# This script helps deploy the healthcare management system to Vercel

echo "🏥 Healthcare Management System - Vercel Deployment"
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "frontend/package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Navigate to frontend directory
cd frontend

echo "🔧 Installing dependencies..."
npm install

echo "🏗️ Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🚀 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment complete!"
echo "Your healthcare management system is now live!"
echo ""
echo "📱 Demo Features Available:"
echo "  • Dashboard: Real-time statistics and activity feed"
echo "  • Patient Management: Search, add, and manage patients"
echo "  • Visit Logging: Complete visit documentation process"
echo "  • Mobile Optimized: Works perfectly on tablets and phones"
echo ""
echo "🔗 Share the demo URL with your stakeholders!"
