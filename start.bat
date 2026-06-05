@echo off
title JEEVA - Launching All Services
echo =======================================================================
echo              🏥 Welcome to JEEVA Setup & Start Script 🏥
echo =======================================================================
echo.
echo This script will check your prerequisites, install dependencies if missing,
echo and launch all three microservices in separate windows.
echo.

:: 1. Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [❌ ERROR] Node.js is not installed or not in PATH.
    echo Please download and install Node.js from: https://nodejs.org/
    pause
    exit /b 1
) else (
    echo [✓] Node.js is installed.
)

:: 2. Check for Python
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [❌ ERROR] Python is not installed or not in PATH.
    echo Please download and install Python from: https://www.python.org/
    pause
    exit /b 1
) else (
    echo [✓] Python is installed.
)

:: 3. Check for MongoDB (we can check if port 27017 is listening)
netstat -ano | findstr :27017 >nul 2>nul
if %errorlevel% neq 0 (
    echo [⚠️ WARNING] MongoDB does not seem to be running on port 27017.
    echo Attempting to start MongoDB service if it exists...
    net start MongoDB >nul 2>nul
    timeout /t 2 >nul
    netstat -ano | findstr :27017 >nul 2>nul
    if %errorlevel% neq 0 (
        echo [❌ ERROR] MongoDB could not be started automatically.
        echo Please ensure MongoDB Community Server is installed and running.
        echo Download from: https://www.mongodb.com/try/download/community
        pause
        exit /b 1
    ) else (
        echo [✓] MongoDB Service started successfully!
    )
) else (
    echo [✓] MongoDB is running on port 27017.
)

echo.
echo =======================================================================
echo       📦 Step 1: Installing / Verifying Package Dependencies
echo =======================================================================
echo.

:: Root Node Modules
echo [1/4] Checking root dependencies...
if not exist "node_modules\" (
    echo node_modules not found in root folder. Running 'npm install' in root...
    call npm install
) else (
    echo [✓] Root dependencies are already installed.
)

:: Backend Node Modules
echo.
echo [2/4] Checking backend dependencies...
if not exist "backend\node_modules\" (
    echo node_modules not found in backend folder. Running 'npm install' in backend...
    cd backend
    call npm install
    cd ..
) else (
    echo [✓] Backend dependencies are already installed.
)

:: Frontend Node Modules
echo.
echo [3/4] Checking frontend dependencies...
if not exist "frontend\jeeva-frontend\node_modules\" (
    echo node_modules not found in frontend folder. Running 'npm install' in frontend...
    cd frontend\jeeva-frontend
    call npm install
    cd ..\..
) else (
    echo [✓] Frontend dependencies are already installed.
)

:: Python Packages
echo.
echo [4/4] Checking Python dependencies...
python -c "import flask, flask_cors, numpy, sklearn, joblib, pandas" >nul 2>nul
if %errorlevel% neq 0 (
    echo Python dependencies missing. Installing requirements...
    cd ml-service\jeeva-ml
    echo Installing via pip...
    pip install -r requirements.txt
    if %errorlevel% neq 0 (
        echo [⚠️ WARNING] pip install failed. If you are in MSYS2/UCRT64, please run:
        echo pacman -S mingw-w64-ucrt-x86_64-python-numpy mingw-w64-ucrt-x86_64-python-scikit-learn mingw-w64-ucrt-x86_64-python-pandas mingw-w64-ucrt-x86_64-python-flask megw-w64-ucrt-x86_64-python-flask-cors
    )
    cd ..\..
) else (
    echo [✓] Python ML dependencies are already installed.
)

echo.
echo =======================================================================
echo             🚀 Step 2: Spawning Services in Parallel Windows
echo =======================================================================
echo.

:: Start ML Engine
echo Starting Python Flask ML Service on Port 5000...
start "JEEVA - ML Prediction Engine" cmd /k "cd ml-service\jeeva-ml && echo Starting Python ML Service... && python app.py"
timeout /t 2 >nul

:: Start Express API Backend
echo Starting Node.js Express API Backend on Port 4000...
start "JEEVA - Express API Backend" cmd /k "cd backend && echo Starting Express API Backend... && node server.js"
timeout /t 2 >nul

:: Start React Vite Frontend
echo Starting React Vite Frontend on Port 5173...
start "JEEVA - React Vite Frontend" cmd /k "cd frontend\jeeva-frontend && echo Starting React Frontend... && npx vite --port 5173 --strictPort"

echo.
echo =======================================================================
echo               🎉 Success! All Services Initiated 🎉
echo =======================================================================
echo.
echo 🌐 Open your browser and navigate to: http://localhost:5173
echo 🧠 AI ML Service: http://localhost:5000
echo ⚙️ Backend API: http://localhost:4000
echo.
echo (Press any key to close this window. Other windows will remain open.)
pause >nul
