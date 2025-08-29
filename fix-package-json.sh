chmod +x fix-package-json.sh
./fix-package-json.sh
git add package.json
git commit -m "Fix package.json"
git push origin main
