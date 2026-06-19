#!/bin/bash

echo "🚀 Prodigy EMS - Quick Setup Script"
echo "===================================="

# Backend Setup
echo ""
echo "📦 Setting up BACKEND..."
cd server

if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file - please update DATABASE_URL"
fi

echo "Installing dependencies..."
npm install

echo "Generating Prisma client..."
npm run prisma generate

echo "Running migrations..."
npm run migrate

echo "Seeding database (optional)..."
read -p "Do you want to seed test data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run seed
fi

# Frontend Setup
echo ""
echo "📦 Setting up FRONTEND..."
cd ../client

if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local file"
fi

echo "Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Backend:  cd server && npm run dev"
echo "2. Frontend: cd client && npm run dev"
echo ""
echo "Login with:"
echo "Email: admin@example.com"
echo "Password: password123"
