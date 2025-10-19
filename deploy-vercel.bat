@echo off
REM Healthcare Management System - Vercel Deployment Script for Windows
REM This script helps deploy the healthcare management system to Vercel

echo 🏥 Healthcare Management System - Vercel Deployment
echo ==================================================

REM Check if we're in the right directory
if not exist "frontend\package.json" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo 📦 Installing Vercel CLI...
    npm install -g vercel
)

REM Navigate to frontend directory
cd frontend

echo 🔧 Installing dependencies...
npm install

echo 🏗️ Building the application...
npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful!
) else (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo 🚀 Deploying to Vercel...
vercel --prod

echo 🎉 Deployment complete!
echo Your healthcare management system is now live!
echo.
echo 📱 Demo Features Available:
echo   • Dashboard: Real-time statistics and activity feed
echo   • Patient Management: Search, add, and manage patients
echo   • Visit Logging: Complete visit documentation process
echo   • Mobile Optimized: Works perfectly on tablets and phones
echo.
echo 🔗 Share the demo URL with your stakeholders!
pause
