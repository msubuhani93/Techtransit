# Tech Transit Portal - Deployment Guide

## Build Status
✅ Production build completed successfully!

## Deployment Options

### Option 1: Deploy to Vercel (Recommended - Free & Easy)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd C:\Users\msubuhani\Documents\Swift\Cursor\dashboard\TechTransit
   vercel
   ```

3. **Follow the prompts**:
   - Link to existing project or create new
   - Confirm settings
   - Deploy!

4. **Share the URL** with your team members

**Benefits:**
- Free hosting
- Automatic HTTPS
- Global CDN
- Easy team collaboration
- Automatic deployments on git push

---

### Option 2: Deploy to Netlify (Free & Easy)

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   cd C:\Users\msubuhani\Documents\Swift\Cursor\dashboard\TechTransit
   netlify deploy --prod --dir=dist
   ```

3. **Follow the prompts** to create account/login

4. **Share the URL** with your team

**Benefits:**
- Free hosting
- Automatic HTTPS
- Easy drag-and-drop deployment
- Team collaboration features

---

### Option 3: Deploy to GitHub Pages (Free)

1. **Create a GitHub repository** (if not exists)

2. **Add build script for GitHub Pages**:
   ```json
   "scripts": {
     "build": "vite build",
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages** in repository settings

---

### Option 4: Internal Server Deployment (For Company Network)

#### Using a Simple HTTP Server

1. **Install serve globally**:
   ```bash
   npm install -g serve
   ```

2. **Start the server**:
   ```bash
   cd C:\Users\msubuhani\Documents\Swift\Cursor\dashboard\TechTransit
   serve -s dist -l 3000
   ```

3. **Share your IP address**:
   - Find your IP: `ipconfig` (Windows)
   - Share: `http://YOUR_IP:3000` with team members

#### Using Node.js Express Server (More Control)

See `server.js` file for a simple Express server setup.

---

### Option 5: Deploy to Azure Static Web Apps

1. **Install Azure CLI**:
   ```bash
   npm install -g @azure/static-web-apps-cli
   ```

2. **Deploy**:
   ```bash
   swa deploy dist --deployment-token YOUR_TOKEN
   ```

---

## Quick Start - Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Navigate to project
cd C:\Users\msubuhani\Documents\Swift\Cursor\dashboard\TechTransit

# 3. Deploy
vercel

# 4. Follow prompts and share the URL!
```

## Building for Production

The production build is already created in the `dist` folder. To rebuild:

```bash
npm run build
```

The built files are in the `dist` directory and can be deployed to any static hosting service.

## Important Notes

1. **Data Storage**: Currently, the app uses localStorage, which means:
   - Data is stored in each user's browser
   - Data is not shared between users
   - For team collaboration, consider adding a backend API

2. **For Shared Data**: You'll need to:
   - Set up a backend API (Node.js, Python, etc.)
   - Use a database (MongoDB, PostgreSQL, etc.)
   - Update DataContext to fetch from API instead of localStorage

3. **Environment Variables**: If you need environment variables:
   - Create `.env` file for development
   - Configure in deployment platform settings

## Team Access

Once deployed, share the deployment URL with your team members. They can access it from any browser without installation.

## Support

For issues or questions, check the main README.md file.
