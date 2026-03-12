#!/bin/bash
# Unix/Linux/Mac startup script for Kisan Sathi backend

echo "========================================"
echo "KISAN SATHI BACKEND STARTUP SCRIPT"
echo "========================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 not found. Please install Python 3.9+"
    exit 1
fi

echo "[1/5] Checking Python version..."
python3 --version

echo ""
echo "[2/5] Installing/upgrading dependencies..."
pip3 install -r requirements.txt --quiet
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo ""
echo "[3/5] Testing database connection..."
python3 test_setup.py

echo ""
echo "[4/5] Checking environment variables..."
if [ ! -f ".env" ]; then
    echo "WARNING: .env file not found"
    echo "Creating default .env file..."
    cat > .env << EOF
DATABASE_URL=postgresql+asyncpg://user:Atharv@01112005@localhost:5432/kisan_sathi
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
EOF
    echo "Created .env file. Please update DATABASE_URL if needed."
fi

echo ""
echo "[5/5] Starting FastAPI server..."
echo ""
echo "===== SERVER STARTING ====="
echo "Backend will be available at: http://localhost:8000"
echo "API Documentation: http://localhost:8000/docs"
echo "ReDoc Documentation: http://localhost:8000/redoc"
echo ""
echo "Press CTRL+C to stop the server"
echo "========================================"
echo ""

python3 -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
