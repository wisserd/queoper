# setup-env.ps1
$envFile = ".env.local"
$exampleFile = ".env.example"

# Create .env.local if it doesn't exist
if (-not (Test-Path $envFile)) {
    if (Test-Path $exampleFile) {
        Copy-Item $exampleFile -Destination $envFile
        Write-Host "Created $envFile from $exampleFile" -ForegroundColor Green
    } else {
        # Create a basic .env.local with required variables
        @"
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/queoper?schema=public"

# NextAuth
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Stripe
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""

# Cloudinary
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Email (SMTP)
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER=""
SMTP_PASSWORD=""
SMTP_FROM="noreply@queoper.com"

# App Settings
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Queoper"
NODE_ENV="development"
"@ | Out-File -FilePath $envFile -Encoding utf8
        Write-Host "Created new $envFile with default values" -ForegroundColor Green
    }
} else {
    Write-Host "$envFile already exists" -ForegroundColor Yellow
}

# Install dependencies
Write-Host "`nInstalling dependencies..." -ForegroundColor Cyan
npm install

# Initialize Git if not already done
if (-not (Test-Path ".git")) {
    Write-Host "`nInitializing Git repository..." -ForegroundColor Cyan
    git init
    git add .
    git commit -m "Initial commit"
}

# Check for GitHub remote
$remoteUrl = git config --get remote.origin.url
if (-not $remoteUrl) {
    Write-Host "`nAdding GitHub remote..." -ForegroundColor Cyan
    git remote add origin https://github.com/wisserd/queoper.git
    $remoteUrl = git config --get remote.origin.url
}
Write-Host "GitHub remote: $remoteUrl" -ForegroundColor Green

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "1. Update .env.local with your configuration" -ForegroundColor Yellow
Write-Host "2. Run: npm run dev" -ForegroundColor Yellow
Write-Host "3. Push to GitHub: git push -u origin main" -ForegroundColor Yellow
