# Patel Capital Corp - Immersive 3D Website

An advanced, immersive website for Patel Capital Corp featuring cutting-edge 3D animations, fixed viewport navigation, and sophisticated financial storytelling through interactive seesaw metaphors.

## 🚀 Features

### Core Experience
- **Fixed Viewport Navigation**: No traditional scrolling - navigate through 3D space like SeaCat Rossinavi
- **Interactive 3D Seesaw**: Central metaphor for financial balance and leverage
- **Advanced Animations**: GSAP-powered transitions with realistic physics
- **Immersive Storytelling**: Each interaction reinforces financial expertise narrative

### Technical Highlights
- **Three.js 3D Engine**: WebGL-powered 3D scenes with realistic lighting and materials
- **Performance Optimized**: Adaptive quality based on device capabilities
- **Responsive Design**: Full experience on desktop, optimized for mobile
- **Accessibility First**: WCAG 2.1 AAA compliance with screen reader support

### Visual Design
- **Dark Glossy Theme**: Premium black backgrounds with chrome/gray accents
- **Lime Green Highlights**: Strategic use of #32ff7e for CTAs and interactions
- **Glass Morphism**: Modern UI panels with backdrop blur effects
- **Custom Cursor**: Immersive cursor with particle trails

### Content Sections
- **Homepage**: Interactive seesaw with "Lever Up" and "Raise The World" buttons
- **Rocket Page**: AI and data science technology showcase
- **Debt Capital**: Comprehensive debt financing solutions
- **Equity Capital**: Strategic equity placement services
- **About**: Company foundation and technology integration
- **Services**: Full portfolio of financial solutions
- **Team**: Global presence across Chicago, Oklahoma City, and Mumbai
- **Contact**: Complete contact information and legal disclaimers

## 🛠 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **3D Graphics**: Three.js r128
- **Animations**: GSAP 3.12.2
- **Build Tools**: Native ES modules, no build step required
- **Server**: http-server for development

## 🎯 Company Identity

**Company Name**: Patel Capital Corp (PCM)  
**Tagline**: "Engineering Creative Finance"  
**Slogan**: "Control The Leverage"

**Mission**: Patel Capital Markets (PCM) stands apart in commercial real estate capital markets, renowned for solving complex capital challenges through advanced data science and AI.

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--pure-black: #000000
--obsidian-black: #0a0a0a
--charcoal-black: #141414

/* Chrome/Metallic Grays */
--polished-chrome: #2d2d2d
--brushed-steel: #3a3a3a
--gunmetal: #4a4a4a

/* Lime Green Accents */
--primary-lime: #32ff7e
--electric-lime: #3aff85
--neon-lime: #28f574
```

### Typography
- **Primary Font**: SF Pro Display, Helvetica Neue
- **Company Name**: Ultra-light weight, 0.3em letter spacing
- **Headings**: Light to regular weights
- **Body**: Optimized for readability with 1.7 line height

## 🚀 Getting Started

### Prerequisites
- Modern web browser with WebGL support
- Node.js (for development server)

### Installation
```bash
# Clone the repository
git clone https://github.com/Patel-Capital-Corp/website.git
cd website

# Install dependencies
npm install

# Start development server
npm run dev
```

The website will be available at `http://localhost:12000`

### Development
```bash
# Start development server with live reload
npm run dev

# Build for production (optimization)
npm run build

# Run tests
npm test
```

## 🎮 User Experience

### Navigation
- **Mouse Wheel**: Navigate between sections in 3D space
- **Keyboard**: Arrow keys, Page Up/Down, Home, Escape
- **Touch**: Swipe gestures on mobile devices
- **Buttons**: Interactive elements trigger complex animations

### Seesaw Animation Sequence
1. **Button Hover**: Glow and scale effects
2. **Click**: Button compression and particle burst
3. **Figure Preparation**: Human figure crouches and prepares
4. **Jump Execution**: Realistic physics-based jump with horizontal drift
5. **Seesaw Response**: Beam tilts with momentum and oscillation
6. **Dollar Ball Dynamics**: Bouncing and 3D rotation
7. **Camera Transition**: Smooth movement to first-person view
8. **Content Reveal**: New section materializes

### Performance Optimization
- **Adaptive Quality**: Automatically adjusts based on device performance
- **LOD System**: Level-of-detail for 3D models
- **Particle Culling**: Dynamic particle count adjustment
- **Efficient Rendering**: Frustum culling and object pooling

## 📱 Responsive Design

### Breakpoints
- **Desktop XL** (1920px+): Full experience with maximum quality
- **Desktop** (1366px-1919px): Optimized experience
- **Tablet Landscape** (1024px-1365px): Adapted experience
- **Tablet Portrait** (768px-1023px): Simplified experience
- **Mobile** (320px-767px): Essential features only

### Mobile Optimizations
- Touch-friendly interactions
- Simplified 3D scenes
- Reduced particle effects
- Optimized layouts

## ♿ Accessibility

### Features
- **Keyboard Navigation**: Full site accessible via keyboard
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Reduced Motion**: Respects user preferences
- **High Contrast**: Automatic detection and adaptation
- **Focus Management**: Clear focus indicators

### Compliance
- WCAG 2.1 AAA for text contrast
- WCAG 2.1 AA for interactive elements
- Section 508 compliance
- ADA compliance

## 🔧 Browser Support

### Minimum Requirements
- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

### WebGL Support
- Required for 3D features
- Graceful degradation for unsupported browsers
- Fallback content for accessibility

## 📊 Performance Metrics

### Target Metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Cumulative Layout Shift**: < 0.1
- **Frame Rate**: 60fps on target hardware

### Optimization Techniques
- Critical CSS inlining
- Progressive asset loading
- Code splitting
- Image optimization
- Compression (Gzip/Brotli)

## 🔒 Security

### Measures
- Content Security Policy (CSP)
- HTTPS enforcement
- Input sanitization
- XSS protection
- CSRF protection

## 📈 Analytics & SEO

### SEO Optimization
- Semantic HTML structure
- Meta tags and Open Graph
- Schema.org markup
- Sitemap generation
- Robot.txt configuration

### Analytics
- Performance monitoring
- User interaction tracking
- Error reporting
- A/B testing capabilities

## 🚀 Deployment

### Production Build
```bash
# Optimize assets
npm run build

# Deploy to hosting platform
# (Instructions vary by platform)
```

### Hosting Requirements
- Static file hosting
- HTTPS support
- Gzip/Brotli compression
- CDN recommended

## 🤝 Contributing

### Development Guidelines
- Follow existing code style
- Write semantic HTML
- Use CSS custom properties
- Comment complex logic
- Test across browsers

### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request
5. Code review process

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For technical support or questions:
- **Email**: dev@patelcapitalcorp.com
- **Issues**: GitHub Issues
- **Documentation**: [Wiki](https://github.com/Patel-Capital-Corp/website/wiki)

## 🙏 Acknowledgments

- **Three.js Community**: For the amazing 3D engine
- **GSAP Team**: For powerful animation tools
- **SeaCat Rossinavi**: Inspiration for immersive web experiences
- **WebGL Community**: For pushing web graphics forward

---

**Patel Capital Corp** - Engineering Creative Finance | Control The Leverage