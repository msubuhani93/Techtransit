@echo off
echo ========================================
echo Tech Transit Portal - Quick Deploy
echo ========================================
echo.

echo Step 1: Building production version...
call npm run build

if %errorlevel% neq 0 (
    echo Build failed! Please check errors above.
    pause
    exit /b 1
)

echo.
echo Build successful! Files are in the 'dist' folder.
echo.
echo Choose deployment option:
echo 1. Deploy to Vercel (Recommended - Free, Easy)
echo 2. Deploy to Netlify (Free, Easy)
echo 3. Run local server for team access
echo 4. Just show deployment instructions
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo Deploying to Vercel...
    call npm install -g vercel
    call vercel
) else if "%choice%"=="2" (
    echo.
    echo Deploying to Netlify...
    call npm install -g netlify-cli
    call netlify deploy --prod --dir=dist
) else if "%choice%"=="3" (
    echo.
    echo Starting local server...
    echo.
    echo Install Express: npm install express
    echo Then run: npm run serve
    echo.
    echo Your server will be available at:
    echo   - Local: http://localhost:3000
    echo   - Network: http://YOUR_IP:3000
    echo.
    echo To find your IP, run: ipconfig
    echo.
    pause
) else if "%choice%"=="4" (
    echo.
    echo ========================================
    echo Deployment Instructions
    echo ========================================
    echo.
    echo Option 1 - Vercel (Easiest):
    echo   1. npm install -g vercel
    echo   2. vercel
    echo   3. Follow prompts
    echo   4. Share the URL with your team!
    echo.
    echo Option 2 - Netlify:
    echo   1. npm install -g netlify-cli
    echo   2. netlify deploy --prod --dir=dist
    echo   3. Follow prompts
    echo   4. Share the URL with your team!
    echo.
    echo Option 3 - Internal Server:
    echo   1. npm install express
    echo   2. npm run serve
    echo   3. Share your IP:3000 with team
    echo.
    echo See DEPLOYMENT.md for more details!
    echo.
    pause
) else (
    echo Invalid choice!
    pause
    exit /b 1
)

echo.
echo Deployment complete! Share the URL with your team members.
pause
