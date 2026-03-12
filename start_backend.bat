@echo off
REM Windows batch script to start Kisan Sathi backend with proper setup

echo ========================================
echo KISAN SATHI BACKEND STARTUP SCRIPT
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found. Please install Python 3.9+
    pause
    exit /b 1
)

echo [1/5] Checking Python version...
python --version

echo.
echo [2/5] Installing/upgrading dependencies...
pip install -r requirements.txt --quiet
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [3/5] Testing database connection...
python test_setup.py

echo.
echo [4/5] Checking environment variables...
if not exist ".env" (
    echo WARNING: .env file not found
    echo Creating default .env file...
    (
        echo DATABASE_URL=postgresql+asyncpg://user:Atharv@01112005@localhost:5432/kisan_sathi
        echo SECRET_KEY=your-secret-key-change-in-production
        echo ALGORITHM=HS256
    ) > .env
    echo Created .env file. Please update DATABASE_URL if needed.
)

echo.
echo [5/5] Starting FastAPI server...
echo.
echo ===== SERVER STARTING =====
echo Backend will be available at: http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo ReDoc Documentation: http://localhost:8000/redoc
echo.
echo Press CTRL+C to stop the server
echo ========================================
echo.

python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

pause
