# Migrate from GitHub Pages to Cloudflare Pages

**Current:** GitHub Pages (~1-2 min deploys)  
**After Migration:** Cloudflare Pages (~40 sec deploys) + Analytics + Global CDN

## Why Migrate to Cloudflare Pages?

✅ **Faster deployments** (~40 seconds vs 1-2 minutes)  
✅ **Fastest global CDN** (200+ locations worldwide)  
✅ **Web Analytics** included (privacy-friendly)  
✅ **Unlimited bandwidth** (no limits!)  
✅ **Serverless functions** support (Workers)  
✅ **Still 100% free** for unlimited projects  

## Step-by-Step Migration (5 minutes)

### 1. Sign Up for Cloudflare Pages
- Go to https://pages.cloudflare.com
- Click "Sign Up"
- Create a Cloudflare account or log in
- Navigate to Pages

### 2. Create a New Project
- Click "Create a project"
- Connect to GitHub
- Select `prabdev01/2048` repository
- **Build settings:**
  - Framework preset: **None**
  - Build command: `npm run web:build`
  - Build output directory: `dist` (default) or `web-build` with environment variable below
  - **Advanced:** Add environment variable: `OUTPUT_DIR=web-build` (optional, if using web-build)
- Click **Save and Deploy**

### 3. Get Cloudflare API Token
- Go to Cloudflare Dashboard → My Profile → API Tokens
- Click "Create Token"
- Use template: **Edit Cloudflare Workers**
- Or create custom token with:
  - Permissions: `Cloudflare Pages - Edit`
  - Account Resources: Include → Your Account
- Copy the token (save it!)

### 4. Get Account ID
- Go to Cloudflare Dashboard → Pages → Your Project
- Copy **Account ID** from the URL or settings

### 5. Add Secrets to GitHub
- Go to `https://github.com/prabdev01/2048/settings/secrets/actions`
- Click "New repository secret"
- Add two secrets:
  - Name: `CLOUDFLARE_API_TOKEN` → Value: (token from step 3)
  - Name: `CLOUDFLARE_ACCOUNT_ID` → Value: (from step 4)

### 6. Enable Cloudflare Workflow
```bash
cd .github/workflows/
mv cloudflare-preview.yml.disabled cloudflare-preview.yml
```

### 7. Disable GitHub Pages Workflow (Optional)
```bash
mv gh-pages-preview.yml gh-pages-preview.yml.disabled
```

### 8. Commit and Push
```bash
git add .
git commit -m "Migrate to Cloudflare Pages deployments"
git push
```

## Done! 🎉

Next PR will deploy to Cloudflare Pages automatically!

**Preview URL Format:** `https://pr-5.2048-game.pages.dev`

## Rollback to GitHub Pages

If you want to go back:
```bash
mv cloudflare-preview.yml cloudflare-preview.yml.disabled
mv gh-pages-preview.yml.disabled gh-pages-preview.yml
git add . && git commit -m "Rollback to GitHub Pages" && git push
```

## Additional Features

### Custom Domain
1. Go to your Pages project → Custom domains
2. Click "Set up a custom domain"
3. Follow the DNS configuration steps
4. Cloudflare will automatically provision SSL

### Web Analytics
- Free, privacy-friendly analytics included
- No tracking cookies required
- GDPR compliant
- Enable in Pages project settings

### Cloudflare Workers (Functions)
- Add serverless functions to your static site
- Create a `functions/` directory in your project
- Files automatically become API endpoints

### Branch Previews
- Automatically deploy all branches
- Configure in project Settings → Builds & deployments
- Each branch gets its own preview URL
