@echo off
REM Prodigy EMS - Quick Setup Script for Windows

echo.
echo 🚀 Prodigy EMS - Quick Setup Script
echo ====================================

REM Backend Setup
echo.
echo 📦 Setting up BACKEND...
cd server

if not exist .env (
    copy .env.example .env
    echo ✅ Created .env file - please update DATABASE_URL
)

echo Installing dependencies...
call npm install

echo Generating Prisma client...
call npm run prisma generate

echo Running migrations...
call npm run migrate

set /p SEED="Do you want to seed test data? (y/n): "
if /i "%SEED%"=="y" (
    call npm run seed
)

REM Frontend Setup
echo.
echo 📦 Setting up FRONTEND...
cd ..\client

if not exist .env.local (
    copy .env.example .env.local
    echo ✅ Created .env.local file
)

echo Installing dependencies...
call npm install

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Backend:  cd server ^&^& npm run dev
echo 2. Frontend: cd client ^&^& npm run dev
echo.
echo Login with:
echo Email: admin@example.com
echo Password: password123
echo.
pause
