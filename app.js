// Jerry James Portfolio - Interactive JavaScript

const config = {
    loadingScreenDuration: 2000,
    notificationDuration: 5000,
    scrambleAnimation: {
        texts: [
            'Technical Marketing Strategy',
            'B2B & B2C Narratives',
            'Inbound Marketing Campaigns',
            'Content Marketing Wizard'
        ],
        delayBetweenTexts: 2000,
        initialDelay: 2500
    },
    heroBlob: {
        radius: 300,
        maxStretch: 120,
        points: 100,
        noiseSpeed: 0.003,
        noiseAmount: 0.15,
        mouseFollowSpeed: 0.08
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoadingScreen();
    initializeNavigation();
    initializeScrollAnimations();
    generateSkills();
    generateServices();
    generatePortfolioItems();
    initializePortfolioFilters();
    initializeContactForm();
    initializeSmoothScrolling();
    updateYearsExperience();
    initializeHeroVisuals();
    initializeScrambleAnimation();
    initializeSmartGlow();
    initializeLogoCarousel();
    initializeExpandableHighlights();
    cacheSectionPositions();
    initializeParallaxEffect();
    initializeExperienceInspector();
});


// Loading Screen Animation
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500); // Left this as is because it's part of a CSS animation
    }, config.loadingScreenDuration); // Use config value instead of hardcoded
}

// Navigation functionality
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

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
}

// Handles the navbar's background style change on scroll
function initializeNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // This new function just adds or removes the '.scrolled' class
    function updateNavbarOnScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink(); // This function is still needed here
    }
    window.addEventListener('scroll', updateNavbarOnScroll);
    updateNavbarOnScroll();
}

// Navigation functionality
function initializeNavigation() {
    initializeMobileMenu();
    initializeNavbarScroll();
}

function initializeSmartGlow() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let titleData = [];
    
    function cacheTitlePositions() {
        // Select both the hero title and the section titles
        const heroTitle = document.querySelector('.hero-name');
        const sectionTitles = document.querySelectorAll('.section-title');

        // Create a combined list of all title elements
        const allTitles = [];
        if (heroTitle) {
            allTitles.push(heroTitle); // Add the hero title first
        }
        allTitles.push(...sectionTitles); // Add the rest of the titles

        // Map over the combined list to get positions
        titleData = allTitles.map(title => {
        const rect = title.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            centerX: rect.left + rect.width / 2
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
        if (scrollY < 10) {
            intensity = 0;
        }
        const sizeX = baseGlow.size + (peakGlow.size - baseGlow.size) * intensity;
        const opacity = baseGlow.opacity + (peakGlow.opacity - baseGlow.opacity) * intensity;
        
        if (activeTitle) {
            navbar.style.setProperty('--glow-position-x', `${activeTitle.centerX}px`);
        }
        navbar.style.setProperty('--glow-size', `${sizeX}px 5px`);
        navbar.style.setProperty('--glow-color', `rgba(${glowColorRgb}, ${opacity})`);
        navbar.style.setProperty('--glow-opacity', intensity);
        requestAnimationFrame(updateGlow);
    }

    cacheTitlePositions();
    requestAnimationFrame(updateGlow);
    window.addEventListener('resize', cacheTitlePositions);
}

let sectionData = [];
// Read DOM properties and store them in cache
function cacheSectionPositions() {
    const sections = document.querySelectorAll('section[id]');
    sectionData = Array.from(sections).map(section => {
        return {
            id: section.getAttribute('id'),
            // Read from DOM here, only once.
            top: section.offsetTop - 100, // Apply the offset during caching
            height: section.offsetHeight
        };
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const scrollY = window.scrollY;
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSectionId = '';

    // Read from cached data, instead of DOM
    for (const section of sectionData) {
        if (scrollY >= section.top && scrollY < section.top + section.height) {
            currentSectionId = section.id;
            break; // Exit the loop when it finds an active section
        }
    }
    // Write to the DOM
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
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
            // The observer's only job now is to add the .visible class.
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

function initializeHeroVisuals() {
    const svgPath = document.getElementById('hero-blob-path');
    const heroSection = document.getElementById('hero');
    if (!svgPath || !heroSection) return;

    // --- CONFIGURATION ---
    // Replace hardcoded consts with values from the config object
    const { radius, maxStretch, points, noiseSpeed, noiseAmount, mouseFollowSpeed } = config.heroBlob;

    // --- STATE & CORE VARIABLES ---
    let time = 0;
    let rect = heroSection.getBoundingClientRect();
    let centerX = rect.width / 2;
    let centerY = rect.height / 2;

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
        time += noiseSpeed; // Use config value
        virtualMouseX = lerp(virtualMouseX, mouseX, mouseFollowSpeed); // Use config value
        virtualMouseY = lerp(virtualMouseY, mouseY, mouseFollowSpeed); // Use config value
        const mouseAngle = Math.atan2(virtualMouseY - centerY, virtualMouseX - centerX);
        const mouseDistance = Math.hypot(virtualMouseX - centerX, virtualMouseY - centerY);
        const pullIntensity = Math.min(mouseDistance / (rect.width / 3), 1);
        const generatedPoints = [];
        for (let i = 0; i < points; i++) { // Use config value
            const angle = (i / points) * Math.PI * 2;
            const noiseFactor = 1 + noiseAmount * Math.sin(time + i * 2); // Use config value
            const alignment = (Math.cos(angle - mouseAngle) + 1) / 2;
            const stretch = pullIntensity * maxStretch * alignment; // Use config value
            const finalRadius = (radius + stretch) * noiseFactor; // Use config value
            generatedPoints.push({
                x: Math.cos(angle) * finalRadius,
                y: Math.sin(angle) * finalRadius
            });
        }
        svgPath.setAttribute('d', createBlobPath(generatedPoints));
        requestAnimationFrame(animate);
    }

    // --- The rest of the function (bindHeroEvents, etc.) remains the same ---
    function bindHeroEvents() {
        const onMouseMove = (e) => {
            const currentRect = heroSection.getBoundingClientRect();
            mouseX = e.clientX - currentRect.left;
            mouseY = e.clientY - currentRect.top;
        };
        
        const onMouseLeave = () => {
            mouseX = centerX;
            mouseY = centerY;
        };

        heroSection.addEventListener('mousemove', onMouseMove);
        heroSection.addEventListener('mouseleave', onMouseLeave);

        window.addEventListener('resize', () => { 
            rect = heroSection.getBoundingClientRect(); 
            centerX = rect.width / 2;
            centerY = rect.height / 2;
            mouseX = centerX;
            mouseY = centerY;
            virtualMouseX = centerX;
            virtualMouseY = centerY;
            svgPath.style.transform = `translate(${centerX}px, ${centerY}px)`;
        });
    }

    svgPath.style.transform = `translate(${centerX}px, ${centerY}px)`;
    bindHeroEvents();
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

    // --- State & Configuration ---
    const texts = config.scrambleAnimation.texts;
    let textIndex = 0;
    
    // --- Performance & Browser Detection ---
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    let useFallback = isSafari; // Start by using fallback for Safari
    let performanceCheckComplete = isSafari; // No need to check performance on Safari

    // --- Animation Function 1: Simple & Performant Fade (The Fallback) ---
    const runFadeAnimation = (newText) => {
        return new Promise((resolve) => {
            const FADE_DURATION = 300;
            typingElement.classList.add('scramble-fade-out');
            setTimeout(() => {
                typingElement.innerText = newText;
                typingElement.classList.remove('scramble-fade-out');
                setTimeout(resolve, FADE_DURATION);
            }, FADE_DURATION);
        });
    };

    // --- Animation Function 2: Full Scramble with Performance Check ---
    const runScrambleAnimation = (newText) => {
        const chars = '!<>-_\\/[]{}—=+*^?#________';
        let frameRequest, frame = 0, queue = [], resolvePromise;
        
        // Performance measurement variables
        let frameCount = 0;
        let startTime = performance.now();
        const FPS_THRESHOLD = 45; // If FPS is below this, switch to fallback
        const CHECK_DURATION = 1000; // Measure for 1 second

        return new Promise((resolve) => {
            resolvePromise = resolve;
            const oldText = typingElement.innerText;
            const length = Math.max(oldText.length, newText.length);
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '', to = newText[i] || '';
                const start = Math.floor(Math.random() * 55), end = start + Math.floor(Math.random() * 55);
                queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(frameRequest);
            update();
        });

        function update() {
            // --- Performance Check (runs only once) ---
            if (!performanceCheckComplete) {
                const elapsedTime = performance.now() - startTime;
                frameCount++;
                if (elapsedTime >= CHECK_DURATION) {
                    const fps = frameCount / (elapsedTime / 1000);
                    if (fps < FPS_THRESHOLD) {
                        useFallback = true; // Set the flag to use the fallback next time
                    }
                    performanceCheckComplete = true; // Mark the check as done
                }
            }

            // --- Animation Logic (unchanged) ---
            let output = '', complete = 0;
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

            if (complete === queue.length) {
                resolvePromise();
                return;
            }
            frameRequest = requestAnimationFrame(update);
            frame++;
        }
    };

    // --- Main Loop ---
    async function next() {
        const text = texts[textIndex];
        // Choose which animation to run based on flags
        if (useFallback) {
            await runFadeAnimation(text);
        } else {
            await runScrambleAnimation(text);
        }
        
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(next, config.scrambleAnimation.delayBetweenTexts); // Use config value
    }
    setTimeout(next, config.scrambleAnimation.initialDelay);
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

    // Auto close after config.notificationDuration
    setTimeout(() => {
        closeNotification(notification);
    }, config.notificationDuration); // Use config value
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
function initializeParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;

    let isTicking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        // The transform will only be updated when the browser is ready to paint
        heroBackground.style.transform = `translateY(${rate}px)`;
        isTicking = false;
    }

    document.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(updateParallax);
            isTicking = true;
        }
    });
}

// Removed hover effects for interactive elements in JS - Moved to CSS only

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

// New event listener to update scroll cache positions if window size changes
window.addEventListener('resize', cacheSectionPositions);

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

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

function generateSkills() {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid) return;

    const skillsHTML = siteContent.skills.map(category => {
        let contentHTML;

        // NEW: Check for our 'pane' type
        if (category.type === 'pane') {
            const paneTagsHTML = category.tags.map(tag => 
                `<span class="skill-tag">${tag}</span>` // Uses the SAME class as the default
            ).join('');
            // Wrap the tags in the new scrollable container
            contentHTML = `<div class="skill-pane-container"><div class="skill-tags">${paneTagsHTML}</div></div>`;

        } else {
            // This is the original logic for the other three lists. It remains unchanged.
            const tagsHTML = category.tags.map(tag => 
                `<span class="skill-tag">${tag}</span>`
            ).join('');
            contentHTML = `<div class="skill-tags">${tagsHTML}</div>`;
        }

        // Return the full HTML for the category card
        return `
            <div class="skill-category">
                <h3 class="skill-category-title">${category.category}</h3>
                ${contentHTML}
            </div>
        `;
    }).join('');

    skillsGrid.innerHTML = skillsHTML;
}

function generateServices() {
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;

    const servicesHTML = siteContent.services.map(service => `
        <div class="service-card">
            <div class="service-icon">${service.icon}</div>
            <h3 class="service-title">${service.title}</h3>
            <p class="service-description">${service.description}</p>
        </div>
    `).join('');
    servicesGrid.innerHTML = servicesHTML;
}

function generatePortfolioItems() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (!portfolioGrid) return;

    const portfolioHTML = siteContent.portfolio.map(item => `
        <div class="portfolio-item" data-category="${item.category}">
            <div class="portfolio-card">
                <div class="portfolio-header">
                    <h3 class="portfolio-title">${item.title}</h3>
                    <span class="portfolio-category">${item.category.toUpperCase()}</span>
                </div>
                <p class="portfolio-description">${item.description}</p>
                <div class="portfolio-results">
                    ${item.results.map(result => `<div class="result-item">${result}</div>`).join('')}
                </div>
                <div class="portfolio-tags">
                    ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    portfolioGrid.innerHTML = portfolioHTML;
}

function initializeLogoCarousel() {
    const logos = document.querySelectorAll('.logo-bar .logo-item');
    if (logos.length === 0) return;

    let currentIndex = 0;
    const intervalTime = 3000; // Time each logo is highlighted

    function updateSpotlight() {
        logos.forEach((logo, index) => {
            logo.classList.toggle('active', index === currentIndex);
        });
    }

    updateSpotlight();

    // Set an interval to advance the spotlight
    setInterval(() => {
        currentIndex = (currentIndex + 1) % logos.length;
        updateSpotlight();
    }, intervalTime);
}

function initializeExpandableHighlights() {
    const highlightsContainer = document.querySelector('.about-highlights');
    if (!highlightsContainer) return;

    const highlights = highlightsContainer.querySelectorAll('.highlight-item');

    highlights.forEach(item => {
        item.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the document click listener from firing
            
            // Check if the clicked item is already expanded
            const isExpanded = item.classList.contains('expanded');

            // First, close any item that is currently open
            highlightsContainer.querySelector('.expanded')?.classList.remove('expanded');

            // If the clicked item was not the one that was just closed, open it.
            if (!isExpanded) {
                item.classList.add('expanded');
            }
        });
    });

    // Add a listener to close an expanded item by clicking outside
    document.addEventListener('click', () => {
        highlightsContainer.querySelector('.expanded')?.classList.remove('expanded');
    });
}

function initializeHorizontalScroller() {
    const scroller = document.querySelector('.experience-scroller');
    if (!scroller) return;

    // --- 1. Mouse Wheel Scrolling ---
    scroller.addEventListener('wheel', (evt) => {
        // Prevent the default vertical scroll
        evt.preventDefault();
        // Add the vertical scroll amount to the horizontal scroll position
        scroller.scrollLeft += evt.deltaY;
    });

    // --- 2. Drag to Scroll ---
    let isDown = false;
    let startX;
    let scrollLeft;

    scroller.addEventListener('mousedown', (e) => {
        isDown = true;
        scroller.classList.add('active');
        // Get the initial mouse position and scroll position
        startX = e.pageX - scroller.offsetLeft;
        scrollLeft = scroller.scrollLeft;
    });

    scroller.addEventListener('mouseleave', () => {
        isDown = false;
        scroller.classList.remove('active');
    });

    scroller.addEventListener('mouseup', () => {
        isDown = false;
        scroller.classList.remove('active');
    });

    scroller.addEventListener('mousemove', (e) => {
        if (!isDown) return; // Stop if mouse button is not held down
        e.preventDefault();
        const x = e.pageX - scroller.offsetLeft;
        const walk = (x - startX) * 2; // The '* 2' makes the drag feel faster
        scroller.scrollLeft = scrollLeft - walk;
    });
}

function initializeExperienceInspector() {
    const layoutContainer = document.getElementById('inspector-layout');
    const nodesContainer = document.getElementById('constellation-nodes');
    const linesContainer = document.getElementById('constellation-lines');
    const panel = document.getElementById('inspector-panel');
    const panelContent = document.getElementById('inspector-panel-content');
    const panelCloseBtn = document.getElementById('inspector-close-btn');
    const scrollerContainer = document.getElementById('experience-scroller-container');

    if (!layoutContainer || typeof siteContent === 'undefined') return;
    
    const sortedExperience = [...siteContent.experience].sort((a, b) => new Date(a.period.split(' - ')[0]) - new Date(b.period.split(' - ')[0]));

    // --- Build the Desktop Map ---
    sortedExperience.forEach((job, i) => {
        nodesContainer.insertAdjacentHTML('beforeend', `<div class="constellation-node-plaque" data-job-id="${job.id}" style="left: ${job.coords.x}%; top: ${job.coords.y}%;"><div class="plaque-title">${job.title.split(' | ')[0]}</div><div class="plaque-company">${job.company}</div><div class="plaque-highlight">${job.achievements[0].icon} ${job.achievements[0].text}</div></div>`);
        if (i < sortedExperience.length - 1) {
            const p1 = job, p2 = sortedExperience[i + 1];
            linesContainer.insertAdjacentHTML('beforeend', `<line class="line" x1="${p1.coords.x}%" y1="${p1.coords.y}%" x2="${p2.coords.x}%" y2="${p2.coords.y}%" />`);
        }
    });

    // --- Build the Mobile Scroller ---
    const mobileCardsHTML = [...sortedExperience].reverse().map(job => `
        <div class="experience-card">
            <div class="experience-period">${job.period}</div>
            <h3 class="experience-title">${job.title}</h3>
            <div class="experience-company">${job.company} &middot; ${job.location}</div>
            <div class="experience-details">
                <ul>${job.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>
                <div class="experience-achievements">
                    ${job.achievements.map(a => `<div class="achievement-item"><span class="achievement-icon">${a.icon}</span><span>${a.text}</span></div>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    scrollerContainer.innerHTML = `<div class="experience-track">${mobileCardsHTML}</div>`;

    // --- Desktop Interaction Logic ---
    const allPlaques = document.querySelectorAll('.constellation-node-plaque');
    function closeInspector() {
        panel.classList.remove('active');
        layoutContainer.classList.remove('inspector-active');
        document.querySelector('.constellation-node-plaque.active')?.classList.remove('active');
        panelContent.innerHTML = `<div class="inspector-prompt"><span class="prompt-icon">👆</span><h3>Select a Node</h3><p>Click on a role in the map to inspect the full details.</p></div>`;
    }
    allPlaques.forEach(plaque => {
        plaque.addEventListener('click', () => {
            const jobId = plaque.dataset.jobId;
            const jobData = siteContent.experience.find(j => j.id === jobId);
            document.querySelector('.constellation-node-plaque.active')?.classList.remove('active');
            plaque.classList.add('active');
            layoutContainer.classList.add('inspector-active');
            panel.classList.add('active');
            panelContent.innerHTML = `<div class="experience-card"><div class="experience-period">${jobData.period}</div><h3 class="experience-title">${jobData.title}</h3><div class="experience-company">${jobData.company} &middot; ${jobData.location}</div><div class="experience-details"><ul>${jobData.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul><div class="experience-achievements">${jobData.achievements.map(a => `<div class="achievement-item"><span class="achievement-icon">${a.icon}</span><span>${a.text}</span></div>`).join('')}</div></div></div>`;
        });
    });
    panelCloseBtn.addEventListener('click', closeInspector);
    
    // =========================================================
    // --- Fixed: Mobile Scroller Interactions ---
    // =========================================================
    // 1. Mouse Wheel Scrolling with Vertical Fallback (Scroll Chaining)
    scrollerContainer.addEventListener('wheel', (evt) => {
        // If the user is scrolling up/down with the wheel, evt.deltaY will be non-zero.
        if (evt.deltaY === 0) return;

        // Check if the scroller is at the very beginning or very end.
        // We use Math.ceil on the right edge to prevent floating-point rounding errors.
        const atLeftEdge = scrollerContainer.scrollLeft === 0;
        const atRightEdge = Math.ceil(scrollerContainer.scrollLeft) >= scrollerContainer.scrollWidth - scrollerContainer.clientWidth;

        const scrollingRight = evt.deltaY > 0;
        const scrollingLeft = evt.deltaY < 0;

        // --- The Core Logic ---
        // If we are trying to scroll left BUT we're already at the beginning,
        // OR if we are trying to scroll right BUT we're already at the end...
        // ...then do NOTHING. Let the event bubble up and scroll the page vertically.
        if ((scrollingLeft && atLeftEdge) || (scrollingRight && atRightEdge)) {
            return; // Allow vertical page scroll
        }

        // Otherwise, we have room to scroll horizontally.
        // So, we prevent the default vertical scroll and apply the horizontal scroll.
        evt.preventDefault();
        scrollerContainer.scrollLeft += evt.deltaY;
    });

    // 2. Drag to Scroll
    let isDown = false, startX, scrollLeft;
    scrollerContainer.addEventListener('mousedown', e => { isDown = true; scrollerContainer.classList.add('active'); startX = e.pageX - scrollerContainer.offsetLeft; scrollLeft = scrollerContainer.scrollLeft; });
    scrollerContainer.addEventListener('mouseleave', () => { isDown = false; scrollerContainer.classList.remove('active'); });
    scrollerContainer.addEventListener('mouseup', () => { isDown = false; scrollerContainer.classList.remove('active'); });
    scrollerContainer.addEventListener('mousemove', e => { if (!isDown) return; e.preventDefault(); const walk = (e.pageX - scrollerContainer.offsetLeft - startX) * 2; scrollerContainer.scrollLeft = scrollLeft - walk; });
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
