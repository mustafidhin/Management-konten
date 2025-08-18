#!/bin/bash

echo "🚀 Starting AI Content Manager..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install backend dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

# Install frontend dependencies if node_modules doesn't exist
if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd client
    npm install
    cd ..
fi

# Create uploads directory if it doesn't exist
if [ ! -d "uploads" ]; then
    echo "📁 Creating uploads directory..."
    mkdir uploads
fi

# Start backend server in background
echo "🔧 Starting backend server..."
npm start &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend development server
echo "🎨 Starting frontend development server..."
cd client
npm start &
FRONTEND_PID=$!

# Function to cleanup on exit
cleanup() {
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

echo "✅ AI Content Manager is starting up!"
echo "📱 Frontend will be available at: http://localhost:3000"
echo "🔧 Backend API will be available at: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop the servers"

# Wait for both processes
wait