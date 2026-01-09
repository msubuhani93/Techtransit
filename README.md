# Tech Transit Portal

A comprehensive dashboard application for managing SWIFT project cutover activities, templates, and tasks.

## Features

- **Landing Page**: Search and filter projects with comprehensive project listing
- **Create Functions**: 
  - Create Tasks
  - Create Templates (with embedded tasks)
  - Create Projects (multi-step: Project Details → Template Details → Tasks Details)
- **Display Functions**:
  - Display all Tasks
  - Display all Templates (with General and Tasks tabs)
  - Display all Projects
- **Dashboard Overview**: 
  - Project cutover status tracking
  - Team workload visibility
  - Next tasks identification
  - Issue and delay detection
  - Timeline view
- **Edit Project**: Update project details, status, and dates

## Project Structure

```
Project → Template → Tasks
```

- Each project can have multiple templates
- Each template can have multiple tasks
- Tasks track duration, dependencies, teams, and status

## Installation

1. Navigate to the TechTransit directory:
```bash
cd TechTransit
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Build for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Deploy to GitHub Pages

### Quick Deploy

1. **Create a GitHub repository** (make it Public for free hosting)
2. **Update base path** in `vite.config.js` to match your repository name
3. **Initialize Git and push**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```
4. **Deploy**:
   ```bash
   npm run deploy
   ```
5. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: `gh-pages` branch, `/ (root)` folder
   - Save

Your app will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

**For detailed instructions, see:** `SETUP_GITHUB.md` or `GITHUB_PAGES_DEPLOY.md`

## Technology Stack

- **React 18** - UI framework
- **React Router** - Navigation
- **Vite** - Build tool and dev server
- **date-fns** - Date formatting utilities
- **LocalStorage** - Data persistence

## Sample Data

The application comes pre-loaded with realistic SWIFT project data:
- SWIFT GPI Phase 2 Deployment
- SWIFT MT/MX Migration
- SWIFT API Gateway Enhancement

All data is stored in browser localStorage and persists between sessions.

## Usage

1. **Landing Page**: View all projects with filtering capabilities
2. **Actions Menu**: Access Create and Display functions
3. **Dashboard**: Get comprehensive overview of all projects, templates, and tasks
4. **Create**: Add new projects, templates, or tasks
5. **Display**: View detailed information about projects, templates, or tasks
6. **Edit**: Modify project details and track progress

## Features for Project Leads

- **Cutover Status**: See where each project is in the cutover process
- **Team Tracking**: Identify which team is working on which task
- **Next Tasks**: See what tasks are ready to start next
- **Issue Detection**: Automatically identify delayed or at-risk tasks
- **Timeline View**: Visualize project timelines and progress
- **Completion Estimates**: Calculate estimated completion times
