# Secrets Setup Guide

This guide explains how to obtain and configure API tokens and secrets for preview deployment platforms.

## Table of Contents

- [Overview](#overview)
- [Vercel Setup](#vercel-setup)
- [Netlify Setup](#netlify-setup)
- [Cloudflare Setup](#cloudflare-setup)
- [Adding Secrets to GitHub](#adding-secrets-to-github)
- [Security Best Practices](#security-best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

Preview deployment workflows require authentication tokens (secrets) to deploy your application. This guide walks you through obtaining these tokens for each platform.

### Required Secrets by Platform

| Platform | Required Secrets | Workflow File |
|----------|-----------------|---------------|
| GitHub Pages | None (uses `GITHUB_TOKEN`) | `gh-pages-preview.yml` |
| Vercel | `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` | `preview-deploy.yml` |
| Netlify | `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID` | `netlify-preview.yml` |
| Cloudflare | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | `cloudflare-preview.yml` |

## Vercel Setup

Vercel offers the best preview deployment experience with instant deployments and automatic comments on PRs.

### Prerequisites

- GitHub account
- Vercel account (free tier available)

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Project

1. After signing in, click "Add New..." → "Project"
2. Import your repository: `prabdev01/2048`
3. Configure project settings:
   - **Framework Preset:** Other
   - **Build Command:** `npm run web:build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm ci`
4. Click "Deploy"
5. Wait for initial deployment to complete

### Step 3: Get VERCEL_TOKEN

**Generate a new token:**

1. Go to [Vercel Account Settings → Tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Configure token:
   - **Token Name:** `GitHub Actions - 2048`
   - **Scope:** Select your account/organization
   - **Expiration:** Choose based on your security policy (or no expiration)
4. Click "Create Token"
5. **IMPORTANT:** Copy the token immediately - it won't be shown again
6. Store it securely (you'll add it to GitHub secrets later)

**Token format:** Starts with `vercel_`

**Example:** `vercel_sT6jG8kQ7vR3nM2wX9pL4hF1`

### Step 4: Get VERCEL_ORG_ID

**Method 1: From Project Settings**

1. Go to your project on Vercel
2. Click "Settings"
3. Look for "General" section
4. Find "Organization ID" or "Team ID"
5. Copy the ID

**Method 2: From Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Navigate to your project directory
cd /path/to/2048

# Link project
vercel link

# The .vercel/project.json file will contain orgId
cat .vercel/project.json
```

**ID format:** Alphanumeric string

**Example:** `team_abc123def456ghi789`

### Step 5: Get VERCEL_PROJECT_ID

**Method 1: From Project Settings**

1. Go to your project on Vercel
2. Click "Settings"
3. Look for "General" section
4. Find "Project ID"
5. Copy the ID

**Method 2: From Vercel CLI**

After running `vercel link`, check `.vercel/project.json`:

```bash
cat .vercel/project.json
```

Look for `projectId` field.

**ID format:** `prj_` followed by alphanumeric string

**Example:** `prj_abc123def456ghi789jkl012`

### Step 6: Verify Vercel Setup

**Your secrets should look like:**

```
VERCEL_TOKEN=vercel_sT6jG8kQ7vR3nM2wX9pL4hF1
VERCEL_ORG_ID=team_abc123def456ghi789
VERCEL_PROJECT_ID=prj_abc123def456ghi789jkl012
```

## Netlify Setup

Netlify is great for static sites with excellent deployment features.

### Prerequisites

- GitHub account
- Netlify account (free tier available)

### Step 1: Create Netlify Account

1. Go to [netlify.com](https://netlify.com)
2. Click "Sign Up"
3. Choose "GitHub" to sign up
4. Authorize Netlify to access your GitHub account

### Step 2: Create New Site

1. Click "Add new site" → "Import an existing project"
2. Choose "Deploy with GitHub"
3. Select your repository: `prabdev01/2048`
4. Configure build settings:
   - **Branch to deploy:** `master`
   - **Build command:** `npm run web:build`
   - **Publish directory:** `dist`
5. Click "Deploy site"
6. Wait for initial deployment to complete

### Step 3: Get NETLIFY_AUTH_TOKEN

**Generate a personal access token:**

1. Click on your profile icon → "User settings"
2. Navigate to "Applications" in the left sidebar
3. Scroll to "Personal access tokens"
4. Click "New access token"
5. Configure token:
   - **Description:** `GitHub Actions - 2048 Preview Deployments`
   - **Expiration:** Choose based on your needs
6. Click "Generate token"
7. **IMPORTANT:** Copy the token immediately - it won't be shown again
8. Store it securely

**Token format:** Alphanumeric string

**Example:** `nfp_abc123def456ghi789jkl012mno345pqr678`

### Step 4: Get NETLIFY_SITE_ID

**Method 1: From Site Settings**

1. Go to your site dashboard on Netlify
2. Click "Site settings"
3. Look for "General" → "Site details"
4. Find "Site ID" under "Site information"
5. Copy the ID

**Method 2: From Site URL**

The site ID is in the URL when viewing site settings:
```
https://app.netlify.com/sites/[SITE_ID]/overview
```

**Method 3: From Netlify CLI**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Navigate to your project
cd /path/to/2048

# Link site
netlify link

# Get site info
netlify sites:list
```

**ID format:** UUID-like string

**Example:** `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

### Step 5: Verify Netlify Setup

**Your secrets should look like:**

```
NETLIFY_AUTH_TOKEN=nfp_abc123def456ghi789jkl012mno345pqr678
NETLIFY_SITE_ID=a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

## Cloudflare Setup

Cloudflare Pages offers the fastest global edge network and excellent performance.

### Prerequisites

- GitHub account
- Cloudflare account (free tier available)

### Step 1: Create Cloudflare Account

1. Go to [cloudflare.com](https://cloudflare.com)
2. Click "Sign Up"
3. Create account with email or GitHub
4. Verify your email address

### Step 2: Create Pages Project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to "Workers & Pages"
3. Click "Create application" → "Pages"
4. Click "Connect to Git"
5. Authorize Cloudflare to access GitHub
6. Select repository: `prabdev01/2048`
7. Configure build settings:
   - **Project name:** `2048-game`
   - **Production branch:** `master`
   - **Build command:** `npm run web:build`
   - **Build output directory:** `dist`
8. Click "Save and Deploy"
9. Wait for initial deployment

### Step 3: Get CLOUDFLARE_API_TOKEN

**Create API token:**

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click on your profile icon → "My Profile"
3. Navigate to "API Tokens"
4. Click "Create Token"
5. Choose template: "Edit Cloudflare Workers"
   - Or click "Create Custom Token"
6. Configure permissions:
   - **Permissions:**
     - Account → Cloudflare Pages → Edit
   - **Account Resources:**
     - Include → Your account
7. Continue to summary
8. Click "Create Token"
9. **IMPORTANT:** Copy the token immediately - it won't be shown again
10. Store it securely

**Token format:** Alphanumeric with hyphens

**Example:** `abc123def456-ghi789jkl012-mno345pqr`

### Step 4: Get CLOUDFLARE_ACCOUNT_ID

**From Dashboard:**

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click "Workers & Pages"
3. Select your Pages project
4. Go to "Settings"
5. The Account ID is displayed in the URL or in the settings
6. Copy the ID

**From URL:**

The account ID is in the URL:
```
https://dash.cloudflare.com/[ACCOUNT_ID]/pages
```

**ID format:** 32-character hexadecimal string

**Example:** `abc123def456789012345678901234ab`

### Step 5: Verify Cloudflare Setup

**Your secrets should look like:**

```
CLOUDFLARE_API_TOKEN=abc123def456-ghi789jkl012-mno345pqr
CLOUDFLARE_ACCOUNT_ID=abc123def456789012345678901234ab
```

## Adding Secrets to GitHub

Once you have obtained all required tokens and IDs, add them to your GitHub repository.

### Step-by-Step Instructions

1. **Navigate to repository settings:**
   - Go to https://github.com/prabdev01/2048
   - Click "Settings" tab
   - Click "Secrets and variables" → "Actions" in left sidebar

2. **Add each secret:**
   - Click "New repository secret"
   - Enter secret name (exactly as shown below)
   - Paste the secret value
   - Click "Add secret"
   - Repeat for each secret

### Secret Names (IMPORTANT: Use exact names)

**For Vercel:**
```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

**For Netlify:**
```
NETLIFY_AUTH_TOKEN
NETLIFY_SITE_ID
```

**For Cloudflare:**
```
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

### Verify Secrets Are Added

1. Go to Settings → Secrets and variables → Actions
2. You should see your secrets listed (values are hidden)
3. Each secret shows when it was last updated

**Example:**
```
VERCEL_TOKEN           Updated 2 hours ago
VERCEL_ORG_ID          Updated 2 hours ago
VERCEL_PROJECT_ID      Updated 2 hours ago
```

## Security Best Practices

### Token Security

- ✅ **Never commit tokens to code** - Always use GitHub secrets
- ✅ **Use descriptive names** - Know what each token is for
- ✅ **Set expiration dates** - Rotate tokens periodically
- ✅ **Use least privilege** - Grant minimum required permissions
- ✅ **Rotate compromised tokens** - If leaked, revoke immediately
- ✅ **Monitor usage** - Check platform dashboards for unusual activity

### Recommended Token Lifetimes

- **Production tokens:** 90 days
- **Development tokens:** 30 days
- **CI/CD tokens:** No expiration, but rotate quarterly

### Token Rotation

**When to rotate:**
- Every 90 days (recommended)
- When team member leaves
- If token is compromised
- When changing permissions

**How to rotate:**

1. Generate new token on platform
2. Update GitHub secret with new value
3. Test that workflows still work
4. Revoke old token on platform

### Revoking Tokens

**Vercel:**
1. Go to Account Settings → Tokens
2. Find the token
3. Click "Delete"

**Netlify:**
1. Go to User Settings → Applications
2. Find the token under "Personal access tokens"
3. Click "Delete"

**Cloudflare:**
1. Go to My Profile → API Tokens
2. Find the token
3. Click "Roll" to rotate or "Delete" to remove

### Monitoring

**Check for unauthorized access:**

**Vercel:**
- Go to project → Deployments
- Review deployment history
- Check for unexpected deployments

**Netlify:**
- Go to site → Deploys
- Review deploy log
- Check for unusual activity

**Cloudflare:**
- Go to Workers & Pages → Your project
- Review deployment history
- Check audit logs

## Troubleshooting

### Invalid Token Error

**Symptoms:**
- Workflow fails with authentication error
- "Invalid token" or "Unauthorized" message

**Solutions:**
1. Verify token is copied correctly (no extra spaces)
2. Check token hasn't expired
3. Verify token has correct permissions
4. Generate new token and update secret
5. Ensure secret name matches workflow exactly

### Token Expired

**Symptoms:**
- Workflow was working, now fails
- "Token expired" error

**Solutions:**
1. Generate new token on platform
2. Update GitHub secret
3. Test with a new PR

### Wrong Secret Name

**Symptoms:**
- Workflow can't find secret
- Environment variable is empty

**Solutions:**
1. Check secret name matches workflow exactly
2. Names are case-sensitive
3. No extra spaces in name
4. Compare with [Secret Names section](#secret-names-important-use-exact-names)

### Permission Denied

**Symptoms:**
- Token valid but deployment fails
- "Permission denied" or "Insufficient permissions"

**Solutions:**
1. Check token has correct scopes/permissions
2. Verify account has access to project
3. Ensure organization settings allow deployments
4. Regenerate token with correct permissions

### Can't Find Secret Values

**Symptoms:**
- Lost the token after creating it
- Need to verify current token

**Solutions:**
- **You cannot view secret values in GitHub**
- Generate new token on platform
- Update GitHub secret
- Test with a PR

### Multiple Accounts

If you have multiple accounts (personal/organization):

1. Use tokens from the correct account
2. Verify project is in correct account/organization
3. Check organization ID matches the account
4. Ensure GitHub repo is accessible to the account

## Platform-Specific Notes

### Vercel

- Supports team/organization deployments
- Can have multiple projects per account
- Deployment URLs auto-generated
- Built-in preview comments on PRs
- Analytics available in free tier

### Netlify

- Supports team workspaces
- Custom deploy previews
- Form handling available
- Serverless functions support
- Split testing capabilities

### Cloudflare

- Fast global edge network
- Unlimited bandwidth (free tier)
- Workers integration available
- Analytics included
- Best performance for global users

### GitHub Pages

- No secrets required
- Uses `GITHUB_TOKEN` automatically
- Free for public repos
- Manual cleanup may be needed
- Slower than specialized platforms

## Testing Your Setup

After adding secrets, test your configuration:

### Test Workflow

1. Create a test branch:
   ```bash
   git checkout -b test-preview-deployment
   ```

2. Make a small change (e.g., edit README)

3. Push and create PR:
   ```bash
   git add .
   git commit -m "Test preview deployment"
   git push origin test-preview-deployment
   ```

4. Open PR on GitHub

5. Wait for workflow to run

6. Check for:
   - ✅ Workflow completes successfully
   - ✅ Preview URL posted in PR comment
   - ✅ Preview site is accessible
   - ✅ Shows your changes

### Verify Deployment

Visit the preview URL and check:
- [ ] Site loads correctly
- [ ] Assets load (CSS, JS, images)
- [ ] Game is playable
- [ ] No console errors
- [ ] Correct content is shown

## Support

### Platform Documentation

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

### Getting Help

If you encounter issues:

1. Check workflow logs in Actions tab
2. Review this guide
3. Check platform status page
4. Search platform documentation
5. Open an issue on GitHub

### Common Resources

**Workflow Logs:**
- Go to repository → Actions
- Click on failed workflow
- Expand steps to see errors

**Platform Dashboards:**
- Vercel: https://vercel.com/dashboard
- Netlify: https://app.netlify.com
- Cloudflare: https://dash.cloudflare.com

**Status Pages:**
- Vercel: https://vercel-status.com
- Netlify: https://netlifystatus.com
- Cloudflare: https://cloudflarestatus.com
- GitHub: https://githubstatus.com

## License

This documentation is part of the 2048 game repository and is covered under the MIT License.
