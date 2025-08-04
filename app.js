// Jerry James Portfolio - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoadingScreen();
    initializeNavigation();
    initializeScrollAnimations();
    initializeParticles();
    initializePortfolioFilters();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeTypingAnimation();
    enableLogoBarDragScroll();
    updateYearsExperience();
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
    
    // Navbar scroll effect and active section highlighting
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar background opacity based on scroll
        const opacity = Math.min(scrollTop / 100, 0.95);
        navbar.style.backgroundColor = `rgba(26, 26, 46, ${opacity})`;
        
        // Update active navigation link
        updateActiveNavLink();
        
        lastScrollTop = scrollTop;
    });
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

// Particle animation in hero background
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation duration
        const duration = Math.random() * 3 + 3; // 3-6 seconds
        particle.style.animationDuration = duration + 's';
        
        // Random delay
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (duration + 2) * 1000);
    }
    
    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
        setTimeout(createParticle, i * 100);
    }
    
    // Continuously create new particles
    setInterval(createParticle, 200);
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

// Typing Animation for Hero Section
function initializeTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    const texts = [
        'Technical Marketing',
        'B2B & B2C Narratives',
        'Inbound Marketing Strategy',
        'Content Marketing Wizard'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 25 : 50;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next text
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    // Start typing animation after loading screen
    setTimeout(typeText, 2500);
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
                if (currentTranslate <= -loopWidth) {
                    currentTranslate += loopWidth;
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
            const loopWidth = bar.scrollWidth / 2;
            currentTranslate = currentTranslate % loopWidth;
            document.body.style.userSelect = '';
        };

        // --- Attach Listeners (with the fix) ---
        wrapper.addEventListener('mousedown', (e) => {
            // --- FIX: Prevent default browser drag behavior ---
            e.preventDefault();
            onDragStart(e.pageX);
        });
        
        window.addEventListener('mousemove', (e) => {
            onDragMove(e.pageX);
        });

        window.addEventListener('mouseup', onDragEnd);
        window.addEventListener('mouseleave', onDragEnd);

        wrapper.addEventListener('touchstart', (e) => {
            // --- FIX: Prevent default touch actions (like page scroll) ---
            // Note: passive: false is required for preventDefault() to work in touch events
            onDragStart(e.touches[0].pageX);
        }, { passive: true }); // Keep this passive for smooth scrolling on touch devices

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
