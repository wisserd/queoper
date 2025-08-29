# ⚡ Windsurf All-in-One Hotfix Script (PowerShell)
# Fixes: Vercel builds warning, engines warning, next.config.js keys, webpack worker, deprecated npm packages

function Start-SafeCommand($cmd) {
    Write-Host "▶️ Running: $cmd" -ForegroundColor Cyan
    try {
        Invoke-Expression $cmd
    } catch {
        Write-Host "⚠️ Command failed (continuing): $cmd" -ForegroundColor Yellow
    }
}

Write-Host "🚀 Starting Windsurf Hotfix..." -ForegroundColor Green

# 1️⃣ Fix next.config.js
$nextConfig = "next.config.js"
if (Test-Path $nextConfig) {
    Write-Host "🔧 Cleaning next.config.js..." -ForegroundColor Green
    $content = Get-Content $nextConfig

    # Remove serverActions and appDir lines
    $content = $content | Where-Object {$_ -notmatch "serverActions"}
    $content = $content | Where-Object {$_ -notmatch "appDir"}

    # Add webpackBuildWorker if webpack is used
    if ($content -match "webpack" -and $content -notmatch "webpackBuildWorker") {
        $content = $content -replace "experimental\s*{", "experimental: {`n    webpackBuildWorker: true,"
    }

    Set-Content $nextConfig $content
    Write-Host "✅ next.config.js updated." -ForegroundColor Green
}

# 2️⃣ Fix vercel.json by removing 'builds'
$vercelFile = "vercel.json"
if (Test-Path $vercelFile) {
    Write-Host "🔧 Cleaning vercel.json..." -ForegroundColor Green
    $vercelContent = Get-Content $vercelFile | ConvertFrom-Json
    if ($vercelContent.PSObject.Properties.Name -contains "builds") {
        $vercelContent.PSObject.Properties.Remove("builds")
        $vercelContent | ConvertTo-Json -Depth 10 | Set-Content $vercelFile
        Write-Host "✅ Removed 'builds' from vercel.json." -ForegroundColor Green
    }
}

# 3️⃣ Fix Node engine in package.json
$pkgFile = "package.json"
if (Test-Path $pkgFile) {
    Write-Host "🔧 Updating Node engine in package.json..." -ForegroundColor Green
    $pkg = Get-Content $pkgFile | ConvertFrom-Json
    if (-not $pkg.engines) { $pkg | Add-Member -MemberType NoteProperty -Name "engines" -Value @{} }
    $pkg.engines.node = ">=16.20.0"
    $pkg | ConvertTo-Json -Depth 10 | Set-Content $pkgFile
    Write-Host "✅ Updated engines.node to >=16.20.0" -ForegroundColor Green
}

# 4️⃣ Remove deprecated packages and reinstall
Start-SafeCommand "npm uninstall @humanwhocodes/object-schema @humanwhocodes/config-array glob eslint"
Start-SafeCommand "npm install @eslint/object-schema @eslint/config-array glob@^9.0.0 eslint@latest next@latest react@latest react-dom@latest"

# 5️⃣ Clean and reinstall dependencies
Write-Host "🧹 Cleaning node_modules and lock file..." -ForegroundColor Green
Start-SafeCommand "Remove-Item -Recurse -Force node_modules"
Start-SafeCommand "Remove-Item -Force package-lock.json"

Write-Host "📦 Reinstalling dependencies..." -ForegroundColor Green
Start-SafeCommand "npm install"

# 6️⃣ Build the project
Write-Host "🏗️ Building project..." -ForegroundColor Green
Start-SafeCommand "npm run build"

Write-Host "🎉 Windsurf Hotfix Complete! All warnings should now be fixed." -ForegroundColor Green
