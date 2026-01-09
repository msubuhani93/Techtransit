# Complete GitHub Pages Setup Guide

## Prerequisites

### Step 1: Install Git (if not installed)

1. Download Git for Windows: https://git-scm.com/download/win
2. Install with default settings
3. Restart your terminal/PowerShell after installation

### Step 2: Create GitHub Account (if needed)

1. Go to https://github.com
2. Sign up for a free account
3. Verify your email

---

## Deployment Steps

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `tech-transit-portal` (or any name)
3. Description: "Tech Transit Portal - Project Cutover Management Dashboard"
4. Choose: **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **Create repository**

### Step 2: Update Base Path in vite.config.js

**IMPORTANT:** Update the base path to match your repository name!

1. Open `vite.config.js`
2. Find this line:
   ```js
   const base = process.env.NODE_ENV === 'production' ? '/tech-transit-portal/' : '/'
   ```
3. Replace `tech-transit-portal` with your actual repository name
4. Save the file

**Example:**
- If your repo is `my-project`, change to: `'/my-project/'`
- If your repo is `tech-transit`, change to: `'/tech-transit/'`

### Step 3: Initialize Git and Push to GitHub

Open PowerShell or Command Prompt in the project folder and run:

```bash
# Navigate to project
cd C:\Users\msubuhani\Documents\Swift\Cursor\dashboard\TechTransit

# Initialize Git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Tech Transit Portal"

# Add GitHub remote (REPLACE WITH YOUR USERNAME AND REPO NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**Replace:**
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO_NAME` with your repository name

### Step 4: Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
- Build the production version
- Create/update the `gh-pages` branch
- Push to GitHub

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`
2. Click **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**:
   - Branch: Select `gh-pages`
   - Folder: Select `/ (root)`
5. Click **Save**

### Step 6: Access Your App

Wait 1-2 minutes, then visit:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

**Example:**
- Username: `john-doe`
- Repo: `tech-transit-portal`
- URL: `https://john-doe.github.io/tech-transit-portal/`

---

## Quick Deploy Script

You can also use the provided script:

```bash
# Double-click deploy-github.bat
# OR run:
deploy-github.bat
```

---

## Updating Your Deployment

After making changes:

```bash
# Make your changes to the code
# Then deploy again:
npm run deploy
```

Your changes will be live in 1-2 minutes!

---

## Troubleshooting

### "Git is not recognized"
- Install Git: https://git-scm.com/download/win
- Restart your terminal after installation

### "Repository not found"
- Check your GitHub username and repository name
- Verify the repository exists and is public
- Check git remote: `git remote -v`

### "404 Error" or "Blank Page"
- Check the base path in `vite.config.js` matches your repository name
- Ensure base path has trailing slash: `/repo-name/` not `/repo-name`

### "Build failed"
- Run: `npm install`
- Then: `npm run build`
- Check for error messages

### "gh-pages branch not found"
- Run: `npm run deploy` again
- Check GitHub repository branches

---

## Sharing with Team

Once deployed, share this URL with your team:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

They can access it from any browser, no installation needed!

---

## Need Help?

Check the detailed guide: `GITHUB_PAGES_DEPLOY.md`
