# FIRST OF ALL: navigates to the root folder/shared

git init

git add .

git commit -m "new commit"

git branch -M main

git remote add origin "https://github.com/abundiko/skirm-app-shared.git"

git push origin main --force

rm -rf .git
rmdir /s /q .git