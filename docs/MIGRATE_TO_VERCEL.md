# Migrate from GitHub Pages to Vercel

**Current:** GitHub Pages (~1-2 min deploys)  
**After Migration:** Vercel (~30 sec deploys) + Analytics + Global CDN

## Why Migrate to Vercel?

✅ **10x faster deployments** (~30 seconds vs 1-2 minutes)  
✅ **Analytics** included (page views, performance)  
✅ **Global CDN** (faster loading worldwide)  
✅ **Better caching** and performance  
✅ **Serverless functions** support (if needed later)  
✅ **Still 100% free** for open source  

## Step-by-Step Migration (5 minutes)

### 1. Sign Up for Vercel
- Go to https://vercel.com
- Click "Sign Up"
- Choose "Continue with GitHub"
- Authorize Vercel

### 2. Import Project
- Click "Add New Project"
- Select `prabdev01/2048` repository
- Framework Preset: **Other**
- Build Command: `npm run web:build`
- Output Directory: `dist` (or set `web-build` and add environment variable `OUTPUT_DIR=web-build`)
- Click **Deploy**

### 3. Get Vercel Tokens
- Go to Vercel Dashboard → Settings → Tokens
- Click "Create Token"
- Name: `GitHub Actions`
- Expiration: No Expiration
- Scope: Full Account
- Copy the token (save it!)

### 4. Get Project IDs
- Go to Project Settings → General
- Copy **Project ID**
- Copy **Team/Org ID** (from URL or settings)

### 5. Add Secrets to GitHub
- Go to `https://github.com/prabdev01/2048/settings/secrets/actions`
- Click "New repository secret"
- Add three secrets:
  - Name: `VERCEL_TOKEN` → Value: (token from step 3)
  - Name: `VERCEL_PROJECT_ID` → Value: (from step 4)
  - Name: `VERCEL_ORG_ID` → Value: (from step 4)

### 6. Enable Vercel Workflow
```bash
cd .github/workflows/
mv vercel-preview.yml.disabled vercel-preview.yml
```

### 7. Disable GitHub Pages Workflow (Optional)
```bash
mv gh-pages-preview.yml gh-pages-preview.yml.disabled
```

### 8. Commit and Push
```bash
git add .
git commit -m "Migrate to Vercel deployments"
git push
```

## Done! 🎉

Next PR will deploy to Vercel automatically!

**Preview URL Format:** `https://pr-5-2048.vercel.app`

## Rollback to GitHub Pages

If you want to go back:
```bash
mv vercel-preview.yml vercel-preview.yml.disabled
mv gh-pages-preview.yml.disabled gh-pages-preview.yml
git add . && git commit -m "Rollback to GitHub Pages" && git push
```
