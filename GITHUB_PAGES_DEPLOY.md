# GitHub Pages Deployment Guide

## Quick Start

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it: `tech-transit-portal` (or any name you prefer)
3. Make it **Public** (required for free GitHub Pages)
   - Or use **Private** with GitHub Pro/Team plan

### Step 2: Update Base Path (IMPORTANT!)

**If your repository name is `tech-transit-portal`:**
- The base path is already set correctly in `vite.config.js`
- No changes needed!

**If your repository name is different:**
1. Open `vite.config.js`
2. Change the base path to match your repository name:
   ```js
   const base = process.env.NODE_ENV === 'production' ? '/YOUR-REPO-NAME/' : '/'
   ```
   Replace `YOUR-REPO-NAME` with your actual repository name.

**If deploying to root domain (username.github.io):**
1. Open `vite.config.js`
2. Change base to:
   ```js
   const base = '/'
   ```

### Step 3: Initialize Git (if not already done)

```bash
cd C:\Users\msubuhani\Documents\Swift\Cursor\dashboard\TechTransit

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Tech Transit Portal"
```

### Step 4: Connect to GitHub Repository

```bash
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 5: Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
1. Build the production version
2. Deploy to the `gh-pages` branch
3. Make your app available on GitHub Pages

### Step 6: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

### Step 7: Access Your App

Your app will be available at:
- `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

**Example:**
- If username is `john-doe` and repo is `tech-transit-portal`
- URL: `https://john-doe.github.io/tech-transit-portal/`

### Step 8: Share with Team

Share the GitHub Pages URL with your team members!

---

## Updating the Deployment

Whenever you make changes:

```bash
# Make your changes
# Then deploy again:
npm run deploy
```

---

## Troubleshooting

### Issue: 404 Error or Blank Page

**Solution:** Check the base path in `vite.config.js` matches your repository name.

### Issue: Assets Not Loading

**Solution:** Ensure the base path starts and ends with `/`:
```js
const base = '/tech-transit-portal/'  // ✅ Correct
const base = '/tech-transit-portal'   // ❌ Wrong (missing trailing slash)
```

### Issue: Repository Not Found

**Solution:** 
1. Check repository name is correct
2. Ensure repository is public (or you have GitHub Pro)
3. Verify git remote URL is correct:
   ```bash
   git remote -v
   ```

### Issue: Build Fails

**Solution:**
1. Make sure all dependencies are installed:
   ```bash
   npm install
   ```
2. Try building manually:
   ```bash
   npm run build
   ```

---

## Custom Domain (Optional)

If you have a custom domain:

1. Add a `CNAME` file in the `public` folder with your domain:
   ```
   yourdomain.com
   ```

2. Update DNS settings:
   - Add CNAME record pointing to `YOUR_USERNAME.github.io`

3. In GitHub repository Settings → Pages:
   - Enter your custom domain

---

## Notes

- **Free GitHub Pages** only works with public repositories
- For private repos, you need GitHub Pro/Team
- Deployment may take 1-2 minutes to go live
- The `gh-pages` branch is automatically created and managed

---

## Quick Command Reference

```bash
# Build and deploy
npm run deploy

# Just build (without deploying)
npm run build

# Preview build locally
npm run preview
```
