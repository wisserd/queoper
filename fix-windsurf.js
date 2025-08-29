#!/usr/bin/env node
/**
 * ⚡ Windsurf All-in-One Hotfix Script (Node.js)
 * Fixes: Vercel builds warning, engines warning, next.config.js keys, webpack worker
 */

const fs = require('fs');
const path = require('path');

console.log("🚀 Starting Windsurf Hotfix...");

// Utility to safely update JSON files
function updateJSON(filePath, updater) {
  if (!fs.existsSync(filePath)) return;
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  const newData = updater(data);
  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
  console.log(`✅ Updated ${filePath}`);
}

// 1️⃣ Clean next.config.js
const nextConfigPath = path.join(process.cwd(), 'next.config.js');
if (fs.existsSync(nextConfigPath)) {
  let content = fs.readFileSync(nextConfigPath, 'utf8');
  let changed = false;

  // Remove serverActions and appDir
  if (/serverActions/.test(content)) {
    content = content.replace(/.*serverActions.*\n?/g, '');
    changed = true;
  }
  if (/appDir/.test(content)) {
    content = content.replace(/.*appDir.*\n?/g, '');
    changed = true;
  }

  // Add webpackBuildWorker if using custom webpack
  if (/webpack/.test(content) && !/webpackBuildWorker/.test(content)) {
    content = content.replace(/experimental:\s*{/, `experimental: {\n    webpackBuildWorker: true,`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(nextConfigPath, content, 'utf8');
    console.log('✅ Cleaned next.config.js');
  } else {
    console.log('ℹ️ No changes needed for next.config.js');
  }
}

// 2️⃣ Remove "builds" from vercel.json
const vercelPath = path.join(process.cwd(), 'vercel.json');
updateJSON(vercelPath, (data) => {
  if (data.builds) {
    delete data.builds;
    console.log('✅ Removed "builds" key from vercel.json');
  }
  return data;
});

// 3️⃣ Fix engines in package.json
const pkgPath = path.join(process.cwd(), 'package.json');
updateJSON(pkgPath, (pkg) => {
  if (!pkg.engines) pkg.engines = {};
  pkg.engines.node = ">=16.20.0";
  console.log('✅ Updated Node engine version in package.json');
  return pkg;
});

// 4️⃣ Run npm commands
const { execSync } = require('child_process');

function run(cmd) {
  console.log(`\n▶️ Running: ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

// Remove old deps, reinstall, rebuild
run('npm uninstall @humanwhocodes/object-schema @humanwhocodes/config-array glob eslint || true');
run('npm install @eslint/object-schema @eslint/config-array glob@^9.0.0 eslint@latest next@latest react@latest react-dom@latest');
run('rm -rf node_modules package-lock.json || true');
run('npm install');
run('npm run build');

console.log("\n🎉 Windsurf Hotfix Completed! All warnings should be resolved.");
