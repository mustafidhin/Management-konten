#!/bin/bash

echo "🎉 Welcome to AI Content Manager Demo!"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

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

echo ""
echo "🚀 Starting AI Content Manager with Demo Data..."
echo ""

# Start the application
npm run dev

echo ""
echo "🎯 Demo Features Available:"
echo "   📊 Dashboard with demo statistics"
echo "   📱 Content management with sample content"
echo "   🤖 AI caption generator with platform optimization"
echo "   📈 Analytics with demo charts"
echo "   🔧 Platform algorithm analysis"
echo ""
echo "🌐 Access the application at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000"
echo ""
echo "📚 Documentation: README.md"
echo "🆘 For help: CONTRIBUTING.md"
echo ""
echo "Press Ctrl+C to stop the servers"