#!/usr/bin/env bash
# One-shot helper to push this project to a new GitHub repo.
# Usage: ./push-to-github.sh https://github.com/YOUR_USERNAME/redstone-studios.git
set -e
if [ -z "$1" ]; then
  echo "Usage: ./push-to-github.sh <github-repo-url>"
  echo "First create an EMPTY repo on github.com (no README), then paste its URL here."
  exit 1
fi
git init
git add .
git commit -m "Redstone Studios website — Vite + React + Tailwind + Framer Motion"
git branch -M main
git remote add origin "$1"
git push -u origin main
echo ""
echo "Done. Next: import the repo at https://vercel.com/new to deploy."
