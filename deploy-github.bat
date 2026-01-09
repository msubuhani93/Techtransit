@echo off
echo ========================================
echo Tech Transit Portal - GitHub Pages Deploy
echo ========================================
echo.

echo Step 1: Checking Git repository...
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo Git repository not found!
    echo.
    echo Please initialize Git first:
    echo   1. git init
    echo   2. git add .
    echo   3. git commit -m "Initial commit"
    echo   4. Create repository on GitHub
    echo   5. git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
    echo   6. git push -u origin main
    echo.
    pause
    exit /b 1
)

echo Git repository found!
echo.

echo Step 2: Building production version...
call npm run build

if %errorlevel% neq 0 (
    echo Build failed! Please check errors above.
    pause
    exit /b 1
)

echo.
echo Build successful!
echo.

echo Step 3: Deploying to GitHub Pages...
call npm run deploy

if %errorlevel% neq 0 (
    echo Deployment failed! Please check errors above.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Deployment Successful!
echo ========================================
echo.
echo Next steps:
echo 1. Go to your GitHub repository
echo 2. Settings ^> Pages
echo 3. Select branch: gh-pages
echo 4. Select folder: / (root)
echo 5. Save
echo.
echo Your app will be available at:
echo   https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
echo.
echo Share this URL with your team members!
echo.
pause
