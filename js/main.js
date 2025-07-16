/**
 * Patel Capital Corp - Main JavaScript
 * Advanced 3D Interactive Website with Seesaw System
 * Fixed Viewport Navigation with Three.js and GSAP
 */

class PatelCapitalWebsite {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.seesaw = null;
        this.humanFigure = null;
        this.dollarBall = null;
        this.particles = [];
        this.currentSection = 'homepage';
        this.isTransitioning = false;
        this.mousePosition = { x: 0, y: 0 };
        this.cursorTrails = [];
        this.animationId = null;
        
        // Performance settings
        this.performanceLevel = this.detectPerformanceLevel();
        this.particleCount = this.getParticleCount();
        
        // Initialize the website
        this.init();
    }

    /**
     * Detect device performance level for optimization
     */
    detectPerformanceLevel() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) return 'low';
        
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
        
        // Simple performance detection based on common GPU patterns
        if (renderer.includes('RTX') || renderer.includes('GTX 1080') || renderer.includes('RX 6')) {
            return 'high';
        } else if (renderer.includes('GTX') || renderer.includes('RX') || renderer.includes('Intel Iris')) {
            return 'medium';
        }
        
        return 'low';
    }

    /**
     * Get particle count based on performance level
     */
    getParticleCount() {
        const counts = {
            high: 500,
            medium: 300,
            low: 150
        };
        return counts[this.performanceLevel] || 150;
    }

    /**
     * Initialize the website
     */
    async init() {
        try {
            // Show loading screen
            this.showLoadingScreen();
            
            // Initialize components
            await this.initThreeJS();
            this.initCustomCursor();
            this.initEventListeners();
            this.initAccessibility();
            
            // Create 3D scene
            await this.createScene();
            await this.createSeesaw();
            await this.createHumanFigure();
            await this.createDollarBall();
            await this.createParticleSystem();
            await this.createLighting();
            
            // Start render loop
            this.animate();
            
            // Hide loading screen after everything is ready
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 2000);
            
            console.log('Patel Capital Corp website initialized successfully');
        } catch (error) {
            console.error('Error initializing website:', error);
            this.handleInitializationError(error);
        }
    }

    /**
     * Show loading screen
     */
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }

    /**
     * Hide loading screen
     */
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1000);
        }
    }

    /**
     * Handle initialization errors
     */
    handleInitializationError(error) {
        console.error('Initialization failed:', error);
        
        // Show fallback content
        const fallbackHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
                        background: #000; color: #fff; display: flex; align-items: center; 
                        justify-content: center; flex-direction: column; z-index: 10001;">
                <h1 style="font-size: 3rem; margin-bottom: 1rem;">PATEL CAPITAL CORP</h1>
                <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">Engineering Creative Finance</p>
                <p style="font-size: 1rem; color: #32ff7e;">Control The Leverage</p>
                <p style="margin-top: 2rem; color: #999;">
                    Your browser doesn't support WebGL. Please use a modern browser for the full experience.
                </p>
            </div>
        `;
        
        document.body.innerHTML = fallbackHTML;
    }

    /**
     * Initialize Three.js
     */
    async initThreeJS() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        this.scene.fog = new THREE.Fog(0x000000, 50, 200);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            45, // FOV
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1, // Near
            1000 // Far
        );
        this.camera.position.set(0, 5, 15);
        this.camera.lookAt(0, 0, 0);

        // Renderer
        const canvas = document.getElementById('three-canvas');
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: this.performanceLevel !== 'low',
            alpha: true,
            powerPreference: "high-performance"
        });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        
        // Enable shadows if performance allows
        if (this.performanceLevel !== 'low') {
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        }
    }

    /**
     * Create the main 3D scene
     */
    async createScene() {
        // Add ambient environment
        const geometry = new THREE.SphereGeometry(500, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0x0a0a0a,
            side: THREE.BackSide,
            transparent: true,
            opacity: 0.3
        });
        const skybox = new THREE.Mesh(geometry, material);
        this.scene.add(skybox);
    }

    /**
     * Create the seesaw system
     */
    async createSeesaw() {
        this.seesaw = new THREE.Group();

        // Fulcrum (base)
        const fulcrumGeometry = new THREE.CylinderGeometry(1, 2, 3, 32);
        const fulcrumMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x2d2d2d,
            metalness: 0.9,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        });
        const fulcrum = new THREE.Mesh(fulcrumGeometry, fulcrumMaterial);
        fulcrum.position.set(0, -1.5, 0);
        fulcrum.castShadow = true;
        fulcrum.receiveShadow = true;
        this.seesaw.add(fulcrum);

        // Seesaw beam
        const beamGeometry = new THREE.BoxGeometry(20, 0.5, 2);
        const beamMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x3a3a3a,
            metalness: 0.8,
            roughness: 0.2,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
        });
        this.seesawBeam = new THREE.Mesh(beamGeometry, beamMaterial);
        this.seesawBeam.position.set(0, 0, 0);
        this.seesawBeam.castShadow = true;
        this.seesawBeam.receiveShadow = true;
        this.seesaw.add(this.seesawBeam);

        // Circular base with rotation arrow
        const baseGeometry = new THREE.RingGeometry(3, 4, 64);
        const baseMaterial = new THREE.MeshBasicMaterial({
            color: 0x32ff7e,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.rotation.x = -Math.PI / 2;
        base.position.y = -3;
        this.seesaw.add(base);

        // Initial tilt (human side up, dollar side down)
        this.seesaw.rotation.z = -0.087; // -5 degrees

        this.scene.add(this.seesaw);
    }

    /**
     * Create the human figure
     */
    async createHumanFigure() {
        this.humanFigure = new THREE.Group();

        // Create a stylized human figure (not a stick figure)
        const humanMaterial = new THREE.MeshPhongMaterial({
            color: 0x1a1a1a,
            emissive: 0x32ff7e,
            emissiveIntensity: 0.1
        });

        // Head
        const headGeometry = new THREE.SphereGeometry(0.5, 16, 16);
        const head = new THREE.Mesh(headGeometry, humanMaterial);
        head.position.set(0, 2, 0);
        head.castShadow = true;
        this.humanFigure.add(head);

        // Torso
        const torsoGeometry = new THREE.BoxGeometry(1, 2, 0.5);
        const torso = new THREE.Mesh(torsoGeometry, humanMaterial);
        torso.position.set(0, 0.5, 0);
        torso.castShadow = true;
        this.humanFigure.add(torso);

        // Arms
        const armGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5);
        const leftArm = new THREE.Mesh(armGeometry, humanMaterial);
        leftArm.position.set(-0.8, 0.5, 0);
        leftArm.castShadow = true;
        this.humanFigure.add(leftArm);

        const rightArm = new THREE.Mesh(armGeometry, humanMaterial);
        rightArm.position.set(0.8, 0.5, 0);
        rightArm.castShadow = true;
        this.humanFigure.add(rightArm);

        // Legs
        const legGeometry = new THREE.CylinderGeometry(0.3, 0.3, 2);
        const leftLeg = new THREE.Mesh(legGeometry, humanMaterial);
        leftLeg.position.set(-0.3, -1.5, 0);
        leftLeg.castShadow = true;
        this.humanFigure.add(leftLeg);

        const rightLeg = new THREE.Mesh(legGeometry, humanMaterial);
        rightLeg.position.set(0.3, -1.5, 0);
        rightLeg.castShadow = true;
        this.humanFigure.add(rightLeg);

        // Position on left side of seesaw
        this.humanFigure.position.set(-7, 2.5, 0);
        this.scene.add(this.humanFigure);

        // Add idle animation
        this.addHumanIdleAnimation();
    }

    /**
     * Create the dollar ball
     */
    async createDollarBall() {
        // Create sphere
        const ballGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        const ballMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x32ff7e,
            metalness: 0.7,
            roughness: 0.3,
            emissive: 0x32ff7e,
            emissiveIntensity: 0.2,
            transparent: true,
            opacity: 0.9
        });
        
        this.dollarBall = new THREE.Mesh(ballGeometry, ballMaterial);
        this.dollarBall.position.set(7, 0.5, 0);
        this.dollarBall.castShadow = true;
        this.dollarBall.receiveShadow = true;

        // Add dollar sign
        const loader = new THREE.FontLoader();
        // For now, we'll use a simple approach without external font loading
        // In production, you would load a proper font
        
        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(2, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x32ff7e,
            transparent: true,
            opacity: 0.1
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.dollarBall.add(glow);

        this.scene.add(this.dollarBall);

        // Add idle rotation
        this.addDollarBallIdleAnimation();
    }

    /**
     * Create particle system
     */
    async createParticleSystem() {
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = this.particleCount;
        
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        for (let i = 0; i < particleCount; i++) {
            // Positions
            positions[i * 3] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
            
            // Colors (lime green variations)
            const color = new THREE.Color(0x32ff7e);
            color.setHSL(
                color.getHSL({}).h + (Math.random() - 0.5) * 0.1,
                color.getHSL({}).s,
                color.getHSL({}).l + (Math.random() - 0.5) * 0.2
            );
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
            
            // Sizes
            sizes[i] = Math.random() * 2 + 0.5;
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 2,
            sizeAttenuation: true,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        this.particleSystem = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(this.particleSystem);
        
        // Store particle data for animation
        this.particleData = {
            positions: positions,
            colors: colors,
            sizes: sizes,
            velocities: new Float32Array(particleCount * 3)
        };
        
        // Initialize velocities
        for (let i = 0; i < particleCount; i++) {
            this.particleData.velocities[i * 3] = (Math.random() - 0.5) * 0.02;
            this.particleData.velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
            this.particleData.velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
        }
    }

    /**
     * Create lighting system
     */
    async createLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambientLight);

        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 20, 10);
        directionalLight.castShadow = this.performanceLevel !== 'low';
        
        if (directionalLight.castShadow) {
            directionalLight.shadow.mapSize.width = 2048;
            directionalLight.shadow.mapSize.height = 2048;
            directionalLight.shadow.camera.near = 0.5;
            directionalLight.shadow.camera.far = 50;
            directionalLight.shadow.camera.left = -20;
            directionalLight.shadow.camera.right = 20;
            directionalLight.shadow.camera.top = 20;
            directionalLight.shadow.camera.bottom = -20;
        }
        
        this.scene.add(directionalLight);

        // Rim light (lime accent)
        const rimLight = new THREE.DirectionalLight(0x32ff7e, 0.3);
        rimLight.position.set(-10, 10, -10);
        this.scene.add(rimLight);

        // Point lights for accent
        const pointLight1 = new THREE.PointLight(0x32ff7e, 0.5, 50);
        pointLight1.position.set(-10, 5, 10);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x32ff7e, 0.5, 50);
        pointLight2.position.set(10, 5, -10);
        this.scene.add(pointLight2);
    }

    /**
     * Add idle animation to human figure
     */
    addHumanIdleAnimation() {
        const breathingTween = gsap.to(this.humanFigure.scale, {
            y: 1.02,
            duration: 3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });

        const swayTween = gsap.to(this.humanFigure.rotation, {
            z: 0.02,
            duration: 4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
    }

    /**
     * Add idle animation to dollar ball
     */
    addDollarBallIdleAnimation() {
        const rotationTween = gsap.to(this.dollarBall.rotation, {
            y: Math.PI * 2,
            duration: 10,
            ease: "none",
            repeat: -1
        });

        const floatTween = gsap.to(this.dollarBall.position, {
            y: this.dollarBall.position.y + 0.2,
            duration: 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
    }

    /**
     * Initialize custom cursor
     */
    initCustomCursor() {
        const cursor = document.getElementById('cursor');
        
        // Hide default cursor
        document.body.style.cursor = 'none';
        
        // Create cursor trails
        for (let i = 0; i < 5; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            document.body.appendChild(trail);
            this.cursorTrails.push({
                element: trail,
                x: 0,
                y: 0
            });
        }
    }

    /**
     * Initialize event listeners
     */
    initEventListeners() {
        // Mouse movement
        document.addEventListener('mousemove', (event) => {
            this.mousePosition.x = event.clientX;
            this.mousePosition.y = event.clientY;
            this.updateCustomCursor();
        });

        // Wheel events for navigation
        document.addEventListener('wheel', (event) => {
            event.preventDefault();
            this.handleWheelNavigation(event);
        }, { passive: false });

        // Button clicks
        document.getElementById('lever-up')?.addEventListener('click', () => {
            this.triggerSeesawAnimation('debt');
        });

        document.getElementById('raise-world')?.addEventListener('click', () => {
            this.triggerSeesawAnimation('equity');
        });

        // Back buttons
        document.querySelectorAll('.back-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const target = event.target.getAttribute('data-target');
                this.navigateToSection(target || 'homepage');
            });
        });

        // Navigation items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (event) => {
                const section = event.target.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (event) => {
            this.handleKeyboardNavigation(event);
        });

        // Touch events for mobile
        document.addEventListener('touchstart', (event) => {
            this.handleTouchStart(event);
        }, { passive: false });

        document.addEventListener('touchmove', (event) => {
            this.handleTouchMove(event);
        }, { passive: false });
    }

    /**
     * Initialize accessibility features
     */
    initAccessibility() {
        // Screen reader announcements
        this.announcer = document.getElementById('screen-reader-announcements');
        
        // Reduced motion detection
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) {
            this.disableAnimations();
        }
        
        // High contrast detection
        const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
        if (prefersHighContrast.matches) {
            document.body.classList.add('high-contrast');
        }
    }

    /**
     * Update custom cursor position
     */
    updateCustomCursor() {
        const cursor = document.getElementById('cursor');
        if (cursor) {
            cursor.style.left = this.mousePosition.x + 'px';
            cursor.style.top = this.mousePosition.y + 'px';
        }

        // Update cursor trails with delay
        this.cursorTrails.forEach((trail, index) => {
            const delay = (index + 1) * 0.1;
            gsap.to(trail, {
                x: this.mousePosition.x,
                y: this.mousePosition.y,
                duration: delay,
                ease: "power2.out"
            });
            
            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
        });
    }

    /**
     * Handle wheel navigation
     */
    handleWheelNavigation(event) {
        if (this.isTransitioning) return;

        const delta = event.deltaY;
        const threshold = 50;

        if (Math.abs(delta) > threshold) {
            if (this.currentSection === 'homepage') {
                // Scroll down to rocket page
                if (delta > 0) {
                    this.navigateToSection('rocket');
                }
            } else if (this.currentSection === 'rocket') {
                // Scroll up back to homepage
                if (delta < 0) {
                    this.navigateToSection('homepage');
                }
            }
        }
    }

    /**
     * Handle keyboard navigation
     */
    handleKeyboardNavigation(event) {
        if (this.isTransitioning) return;

        switch (event.key) {
            case 'ArrowDown':
            case 'PageDown':
                event.preventDefault();
                if (this.currentSection === 'homepage') {
                    this.navigateToSection('rocket');
                }
                break;
            case 'ArrowUp':
            case 'PageUp':
                event.preventDefault();
                if (this.currentSection === 'rocket') {
                    this.navigateToSection('homepage');
                }
                break;
            case 'Home':
                event.preventDefault();
                this.navigateToSection('homepage');
                break;
            case 'Escape':
                event.preventDefault();
                this.navigateToSection('homepage');
                break;
        }
    }

    /**
     * Handle touch events for mobile
     */
    handleTouchStart(event) {
        this.touchStartY = event.touches[0].clientY;
    }

    handleTouchMove(event) {
        if (!this.touchStartY) return;

        const touchEndY = event.touches[0].clientY;
        const deltaY = this.touchStartY - touchEndY;
        const threshold = 50;

        if (Math.abs(deltaY) > threshold) {
            event.preventDefault();
            
            if (deltaY > 0 && this.currentSection === 'homepage') {
                // Swipe up - go to rocket
                this.navigateToSection('rocket');
            } else if (deltaY < 0 && this.currentSection === 'rocket') {
                // Swipe down - go to homepage
                this.navigateToSection('homepage');
            }
            
            this.touchStartY = null;
        }
    }

    /**
     * Trigger seesaw animation
     */
    triggerSeesawAnimation(type) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.announceToScreenReader(`Navigating to ${type} capital section`);

        // Create master timeline
        const masterTimeline = gsap.timeline({
            onComplete: () => {
                this.isTransitioning = false;
                this.navigateToSection(type);
            }
        });

        // Phase 1: Button feedback and preparation
        masterTimeline
            .to(`#${type === 'debt' ? 'lever-up' : 'raise-world'}`, {
                scale: 0.95,
                duration: 0.1,
                ease: "power2.out"
            })
            .to(`#${type === 'debt' ? 'lever-up' : 'raise-world'}`, {
                scale: 1.05,
                duration: 0.2,
                ease: "elastic.out(1, 0.5)"
            });

        // Phase 2: Human figure preparation
        masterTimeline
            .to(this.humanFigure.rotation, {
                x: -0.1,
                duration: 0.3,
                ease: "power2.inOut"
            }, 0.3)
            .to(this.humanFigure.scale, {
                y: 0.9,
                duration: 0.2,
                ease: "power2.inOut"
            }, 0.4);

        // Phase 3: Jump execution
        const jumpDirection = type === 'debt' ? -2 : 2;
        masterTimeline
            .to(this.humanFigure.position, {
                y: this.humanFigure.position.y + 8,
                x: this.humanFigure.position.x + jumpDirection,
                duration: 0.7,
                ease: "power2.out"
            }, 0.8)
            .to(this.humanFigure.rotation, {
                z: type === 'debt' ? -0.2 : 0.2,
                duration: 0.7,
                ease: "power2.inOut"
            }, 0.8)
            .to(this.humanFigure.scale, {
                y: 1.1,
                duration: 0.3,
                ease: "power2.out"
            }, 0.8);

        // Phase 4: Seesaw response
        const seesawRotation = type === 'debt' ? -0.5 : 0.5; // ~30 degrees
        masterTimeline
            .to(this.seesaw.rotation, {
                z: seesawRotation,
                duration: 0.8,
                ease: "power2.inOut"
            }, 1.0);

        // Phase 5: Dollar ball dynamics
        masterTimeline
            .to(this.dollarBall.position, {
                y: this.dollarBall.position.y + (type === 'debt' ? 8 : -2),
                duration: 0.6,
                ease: "power2.out"
            }, 1.2)
            .to(this.dollarBall.rotation, {
                x: "+=6.28", // Full rotation
                y: "+=6.28",
                duration: 0.8,
                ease: "power2.inOut"
            }, 1.2)
            .to(this.dollarBall.scale, {
                x: 1.2,
                y: 0.8,
                z: 1.2,
                duration: 0.1,
                ease: "power2.out",
                yoyo: true,
                repeat: 1
            }, 1.5);

        // Phase 6: Landing
        masterTimeline
            .to(this.humanFigure.position, {
                y: type === 'debt' ? 0.5 : 4.5,
                duration: 0.5,
                ease: "power2.in"
            }, 1.5)
            .to(this.humanFigure.scale, {
                y: 0.8,
                duration: 0.1,
                ease: "power2.out"
            }, 2.0)
            .to(this.humanFigure.scale, {
                y: 1.0,
                duration: 0.3,
                ease: "elastic.out(1, 0.5)"
            }, 2.1);

        // Phase 7: Camera transition
        const cameraTarget = type === 'debt' ? 
            { x: -10, y: 1, z: 2 } : 
            { x: 10, y: 6, z: 2 };
            
        masterTimeline
            .to(this.camera.position, {
                x: cameraTarget.x,
                y: cameraTarget.y,
                z: cameraTarget.z,
                duration: 1.5,
                ease: "power3.inOut"
            }, 1.5)
            .to(this.camera.rotation, {
                y: type === 'debt' ? 0.3 : -0.3,
                duration: 1.5,
                ease: "power3.inOut"
            }, 1.5);

        // Phase 8: UI transition
        masterTimeline
            .to('#homepage-ui', {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut"
            }, 2.5);
    }

    /**
     * Navigate to section
     */
    navigateToSection(sectionName) {
        if (this.isTransitioning || this.currentSection === sectionName) return;

        this.isTransitioning = true;
        this.announceToScreenReader(`Navigating to ${sectionName} section`);

        // Hide current section
        const currentUI = document.getElementById(`${this.currentSection}-ui`);
        const targetUI = document.getElementById(`${sectionName}-ui`);

        if (currentUI) {
            gsap.to(currentUI, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut",
                onComplete: () => {
                    currentUI.classList.remove('active');
                }
            });
        }

        // Camera transitions based on section
        let cameraPosition, cameraRotation;
        
        switch (sectionName) {
            case 'homepage':
                cameraPosition = { x: 0, y: 5, z: 15 };
                cameraRotation = { x: 0, y: 0, z: 0 };
                // Reset seesaw
                gsap.to(this.seesaw.rotation, {
                    z: -0.087,
                    duration: 1,
                    ease: "power2.inOut"
                });
                // Reset human figure
                gsap.to(this.humanFigure.position, {
                    x: -7,
                    y: 2.5,
                    z: 0,
                    duration: 1,
                    ease: "power2.inOut"
                });
                // Reset dollar ball
                gsap.to(this.dollarBall.position, {
                    x: 7,
                    y: 0.5,
                    z: 0,
                    duration: 1,
                    ease: "power2.inOut"
                });
                break;
            case 'rocket':
                cameraPosition = { x: 0, y: 10, z: 25 };
                cameraRotation = { x: -0.2, y: 0, z: 0 };
                break;
            case 'debt':
                cameraPosition = { x: -10, y: 1, z: 2 };
                cameraRotation = { x: 0, y: 0.3, z: 0 };
                break;
            case 'equity':
                cameraPosition = { x: 10, y: 6, z: 2 };
                cameraRotation = { x: 0, y: -0.3, z: 0 };
                break;
            default:
                cameraPosition = { x: 0, y: 5, z: 15 };
                cameraRotation = { x: 0, y: 0, z: 0 };
        }

        // Animate camera
        gsap.to(this.camera.position, {
            x: cameraPosition.x,
            y: cameraPosition.y,
            z: cameraPosition.z,
            duration: 1.5,
            ease: "power3.inOut"
        });

        gsap.to(this.camera.rotation, {
            x: cameraRotation.x,
            y: cameraRotation.y,
            z: cameraRotation.z,
            duration: 1.5,
            ease: "power3.inOut"
        });

        // Show target section
        setTimeout(() => {
            if (targetUI) {
                targetUI.classList.add('active');
                gsap.to(targetUI, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.inOut"
                });
            }
            
            this.currentSection = sectionName;
            this.isTransitioning = false;
        }, 1000);
    }

    /**
     * Handle window resize
     */
    handleResize() {
        if (!this.camera || !this.renderer) return;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
     * Announce to screen reader
     */
    announceToScreenReader(message) {
        if (this.announcer) {
            this.announcer.textContent = message;
        }
    }

    /**
     * Disable animations for reduced motion
     */
    disableAnimations() {
        gsap.globalTimeline.timeScale(0.01);
    }

    /**
     * Update particle system
     */
    updateParticles() {
        if (!this.particleSystem || !this.particleData) return;

        const positions = this.particleData.positions;
        const velocities = this.particleData.velocities;
        const particleCount = positions.length / 3;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Update positions
            positions[i3] += velocities[i3];
            positions[i3 + 1] += velocities[i3 + 1];
            positions[i3 + 2] += velocities[i3 + 2];

            // Boundary checks
            if (Math.abs(positions[i3]) > 50) velocities[i3] *= -1;
            if (Math.abs(positions[i3 + 1]) > 25) velocities[i3 + 1] *= -1;
            if (Math.abs(positions[i3 + 2]) > 50) velocities[i3 + 2] *= -1;

            // Mouse interaction
            const mouseX = (this.mousePosition.x / window.innerWidth) * 2 - 1;
            const mouseY = -(this.mousePosition.y / window.innerHeight) * 2 + 1;
            
            const distance = Math.sqrt(
                Math.pow(positions[i3] - mouseX * 50, 2) +
                Math.pow(positions[i3 + 1] - mouseY * 25, 2)
            );

            if (distance < 10) {
                const force = (10 - distance) / 10;
                velocities[i3] += (positions[i3] - mouseX * 50) * force * 0.001;
                velocities[i3 + 1] += (positions[i3 + 1] - mouseY * 25) * force * 0.001;
            }
        }

        this.particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    /**
     * Main animation loop
     */
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        // Update particles
        this.updateParticles();

        // Render scene
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Cleanup and destroy
     */
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        // Cleanup Three.js
        if (this.renderer) {
            this.renderer.dispose();
        }

        // Cleanup GSAP
        gsap.killTweensOf("*");

        // Remove event listeners
        document.removeEventListener('mousemove', this.updateCustomCursor);
        document.removeEventListener('wheel', this.handleWheelNavigation);
        window.removeEventListener('resize', this.handleResize);
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for WebGL support
    if (!window.WebGLRenderingContext) {
        console.error('WebGL not supported');
        return;
    }

    // Initialize the website
    window.patelCapitalWebsite = new PatelCapitalWebsite();
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.patelCapitalWebsite) {
        window.patelCapitalWebsite.destroy();
    }
});