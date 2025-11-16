# Quick Setup Script for Backend Environment
# Run this script to create .env file from .env.example

Write-Host "Setting up Roomeze Backend Environment..." -ForegroundColor Green

# Check if .env already exists
if (Test-Path ".env") {
    $response = Read-Host ".env file already exists. Overwrite? (y/n)"
    if ($response -ne "y") {
        Write-Host "Setup cancelled." -ForegroundColor Yellow
        exit
    }
}

# Copy .env.example to .env
Copy-Item ".env.example" ".env"

Write-Host "✓ Created .env file from .env.example" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT: Please edit .env file and update the following:" -ForegroundColor Yellow
Write-Host "  - MONGODB_URI (if different)" -ForegroundColor Cyan
Write-Host "  - JWT_SECRET (use a strong secret in production)" -ForegroundColor Cyan
Write-Host "  - FRONTEND_URL (your actual frontend URL)" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the server:" -ForegroundColor Green
Write-Host "  npm run dev   (development mode)" -ForegroundColor White
Write-Host "  npm start     (production mode)" -ForegroundColor White
Write-Host ""
