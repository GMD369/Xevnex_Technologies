# Deployment Script for PowerShell
# Run this before deploying to ensure everything is ready

Write-Host "🚀 Preparing for Render Deployment..." -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path .git)) {
    Write-Host "❌ Git repository not initialized!" -ForegroundColor Red
    Write-Host "Run: git init" -ForegroundColor Yellow
    exit 1
}

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host "⚠️  Warning: .env file not found" -ForegroundColor Yellow
    Write-Host "Make sure to set DATABASE_URL in Render dashboard" -ForegroundColor Yellow
} else {
    Write-Host "✅ .env file exists" -ForegroundColor Green
}

# Check if node_modules exists
if (-not (Test-Path node_modules)) {
    Write-Host "❌ Dependencies not installed!" -ForegroundColor Red
    Write-Host "Run: npm install" -ForegroundColor Yellow
    exit 1
} else {
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
}

# Test build locally
Write-Host ""
Write-Host "🔨 Testing build..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Fix errors before deploying." -ForegroundColor Red
    exit 1
} else {
    Write-Host "✅ Build successful" -ForegroundColor Green
}

# Check git status
Write-Host ""
Write-Host "📋 Git Status:" -ForegroundColor Cyan
git status --short

$uncommitted = git status --short
if ($uncommitted) {
    Write-Host ""
    Write-Host "⚠️  You have uncommitted changes" -ForegroundColor Yellow
    $commit = Read-Host "Do you want to commit them now? (y/n)"
    
    if ($commit -eq "y") {
        $message = Read-Host "Enter commit message"
        git add .
        git commit -m "$message"
        Write-Host "✅ Changes committed" -ForegroundColor Green
    }
}

# Offer to push
Write-Host ""
$push = Read-Host "Push to GitHub now? (y/n)"
if ($push -eq "y") {
    Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
    git push
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Successfully pushed to GitHub" -ForegroundColor Green
        Write-Host ""
        Write-Host "🎉 Ready for Render deployment!" -ForegroundColor Green
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Go to https://dashboard.render.com" -ForegroundColor White
        Write-Host "2. Create PostgreSQL database" -ForegroundColor White
        Write-Host "3. Create Web Service and connect your repo" -ForegroundColor White
        Write-Host "4. Set environment variables" -ForegroundColor White
        Write-Host ""
        Write-Host "See RENDER_DEPLOYMENT_GUIDE.md for detailed instructions" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Push failed!" -ForegroundColor Red
        Write-Host "Check your git remote and credentials" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Done! ✨" -ForegroundColor Green
