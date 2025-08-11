// Jerry James Portfolio - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoadingScreen();
    initializeNavigation();
    initializeScrollAnimations();
    initializePortfolioFilters();
    initializeContactForm();
    initializeSmoothScrolling();
    enableLogoBarDragScroll();
    updateYearsExperience();
    initializeHeroVisuals();
    initializeScrambleAnimation()
    initializeSmartGlow()
});

// Loading Screen Animation
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Remove from DOM after animation completes
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 2000);
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // This new function just adds or removes the '.scrolled' class
    function updateNavbarOnScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    }
    window.addEventListener('scroll', updateNavbarOnScroll);
    updateNavbarOnScroll();
}

function initializeSmartGlow() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let titleData = [];
    
    // --- THE FIX: This function now finds ALL titles ---
    function cacheTitlePositions() {
        // 1. Select both the hero title and the section titles
        const heroTitle = document.querySelector('.hero-name');
        const sectionTitles = document.querySelectorAll('.section-title');

        // 2. Create a combined list of all title elements
        const allTitles = [];
        if (heroTitle) {
            allTitles.push(heroTitle); // Add the hero title first
        }
        allTitles.push(...sectionTitles); // Add the rest of the titles

        // 3. Map over the combined list to get their positions
        titleData = allTitles.map(title => {
            const rect = title.getBoundingClientRect();
            return {
                top: rect.top + window.scrollY,
                centerX: rect.left + window.scrollY + rect.width / 2
            };
        });
    }

    const activationRange = 500;
    const baseGlow = { size: 50, opacity: 0.4 };
    const peakGlow = { size: 300, opacity: 0.8 };
    const glowColorRgb = '0, 212, 255'; // Electric Blue

    function updateGlow() {
        const scrollY = window.scrollY;
        const navBottom = scrollY + navbar.offsetHeight;

        let prevTitle = null;
        let nextTitle = null;
        for (const title of titleData) {
            if (title.top < navBottom) {
                prevTitle = title;
            } else {
                nextTitle = title;
                break;
            }
        }
        
        const distToPrev = prevTitle ? navBottom - prevTitle.top : Infinity;
        const distToNext = nextTitle ? nextTitle.top - navBottom : Infinity;
        const activeTitle = distToNext < distToPrev ? nextTitle : prevTitle;
        const closestDist = Math.min(distToPrev, distToNext);

        let intensity = 0;
        if (activeTitle && closestDist < activationRange) {
            intensity = 1 - (closestDist / activationRange);
        }
        intensity = Math.max(0, intensity);

        const sizeX = baseGlow.size + (peakGlow.size - baseGlow.size) * intensity;
        const opacity = baseGlow.opacity + (peakGlow.opacity - baseGlow.opacity) * intensity;
        
        if (activeTitle) {
            navbar.style.setProperty('--glow-position-x', `${activeTitle.centerX}px`);
        }
        navbar.style.setProperty('--glow-size', `${sizeX}px 5px`);
        navbar.style.setProperty('--glow-color', `rgba(${glowColorRgb}, ${opacity})`);
        navbar.style.setProperty('--glow-opacity', '1');

        requestAnimationFrame(updateGlow);
    }

    cacheTitlePositions();
    requestAnimationFrame(updateGlow);
    window.addEventListener('resize', cacheTitlePositions);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Scroll-triggered animations
function initializeScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const timeline = document.querySelector('.timeline');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate timeline items
                if (entry.target.contains(timeline)) {
                    animateTimelineItems();
                }
                
                // Animate skill tags
                if (entry.target.id === 'skills') {
                    animateSkillTags();
                }
                
                // Animate service cards
                if (entry.target.id === 'services') {
                    animateServiceCards();
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Animate timeline items
function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Animate skill tags
function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0) scale(1)';
        }, index * 50);
    });
}

// Animate service cards
function animateServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

function initializeHeroVisuals() {
    const svgPath = document.getElementById('hero-blob-path');
    const heroSection = document.getElementById('hero');
    if (!svgPath || !heroSection) return;

    // --- CONFIGURATION ---
    const BLOB_RADIUS = 200;
    const MAX_STRETCH = 75;
    const BLOB_POINTS = 8;
    const BLOB_NOISE_SPEED = 0.003;
    const BLOB_NOISE_AMOUNT = 0.15;
    const MOUSE_FOLLOW_SPEED = 0.08; 

    // --- STATE & CORE VARIABLES ---
    let time = 0;
    let rect = heroSection.getBoundingClientRect();
    let centerX = rect.width / 2;
    let centerY = rect.height / 2;

    // Real mouse position
    let mouseX = centerX;
    let mouseY = centerY;

    let virtualMouseX = centerX;
    let virtualMouseY = centerY;

    // --- HELPER FUNCTIONS ---
    function lerp(start, end, amount) { return start * (1 - amount) + end * amount; }

    function createBlobPath(points) {
        if (points.length < 3) return '';
        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 0; i < points.length; i++) {
            const p1 = points[i];
            const p2 = points[(i + 1) % points.length];
            const midPoint = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
            d += ` Q ${p1.x},${p1.y} ${midPoint.x},${midPoint.y}`;
        }
        d += ' Z';
        return d;
    }

    // --- THE MAIN ANIMATION LOOP ---
    function animate() {
        time += BLOB_NOISE_SPEED;

        // --- THE FIX: Smoothly move the virtual mouse towards the real mouse ---
        virtualMouseX = lerp(virtualMouseX, mouseX, MOUSE_FOLLOW_SPEED);
        virtualMouseY = lerp(virtualMouseY, mouseY, MOUSE_FOLLOW_SPEED);

        // All calculations now use the SMOOTHED virtual mouse position
        const mouseAngle = Math.atan2(virtualMouseY - centerY, virtualMouseX - centerX);
        const mouseDistance = Math.hypot(virtualMouseX - centerX, virtualMouseY - centerY);
        const pullIntensity = Math.min(mouseDistance / (rect.width / 3), 1);

        const points = [];
        for (let i = 0; i < BLOB_POINTS; i++) {
            const angle = (i / BLOB_POINTS) * Math.PI * 2;
            const noiseFactor = 1 + BLOB_NOISE_AMOUNT * Math.sin(time + i * 2);
            const alignment = (Math.cos(angle - mouseAngle) + 1) / 2;
            const stretch = pullIntensity * MAX_STRETCH * alignment;
            const finalRadius = (BLOB_RADIUS + stretch) * noiseFactor;

            points.push({
                x: Math.cos(angle) * finalRadius,
                y: Math.sin(angle) * finalRadius
            });
        }
        
        svgPath.setAttribute('d', createBlobPath(points));
        requestAnimationFrame(animate);
    }

    // --- EVENT HANDLERS & INITIALIZATION (Unchanged logic) ---
    
    svgPath.style.transform = `translate(${centerX}px, ${centerY}px)`;

    const onMouseMove = (e) => {
        const currentRect = heroSection.getBoundingClientRect();
        mouseX = e.clientX - currentRect.left;
        mouseY = e.clientY - currentRect.top;
    };
    
    const onMouseLeave = () => {
        // Set the TARGET for the virtual mouse back to the center
        mouseX = centerX;
        mouseY = centerY;
    };

    heroSection.addEventListener('mousemove', onMouseMove);
    heroSection.addEventListener('mouseleave', onMouseLeave);

    window.addEventListener('resize', () => { 
        rect = heroSection.getBoundingClientRect(); 
        centerX = rect.width / 2;
        centerY = rect.height / 2;
        // On resize, snap everything back to the new center to avoid weirdness
        mouseX = centerX;
        mouseY = centerY;
        virtualMouseX = centerX;
        virtualMouseY = centerY;
        svgPath.style.transform = `translate(${centerX}px, ${centerY}px)`;
    });

    animate(); 
}

// Portfolio filtering functionality
function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                } else {
                    item.classList.add('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                }
            });
        });
    });
}

// Contact form handling
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const formInputs = form.querySelectorAll('.form-control');
    
    // Add focus animations to form inputs
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scramble animation for hero subtitle
function initializeScrambleAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const texts = [
        'Technical Marketing Strategy',
        'B2B & B2C Narratives',
        'Inbound Marketing Campaigns',
        'Content Marketing Wizard'
    ];
    let textIndex = 0;
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    let frameRequest;
    let frame = 0;
    let queue = [];

    const setText = (newText) => {
        const oldText = typingElement.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => {
            queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 55);
                const end = start + Math.floor(Math.random() * 55);
                queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(frameRequest);
            frame = 0;
            update();
            setTimeout(resolve, 2000); // Wait for animation to finish
        });
        return promise;
    };

    const update = () => {
        let output = '';
        let complete = 0;
        for (let i = 0, n = queue.length; i < n; i++) {
            let { from, to, start, end, char } = queue[i];
            if (frame >= end) {
                complete++;
                output += to;
            } else if (frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = chars[Math.floor(Math.random() * chars.length)];
                    queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        typingElement.innerHTML = output;
        if (complete === queue.length) return;
        frameRequest = requestAnimationFrame(update);
        frame++;
    };

    async function next() {
        await setText(texts[textIndex]);
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(next, 2000); // Time between phrases
    }
    
    // Start the animation after a delay
    setTimeout(next, 2500);
}

// Calculate and update years of experience in hero-subtitle
function updateYearsExperience() {
    const start = new Date(2014, 7); // August is month 7 (0-indexed)
    const now = new Date();
    let years = now.getFullYear() - start.getFullYear();
    if (now.getMonth() < 7) years--;
    const el = document.getElementById('years-experience');
    if (el) el.textContent = years;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(20, 184, 166, 0.95)' : 'rgba(239, 68, 68, 0.95)'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    if (hero && heroBackground) {
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects for interactive elements
document.addEventListener('mouseover', (e) => {
    // Add hover effect to cards
    if (e.target.closest('.service-card, .portfolio-card, .skill-category')) {
        const card = e.target.closest('.service-card, .portfolio-card, .skill-category');
        card.style.transform = 'translateY(-10px)';
    }
    
    // Add hover effect to buttons
    if (e.target.closest('.btn')) {
        const btn = e.target.closest('.btn');
        if (btn.classList.contains('btn--primary')) {
            btn.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.3)';
        }
    }
});

document.addEventListener('mouseout', (e) => {
    // Remove hover effects
    if (e.target.closest('.service-card, .portfolio-card, .skill-category')) {
        const card = e.target.closest('.service-card, .portfolio-card, .skill-category');
        card.style.transform = '';
    }
    
    if (e.target.closest('.btn')) {
        const btn = e.target.closest('.btn');
        btn.style.boxShadow = '';
    }
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

// Initialize CSS animations for elements that need them
function initializeElementAnimations() {
    // Set initial states for animated elements
    const animatedElements = document.querySelectorAll('.timeline-item, .skill-tag, .service-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}

// Call initialization functions
initializeElementAnimations();

// Add loading states and error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Add accessibility improvements
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Enable drag scrolling for logo bar - Fix #5 (Working)
function enableLogoBarDragScroll() {
    try {
        const wrapper = document.querySelector('.logo-bar-wrapper');
        const bar = wrapper ? wrapper.querySelector('.logo-bar-scroller') : null;
        
        if (!wrapper || !bar) {
            console.warn('Logo bar elements not found - drag scroll disabled');
            return;
        }

        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let startTranslateOnDrag = 0;
        let animationFrameId = null;

        const speed = 50; // Pixels per second

        const animate = () => {
            if (!isDragging) {
                currentTranslate -= speed / 60;
                
                const loopWidth = bar.scrollWidth / 2;
                // Check for wrapping in BOTH directions.
                
                // 1. If it goes too far left, wrap it to the beginning.
                if (currentTranslate <= -loopWidth) {
                    currentTranslate += loopWidth;
                }
                
                // 2. If it goes too far right (from dragging), wrap it to the end.
                if (currentTranslate > 0) {
                    currentTranslate -= loopWidth;
                }
                
                bar.style.transform = `translateX(${currentTranslate}px)`;
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        
        const onDragStart = (pageX) => {
            isDragging = true;
            wrapper.classList.add('dragging');
            bar.classList.add('dragging');
            startX = pageX;
            startTranslateOnDrag = currentTranslate;
            document.body.style.userSelect = 'none';
        };
        
        const onDragMove = (pageX) => {
            if (!isDragging) return;
            const dx = pageX - startX;
            currentTranslate = startTranslateOnDrag + dx;
            bar.style.transform = `translateX(${currentTranslate}px)`;
        };
        
        const onDragEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            wrapper.classList.remove('dragging');
            bar.classList.remove('dragging');
            
            // Normalize the final position to keep the loop clean.
            const loopWidth = bar.scrollWidth / 2;
            currentTranslate = currentTranslate % loopWidth;

            document.body.style.userSelect = '';
        };

        wrapper.addEventListener('mousedown', (e) => {
            e.preventDefault();
            onDragStart(e.pageX);
        });
        window.addEventListener('mousemove', (e) => {
            onDragMove(e.pageX);
        });
        window.addEventListener('mouseup', onDragEnd);
        window.addEventListener('mouseleave', onDragEnd);

        wrapper.addEventListener('touchstart', (e) => {
            onDragStart(e.touches[0].pageX);
        }, { passive: true });
        window.addEventListener('touchmove', (e) => {
             if (isDragging) {
                onDragMove(e.touches[0].pageX)
             }
        });
        window.addEventListener('touchend', onDragEnd);
        
        animate();

    } catch (error) {
        console.error('Logo bar drag scroll initialization failed:', error);
    }
}

// Add preload for better performance
function preloadCriticalResources() {
    // Preload critical CSS variables and fonts
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://r2cdn.perplexity.ai/fonts/FKGroteskNeue.woff2';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
}

preloadCriticalResources();

// Final initialization check
console.log('Jerry James Portfolio initialized successfully! 🚀');
