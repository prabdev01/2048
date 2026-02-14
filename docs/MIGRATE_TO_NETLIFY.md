# Migrate from GitHub Pages to Netlify

**Current:** GitHub Pages (~1-2 min deploys)  
**After Migration:** Netlify (~45 sec deploys) + Analytics + Global CDN

## Why Migrate to Netlify?

✅ **Faster deployments** (~45 seconds vs 1-2 minutes)  
✅ **Analytics** included  
✅ **Global CDN** (faster loading worldwide)  
✅ **Split testing** and advanced features  
✅ **Serverless functions** support  
✅ **Still 100% free** for open source  

## Step-by-Step Migration (5 minutes)

### 1. Sign Up for Netlify
- Go to https://netlify.com
- Click "Sign Up"
- Choose "Sign up with GitHub"
- Authorize Netlify

### 2. Create a New Site
- Click "Add new site" → "Import an existing project"
- Select GitHub
- Choose `prabdev01/2048` repository
- **Build settings:**
  - Build command: `npm run web:build`
  - Publish directory: `web-build`
  - Add environment variable: `OUTPUT_DIR=web-build`
- Click **Deploy site**

### 3. Get Netlify Tokens
- Go to User Settings → Applications → Personal Access Tokens
- Click "New access token"
- Name: `GitHub Actions`
- Copy the token (save it!)

### 4. Get Site ID
- Go to Site Settings → General → Site information
- Copy **Site ID**

### 5. Add Secrets to GitHub
- Go to `https://github.com/prabdev01/2048/settings/secrets/actions`
- Click "New repository secret"
- Add two secrets:
  - Name: `NETLIFY_AUTH_TOKEN` → Value: (token from step 3)
  - Name: `NETLIFY_SITE_ID` → Value: (from step 4)

### 6. Enable Netlify Workflow
```bash
cd .github/workflows/
mv netlify-preview.yml.disabled netlify-preview.yml
```

### 7. Disable GitHub Pages Workflow (Optional)
```bash
mv gh-pages-preview.yml gh-pages-preview.yml.disabled
```

### 8. Commit and Push
```bash
git add .
git commit -m "Migrate to Netlify deployments"
git push
```

## Done! 🎉

Next PR will deploy to Netlify automatically!

**Preview URL Format:** `https://pr-5--2048-game.netlify.app`

## Rollback to GitHub Pages

If you want to go back:
```bash
mv netlify-preview.yml netlify-preview.yml.disabled
mv gh-pages-preview.yml.disabled gh-pages-preview.yml
git add . && git commit -m "Rollback to GitHub Pages" && git push
```

## Additional Features

### Custom Domain
1. Go to Site Settings → Domain management
2. Click "Add custom domain"
3. Follow the DNS configuration steps

### Deploy Notifications
- Configure in Site Settings → Build & deploy → Deploy notifications
- Can send to Slack, email, webhooks, etc.

### Branch Deploys
- Automatically deploy other branches
- Configure in Site Settings → Build & deploy → Continuous deployment
