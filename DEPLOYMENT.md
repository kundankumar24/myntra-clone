# Vercel Deployment Guide

## What I Fixed

1. **Created `vercel.json`** - This file ensures React Router works properly on Vercel by redirecting all routes to index.html (SPA routing)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your repository
5. Vercel will auto-detect Vite settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

## Common Issues & Solutions

### Issue: 404 on page refresh
**Solution**: The `vercel.json` file I created fixes this by rewriting all routes to index.html

### Issue: Build fails with "command not found"
**Solution**: Ensure your `package.json` has the correct build script (already configured)

### Issue: Environment variables
**Solution**: Add them in Vercel Dashboard → Project Settings → Environment Variables

### Issue: Large bundle size warning
**Solution**: Your build is ~300KB which is acceptable. To optimize further:
- Lazy load routes with React.lazy()
- Compress images in assets folder
- Use dynamic imports for heavy components

## Verify Deployment

After deployment, test these routes:
- `/` - Home page
- `/login` - Login page
- `/SignUp` - Sign up page

All should work without 404 errors.
