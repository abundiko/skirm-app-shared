# FIRST OF ALL: navigates to the root folder/shared

git init

git add .

git commit -m "first commit"

git branch -M main

git remote add origin "https://github.com/abundiko/skirm-app-shared.git"

git fetch origin
git reset --hard origin/main

rm -rf .git
rmdir /s /q .git
