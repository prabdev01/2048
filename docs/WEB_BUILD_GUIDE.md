# Web Build Guide for 2048 Game

This guide explains how to build, run, and deploy the 2048 game web application.

## Table of Contents

- [Requirements](#requirements)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Testing Locally](#testing-locally)
- [Deployment](#deployment)
- [PWA Features](#pwa-features)
- [Browser Compatibility](#browser-compatibility)
- [Troubleshooting](#troubleshooting)

## Requirements

- Node.js 14.x or higher
- npm 6.x or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Development

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run web:dev
```

This will:
- Start webpack dev server on `http://localhost:3000`
- Enable hot module replacement
- Open your browser automatically
- Watch for file changes

Alternative commands:
```bash
npm run web        # Same as web:dev but also opens browser
```

### Development Features

- **Hot Reload**: Changes are reflected immediately without full page refresh
- **Source Maps**: Easy debugging with original source code
- **Fast Rebuilds**: Only changed modules are rebuilt

## Building for Production

### Create Production Build

```bash
npm run web:build
```

This will:
- Create optimized bundle in `dist/` directory
- Minify JavaScript and CSS
- Generate source maps
- Create service worker for PWA
- Optimize images and assets
- Generate content hashes for cache busting

### Build Output Structure

```
dist/
├── index.html                          # Main HTML file
├── static/
│   ├── js/
│   │   ├── main.[hash].js             # Main application bundle
│   │   ├── vendors.[hash].js          # Third-party dependencies
│   │   └── runtime-main.[hash].js     # Webpack runtime
│   ├── css/
│   │   └── main.[hash].css            # Compiled and minified CSS
│   └── media/
│       └── [images/fonts with hashes] # Optimized assets
├── manifest.json                       # PWA manifest
├── service-worker.js                   # Service worker for offline support
├── favicon.ico                         # Favicon
└── meta/                               # App icons and meta images
```

### Build Optimizations

The production build includes:

- **Code Minification**: JavaScript and CSS are minified using Terser and CSSNano
- **Tree Shaking**: Unused code is removed
- **Code Splitting**: Vendor code separated from app code
- **Asset Optimization**: Images and fonts are optimized
- **Gzip Ready**: Output is optimized for gzip compression
- **Cache Busting**: Content hashes in filenames for effective caching

## Testing Locally

### Serve Production Build

After building, test the production build locally:

```bash
npm run web:serve
```

This serves the `dist/` folder on `http://localhost:3000`

### What to Test

1. **Game Functionality**
   - All arrow keys work (↑ ↓ ← →)
   - WASD keys work
   - Vim keys work (HJKL)
   - Touch/swipe gestures on mobile
   - New game button
   - Score tracking
   - Best score persistence

2. **Keyboard Shortcuts** (Desktop)
   - `N` or `R` - New game
   - `ESC` - Close modals
   - Arrow keys - Move tiles

3. **Responsive Design**
   - Test on desktop (1920x1080, 1366x768)
   - Test on tablet (iPad)
   - Test on mobile (iPhone, Android)

4. **PWA Features**
   - Install prompt appears
   - App works offline
   - Service worker caches assets
   - App can be added to home screen

5. **Performance**
   - Check load time (should be < 3 seconds on 3G)
   - Check animation smoothness (60 FPS)
   - Check bundle size (should be < 500KB gzipped)

### Performance Testing

Check bundle size:
```bash
npm run web:analyze
```

This opens webpack bundle analyzer to visualize bundle composition.

## Deployment

### Deploy to GitHub Pages

The repository includes an automated GitHub Actions workflow that deploys to GitHub Pages.

#### Enable GitHub Pages

1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The site will be available at `https://prabdev01.github.io/2048`

#### Manual Deployment

You can also deploy manually:

```bash
# Build the project
npm run web:build

# Deploy to GitHub Pages (requires gh-pages package)
npx gh-pages -d dist
```

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run web:build`
   - Publish directory: `dist`
3. Deploy!

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Other Platforms

The `dist/` folder contains a static website that can be deployed to:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- Firebase Hosting
- Surge.sh
- Any static hosting service

## PWA Features

### Progressive Web App Capabilities

The 2048 game is a full Progressive Web App with:

1. **Installable**: Users can install it to their home screen
2. **Offline Support**: Game works without internet connection
3. **Fast Loading**: Service worker caches assets
4. **App-like Experience**: Runs in standalone mode

### Installing the PWA

**On Desktop:**
1. Visit the site in Chrome/Edge
2. Look for install icon in address bar
3. Click "Install"

**On Mobile:**
1. Visit the site in browser
2. Tap "Share" or "Menu"
3. Select "Add to Home Screen"

### Service Worker

The service worker:
- Caches all static assets
- Provides offline gameplay
- Updates automatically when new version is deployed
- Uses cache-first strategy for fast loading

### Manifest Configuration

Edit `public/manifest.json` to customize:
- App name and description
- Theme colors
- Icons
- Display mode
- Orientation

## Browser Compatibility

### Supported Browsers

✅ **Chrome/Edge** (Chromium) - Full support
✅ **Firefox** - Full support
✅ **Safari** (macOS, iOS) - Full support
✅ **Opera** - Full support
✅ **Mobile Browsers** - Full support

### Minimum Versions

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Feature Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Service Worker | ✅ | ✅ | ✅ | ✅ |
| Touch Events | ✅ | ✅ | ✅ | ✅ |
| Local Storage | ✅ | ✅ | ✅ | ✅ |
| CSS Grid | ✅ | ✅ | ✅ | ✅ |
| ES6+ | ✅ | ✅ | ✅ | ✅ |

## Troubleshooting

### Build Errors

**Error: Module not found**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error: Out of memory**
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run web:build
```

### Development Server Issues

**Port 3000 already in use**
```bash
# Use different port
PORT=3001 npm run web:dev
```

**Hot reload not working**
- Clear browser cache
- Restart dev server
- Check firewall settings

### PWA Issues

**Service worker not registering**
- Service workers only work on HTTPS (or localhost)
- Check browser console for errors
- Ensure service-worker.js is accessible

**App not installable**
- Manifest must be valid JSON
- Requires HTTPS
- Icons must be accessible
- Check Chrome DevTools → Application → Manifest

### Performance Issues

**Slow initial load**
- Enable gzip on server
- Use CDN for static assets
- Check bundle size with `npm run web:analyze`

**Animations choppy**
- Disable browser extensions
- Check CPU usage
- Clear browser cache

### Mobile Issues

**Touch gestures not working**
- Check if preventDefault() is called
- Verify touch event listeners
- Test on actual device, not just emulator

**Layout issues on mobile**
- Check viewport meta tag
- Test on different screen sizes
- Use browser DevTools responsive mode

## Advanced Configuration

### Webpack Customization

Edit `webpack.config.js` to:
- Add custom loaders
- Configure plugins
- Adjust optimization settings
- Add environment variables

### Custom Domain

For GitHub Pages with custom domain:
1. Add `CNAME` file to `public/` folder
2. Configure DNS settings
3. Enable HTTPS in GitHub settings

### Analytics

Add Google Analytics:
1. Get tracking ID from Google Analytics
2. Add script to `public/index.html`
3. Track game events

Example:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Performance Benchmarks

Target metrics:
- **Bundle Size**: < 500KB gzipped
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s on 3G
- **Lighthouse Score**: > 90

Check performance:
```bash
# Using Chrome DevTools
# 1. Open DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Run audit
```

## Support

For issues or questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review webpack and PWA documentation

## License

MIT License - see LICENSE.txt for details
