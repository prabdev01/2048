# Vercel Deployment Guide

This repository is configured for automatic deployment to Vercel.

## Quick Start

### 1. Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import this GitHub repository: `prabdev01/2048`
4. Vercel will auto-detect the configuration from `vercel.json`

### 2. Configuration

The repository includes a `vercel.json` file with the following settings:

```json
{
  "version": 2,
  "buildCommand": "npm run web:build",
  "outputDirectory": "dist",
  "framework": null,
  "installCommand": "npm ci",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**No additional configuration needed!** Vercel will automatically:
- Install dependencies with `npm ci`
- Build the project with `npm run web:build`
- Deploy the `dist` folder
- Handle SPA routing

### 3. Required GitHub Secrets (for PR Previews)

To enable automatic PR preview deployments, add these secrets to your GitHub repository:

**Settings → Secrets and variables → Actions → New repository secret**

| Secret Name | Description | Where to Find |
|-------------|-------------|---------------|
| `VERCEL_TOKEN` | Vercel API token | [Vercel Account Settings → Tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Your Vercel organization/team ID | Project Settings → General → Project ID section |
| `VERCEL_PROJECT_ID` | Your Vercel project ID | Project Settings → General → Project ID |

#### How to Get Secrets

**VERCEL_TOKEN:**
1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Name it "GitHub Actions" and select scope
4. Copy the token (shown only once!)

**VERCEL_ORG_ID & VERCEL_PROJECT_ID:**

Method 1 - From Vercel Dashboard:
1. Go to your project settings
2. Scroll to "General" section
3. Find "Project ID" and "Organization ID"

Method 2 - Using Vercel CLI:
```bash
npm i -g vercel
vercel login
vercel link
cat .vercel/project.json
```

The `.vercel/project.json` file will contain:
```json
{
  "orgId": "team_xxx...",
  "projectId": "prj_xxx..."
}
```

### 4. Preview Deployments

Once secrets are configured, every pull request will automatically:

1. **Build** the project
2. **Deploy** to a preview URL
3. **Comment** on the PR with the preview link

Preview URL format: `https://pr-{number}-2048.vercel.app`

### 5. Production Deployment

**Automatic:** Every push to `master` branch triggers a production deployment

**Manual:** You can also deploy manually from Vercel dashboard

## Deployment Workflow

The workflow file `.github/workflows/preview-deploy.yml` handles PR previews:

- ✅ Triggers on PR open, update, or reopen
- ✅ Builds with custom `PUBLIC_URL` for each PR
- ✅ Deploys to Vercel
- ✅ Posts preview URL as PR comment

## Troubleshooting

### Build Fails

1. **Check build logs** in Vercel dashboard
2. **Test locally:** `npm run web:build`
3. **Verify** all dependencies are in `package.json`

### Preview Not Deploying

1. **Check GitHub Actions** for workflow errors
2. **Verify secrets** are correctly set
3. **Check Vercel dashboard** for deployment status

### Wrong Output Directory

The build outputs to `dist/`. If you see errors about missing files:
- Ensure `npm run web:build` creates the `dist` folder
- Check `webpack.config.js` output path

## Custom Domain

To use a custom domain:

1. Go to Vercel project settings
2. Click "Domains"
3. Add your domain
4. Configure DNS as instructed
5. Vercel handles HTTPS automatically

## Environment Variables

If you need environment variables:

1. Go to Vercel project settings
2. Click "Environment Variables"
3. Add variables for Production, Preview, or Development
4. Variables are automatically injected during build

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [GitHub Actions Integration](https://vercel.com/docs/concepts/git/vercel-for-github)

## Quick Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/prabdev01/2048)

Click the button above to deploy this project to Vercel in one click!
