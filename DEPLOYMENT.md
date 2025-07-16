# Deployment Guide - Patel Capital Corp Website

This guide covers deployment options for the Patel Capital Corp immersive 3D website.

## 🚀 Quick Deployment

### Option 1: Netlify (Recommended)
```bash
# 1. Build the project
npm run build

# 2. Deploy to Netlify
# - Connect your GitHub repository to Netlify
# - Set build command: npm run build
# - Set publish directory: . (root)
# - Deploy automatically on push to main branch
```

### Option 2: Vercel
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel --prod
```

### Option 3: GitHub Pages
```bash
# 1. Enable GitHub Pages in repository settings
# 2. Set source to main branch
# 3. Custom domain: patelcapitalcorp.com
```

## 🔧 Production Configuration

### Environment Variables
```bash
# .env.production
NODE_ENV=production
SITE_URL=https://patelcapitalcorp.com
ANALYTICS_ID=your-analytics-id
```

### Build Optimization
```bash
# Install build dependencies
npm install --save-dev terser html-minifier-terser

# Create build script
npm run build
```

### Performance Optimization
1. **Asset Compression**
   - Enable Gzip/Brotli compression
   - Optimize images (WebP format)
   - Minify CSS/JS

2. **CDN Configuration**
   - Use CDN for Three.js and GSAP
   - Cache static assets
   - Enable HTTP/2

3. **Security Headers**
   ```
   Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline'
   X-Frame-Options: DENY
   X-Content-Type-Options: nosniff
   Referrer-Policy: strict-origin-when-cross-origin
   ```

## 🌐 Domain Configuration

### DNS Settings
```
Type    Name    Value                   TTL
A       @       192.0.2.1              300
CNAME   www     patelcapitalcorp.com    300
```

### SSL Certificate
- Use Let's Encrypt for free SSL
- Enable HTTPS redirect
- Configure HSTS headers

## 📊 Monitoring & Analytics

### Performance Monitoring
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Lighthouse CI

### Analytics Setup
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking
- Sentry for JavaScript errors
- LogRocket for user sessions
- Custom error reporting

## 🔒 Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Content Security Policy implemented
- [ ] Input validation on forms
- [ ] Regular dependency updates
- [ ] Vulnerability scanning

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build project
      run: npm run build
      
    - name: Deploy to Netlify
      uses: netlify/actions/cli@master
      with:
        args: deploy --prod --dir=.
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📱 Mobile Optimization

### Progressive Web App
```json
// manifest.json
{
  "name": "Patel Capital Corp",
  "short_name": "PCC",
  "description": "Engineering Creative Finance",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#32ff7e",
  "icons": [
    {
      "src": "/assets/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### Service Worker
```javascript
// sw.js
const CACHE_NAME = 'pcc-v1';
const urlsToCache = [
  '/',
  '/css/main.css',
  '/js/main.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

## 🔍 SEO Optimization

### Meta Tags
```html
<meta name="description" content="Patel Capital Corp - Engineering Creative Finance through advanced data science and AI technology">
<meta name="keywords" content="capital markets, debt financing, equity placement, AI finance">
<meta property="og:title" content="Patel Capital Corp - Control The Leverage">
<meta property="og:description" content="Innovative capital solutions powered by advanced data science">
<meta property="og:image" content="https://patelcapitalcorp.com/assets/images/og-image.jpg">
```

### Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Patel Capital Corp",
  "url": "https://patelcapitalcorp.com",
  "description": "Commercial real estate capital markets firm"
}
```

## 📈 Performance Targets

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Additional Metrics
- **Time to Interactive**: < 3s
- **First Contentful Paint**: < 1.5s
- **Speed Index**: < 3s

## 🛠 Troubleshooting

### Common Issues
1. **WebGL not supported**
   - Provide fallback content
   - Detect WebGL support
   - Show appropriate message

2. **Performance on mobile**
   - Reduce particle count
   - Simplify 3D models
   - Use lower quality textures

3. **CORS issues**
   - Configure proper headers
   - Use same-origin policy
   - Implement proper CDN setup

### Debug Mode
```javascript
// Enable debug mode
const DEBUG = process.env.NODE_ENV === 'development';
if (DEBUG) {
  console.log('Debug mode enabled');
  // Show performance stats
  // Enable Three.js helpers
}
```

## 📞 Support

For deployment issues:
- **Technical Support**: dev@patelcapitalcorp.com
- **Documentation**: [GitHub Wiki](https://github.com/Patel-Capital-Corp/website/wiki)
- **Issues**: [GitHub Issues](https://github.com/Patel-Capital-Corp/website/issues)

---

**Last Updated**: June 2025  
**Version**: 1.0.0