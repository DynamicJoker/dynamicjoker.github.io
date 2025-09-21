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
    heroVisuals: {
    radius: 300,
    maxStretch: 200,
    points: 45,
    noiseFrequency: 3,
    noiseSpeed: 0.009,
    baseNoise: 0.15,
    mouseFollowSpeed: 0.03,
    velocityIntensity: 0.003,
    colors: {
            target: { h: 195, s: 100, l: 50 }, // The target electric blue for motion
            // The orb will cycle through these colors in order.
            colorStops: [
                { h: 195, s: 100, l: 55 }, // Electric Blue
                { h: 250, s: 90, l: 60 },  // Vibrant Purple
                { h: 330, s: 95, l: 60 },  // Hot Pink / Magenta
                { h: 280, s: 90, l: 60 },  // Deep Violet
            ],
            // How fast it transitions from one color to the next (lower is slower)
            transitionSpeed: 0.001
        }
    },
    navbar: {
        height: 70, // The height of the navbar in pixels
        scrollThreshold: 10 // Scroll threshold to change navbar style
    },
    scroll: { // New property
    spyOffset: -100 // For determining the active navigation link
    }
};
let navLinks = [];
/* Render function to render a list of items into a container
 * @param {string} containerId - The ID of the DOM element to render into.
 * @param {Array} dataArray - The array of data to render.
 * @param {Function} templateFn - A function that takes one item from the array and returns an HTML string.
 */
function renderContent(containerId, dataArray, templateFn) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`renderContent: Container with ID '${containerId}' not found.`);
        return;
    }
    container.innerHTML = dataArray.map(templateFn).join('');
}

// --- Consolidated Scroll Handler for Performance ---
let lastKnownScrollPosition = 0;
let ticking = false;

// 1. Function to read scroll position and call update functions
function handleScroll() {
    lastKnownScrollPosition = window.pageYOffset;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateUIOnScroll(lastKnownScrollPosition);
            ticking = false;
        });

        ticking = true;
    }
}

// 2. All visual updates triggered by scroll happen here
function updateUIOnScroll(scrollY) {
    const navbar = document.getElementById('navbar');
    const heroBackground = document.querySelector('.hero-background');

    // Logic from: initializeNavigation()
    if (navbar) {
        navbar.classList.toggle('scrolled', scrollY > config.navbar.scrollThreshold);
    }
    
    // Logic from: the old throttled listener
    updateActiveNavLink();
    updateNavGlow(); 

    // Logic from: initializeParallaxEffect()
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrollY * -0.5}px)`;
    }
}

// 3. Adding single, efficient event listener
window.addEventListener('scroll', handleScroll, { passive: true });

document.addEventListener('DOMContentLoaded', () => {
    initializeLoadingScreen();
    initializeNavigation();
    generateSkills();
    generateServices();
    generateTestimonialColumns();
    initializeInfiniteScroller();
    generatePortfolioItems();
    generateGanttChart();
    initializeScrollAnimations();
    initializePortfolioFilters();
    initializeContactForm();
    updateYearsExperience();
    initializeHeroVisuals();
    initializeScrambleAnimation();
    initializeSmartGlow();
    initializeLogoCarousel();
    initializeExpandableHighlights();
    cacheSectionPositions();
    console.log('Jerry James Portfolio initialized successfully! 🚀');
});


// Loading Screen Animation
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => loadingScreen.remove(), 500);
    }, config.loadingScreenDuration);
}

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Immediately update the active link on click
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
            updateNavGlow();
            
            // Close the mobile menu if it's open
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    if (navbar) {
        // Set initial state on load
        navbar.classList.toggle('scrolled', window.pageYOffset > config.navbar.scrollThreshold); // Use config value
        updateActiveNavLink();
        updateNavGlow();
    }
}

function initializeSmartGlow() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let titleData = [];
    
    function cacheTitlePositions() {
        const titles = document.querySelectorAll('.hero-name, .section-title');
        titleData = Array.from(titles).map(title => {
            const rect = title.getBoundingClientRect();
            return { top: rect.top + window.scrollY, centerX: rect.left + rect.width / 2 };
        });
    }

    const activationRange = 500;
    const baseGlow = { size: 50, opacity: 0.4 };
    const peakGlow = { size: 300, opacity: 0.8 };
    const glowColorRgb = '0, 212, 255';

    function updateGlow() {
        const scrollY = window.scrollY;
        const navBottom = scrollY + navbar.offsetHeight;

        let prevTitle = null, nextTitle = null;
        for (const title of titleData) {
            if (title.top < navBottom) prevTitle = title;
            else { nextTitle = title; break; }
        }
        
        const distToPrev = prevTitle ? navBottom - prevTitle.top : Infinity;
        const distToNext = nextTitle ? nextTitle.top - navBottom : Infinity;
        const activeTitle = distToNext < distToPrev ? nextTitle : prevTitle;
        const closestDist = Math.min(distToPrev, distToNext);

        let intensity = (activeTitle && closestDist < activationRange) ? 1 - (closestDist / activationRange) : 0;
        intensity = Math.max(0, scrollY < 10 ? 0 : intensity);
        
        const sizeX = baseGlow.size + (peakGlow.size - baseGlow.size) * intensity;
        const opacity = baseGlow.opacity + (peakGlow.opacity - baseGlow.opacity) * intensity;
        
        if (activeTitle) navbar.style.setProperty('--glow-position-x', `${activeTitle.centerX}px`);
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
function cacheSectionPositions() {
    sectionData = Array.from(document.querySelectorAll('section[id]')).map(section => ({
        id: section.getAttribute('id'),
        top: section.offsetTop + config.scroll.spyOffset,
        height: section.offsetHeight
    }));
}

function updateActiveNavLink() {
    const scrollY = window.scrollY;
    let currentSectionId = '';

    // Check if the user has scrolled to the bottom of the page.
    const atBottom = (window.innerHeight + scrollY) >= document.documentElement.scrollHeight - 5;

    if (atBottom) {
        // If at the bottom, set the active section to the last one.
        currentSectionId = sectionData[sectionData.length - 1].id;
    } else {
        // Otherwise, use the existing logic for all other sections.
        for (const section of sectionData) {
            if (scrollY >= section.top && scrollY < section.top + section.height) {
                currentSectionId = section.id;
                break;
            }
        }
    }

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
    });
}

function updateNavGlow() {
    const navMenu = document.getElementById('nav-menu');
    const activeLink = Array.from(navLinks).find(link => link.classList.contains('active'));
    if (activeLink && navMenu) {
        navMenu.style.setProperty('--glow-left', `${activeLink.offsetLeft}px`);
        navMenu.style.setProperty('--glow-width', `${activeLink.offsetWidth}px`);
        navMenu.style.setProperty('--glow-opacity', '1');
    } else if (navMenu) {
        // Hide the glow if no link is active
        navMenu.style.setProperty('--glow-opacity', '0');
    }
}

function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.section').forEach(section => observer.observe(section));
}

// --- REBUILT: initializeHeroVisuals for the new "Vibrant Core Orb" ---
function initializeHeroVisuals() {
    const corePath = document.getElementById('hero-blob-path');
    const glowPath = document.getElementById('hero-blob-glow-path');
    const blobGroup = document.getElementById('blob-group');
    const gradientStop = document.getElementById('gradient-stop-1');
    const heroSection = document.getElementById('hero');

    if (!corePath || !glowPath || !blobGroup || !heroSection || !gradientStop) return;

    // Destructure properties from the config
    const { radius, maxStretch, points, noiseFrequency, noiseSpeed, baseNoise, mouseFollowSpeed, velocityIntensity, colors } = config.heroVisuals;
    
    let time = 0;
    let colorTime = 0; // Use a separate timer for color transitions
    let rect = heroSection.getBoundingClientRect();
    let centerX = rect.width / 2;
    let centerY = rect.height / 2;

    let mouseX = centerX, mouseY = centerY;
    let lastMouseX = centerX, lastMouseY = centerY;
    let virtualMouseX = centerX, virtualMouseY = centerY;
    let mouseVelocity = 0;

    const lerp = (start, end, amount) => start * (1 - amount) + end * amount;

    function createBlobPath(pts) {
        let d = `M ${pts[0].x} ${pts[0].y}`;
        for (let i = 0; i < pts.length; i++) {
            const p1 = pts[i], p2 = pts[(i + 1) % pts.length];
            d += ` Q ${p1.x},${p1.y} ${(p1.x + p2.x) / 2},${(p1.y + p2.y) / 2}`;
        }
        return d + ' Z';
    }

    function animate() {
        // Increment both timers
        time += noiseSpeed;
        colorTime += colors.transitionSpeed;

        const dx = mouseX - lastMouseX;
        const dy = mouseY - lastMouseY;
        const currentVelocity = Math.min(Math.hypot(dx, dy), 100);
        mouseVelocity = lerp(mouseVelocity, currentVelocity, 0.1);
        lastMouseX = mouseX;
        lastMouseY = mouseY;

        virtualMouseX = lerp(virtualMouseX, mouseX, mouseFollowSpeed);
        virtualMouseY = lerp(virtualMouseY, mouseY, mouseFollowSpeed);

        // --- NEW COLOR CYCLING LOGIC ---
        const { target, colorStops } = colors;
        
        // 1. Determine the current and next colors in the sequence
        const colorIndex = Math.floor(colorTime) % colorStops.length;
        const nextColorIndex = (colorIndex + 1) % colorStops.length;
        const currentColor = colorStops[colorIndex];
        const nextColor = colorStops[nextColorIndex];

        // 2. Calculate the progress (0 to 1) between the two colors
        const progress = colorTime % 1;

        // 3. Interpolate HSL values for the idle color
        const idleHue = lerp(currentColor.h, nextColor.h, progress);
        const idleSaturation = lerp(currentColor.s, nextColor.s, progress);
        const idleLightness = lerp(currentColor.l, nextColor.l, progress);

        // 4. Blend from the idle color to the target blue based on mouse velocity
        const velocityFactor = Math.min(mouseVelocity / 60, 1);
        const finalHue = lerp(idleHue, target.h, velocityFactor);
        const finalSaturation = lerp(idleSaturation, target.s, velocityFactor);
        const finalLightness = lerp(idleLightness, target.l, velocityFactor);
        
        gradientStop.setAttribute('stop-color', `hsl(${finalHue}, ${finalSaturation}%, ${finalLightness}%)`);

        const mouseAngle = Math.atan2(virtualMouseY - centerY, virtualMouseX - centerX);
        const pullIntensity = Math.min(Math.hypot(virtualMouseX - centerX, virtualMouseY - centerY) / (rect.width / 3), 1);
        const dynamicNoiseAmount = baseNoise + mouseVelocity * velocityIntensity;
        const dynamicMaxStretch = maxStretch + mouseVelocity * 0.5;
        
        const generatedPoints = Array.from({ length: points }, (_, i) => {
            const angle = (i / points) * Math.PI * 2;
            const noiseFactor = 1 + dynamicNoiseAmount * Math.sin(time + angle * noiseFrequency);
            const stretch = pullIntensity * dynamicMaxStretch * (Math.cos(angle - mouseAngle) + 1) / 2;
            const finalRadius = (radius + stretch) * noiseFactor;
            return { x: Math.cos(angle) * finalRadius, y: Math.sin(angle) * finalRadius };
        });

        const pathData = createBlobPath(generatedPoints);
        corePath.setAttribute('d', pathData);
        glowPath.setAttribute('d', pathData);

        requestAnimationFrame(animate);
    }

    heroSection.addEventListener('mousemove', e => {
        const currentRect = heroSection.getBoundingClientRect();
        mouseX = e.clientX - currentRect.left;
        mouseY = e.clientY - currentRect.top;
    });
    heroSection.addEventListener('mouseleave', () => { mouseX = centerX; mouseY = centerY; });
    window.addEventListener('resize', () => { 
        rect = heroSection.getBoundingClientRect(); 
        centerX = rect.width / 2; centerY = rect.height / 2;
        mouseX = virtualMouseX = centerX; mouseY = virtualMouseY = centerY;
        blobGroup.style.transform = `translate(${centerX}px, ${centerY}px)`;
    });

    blobGroup.style.transform = `translate(${centerX}px, ${centerY}px)`;
    animate();
}

function initializePortfolioFilters() {
    const filterContainer = document.querySelector('.portfolio-filters');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Safety check in case the container doesn't exist
    if (!filterContainer) return;

    // Add a single click listener to the parent container
    filterContainer.addEventListener('click', (event) => {
        // Find the button that was actually clicked, even if the user clicks an inner element
        const clickedButton = event.target.closest('.filter-btn');

        // If the click was not on a button, do nothing
        if (!clickedButton) return;

        // Get all filter buttons to manage the 'active' class
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        const filter = clickedButton.dataset.filter;
        
        // Update the active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
        
        // Apply the filter logic to each portfolio item
        portfolioItems.forEach(item => {
            const isVisible = filter === 'all' || item.dataset.category === filter;
            item.classList.toggle('hidden', !isVisible);
            item.style.opacity = isVisible ? '1' : '0';
            item.style.transform = isVisible ? 'scale(1)' : 'scale(0.8)';
        });
    });
}

function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        if (!formData.get('name') || !formData.get('email') || !formData.get('message')) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
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

function initializeScrambleAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const texts = config.scrambleAnimation.texts;
    let textIndex = 0;
    
    const runScrambleAnimation = (newText) => {
        return new Promise((resolve) => {
            const chars = '!<>-_\\/[]{}—=+*^?#________';
            let frameRequest, frame = 0, queue = [];
            const oldText = typingElement.innerText;
            const length = Math.max(oldText.length, newText.length);
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '', to = newText[i] || '';
                const start = Math.floor(Math.random() * 55), end = start + Math.floor(Math.random() * 55);
                queue.push({ from, to, start, end });
            }
            
            const update = () => {
                let output = '', complete = 0;
                for (let i = 0, n = queue.length; i < n; i++) {
                    let { from, to, start, end, char } = queue[i];
                    if (frame >= end) { complete++; output += to; }
                    else if (frame >= start) {
                        if (!char || Math.random() < 0.28) {
                            char = chars[Math.floor(Math.random() * chars.length)];
                            queue[i].char = char;
                        }
                        output += `<span class="scramble-char">${char}</span>`;
                    } else output += from;
                }
                typingElement.innerHTML = output;
                if (complete === queue.length) { resolve(); return; }
                frameRequest = requestAnimationFrame(update);
                frame++;
            };
            cancelAnimationFrame(frameRequest);
            update();
        });
    };

    async function next() {
        await runScrambleAnimation(texts[textIndex]);
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(next, config.scrambleAnimation.delayBetweenTexts);
    }
    setTimeout(next, config.scrambleAnimation.initialDelay);
}

function updateYearsExperience() {
    const el = document.getElementById('years-experience');
    if(el) el.textContent = new Date().getFullYear() - 2014;
}

function showNotification(message, type = 'info') {
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `<div class="notification-content"><span class="notification-message">${message}</span><button class="notification-close" aria-label="Close">&times;</button></div>`;

    document.body.appendChild(notification);

    // Use requestAnimationFrame to ensure the transition is applied correctly
    requestAnimationFrame(() => {
        notification.classList.add('visible');
    });

    const close = () => {
        notification.classList.remove('visible');
        // Wait for the animation to finish before removing the element
        notification.addEventListener('transitionend', () => notification.remove(), { once: true });
    };

    notification.querySelector('.notification-close').addEventListener('click', close);
    setTimeout(close, config.notificationDuration);
}


window.addEventListener('resize', cacheSectionPositions);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('nav-menu').classList.contains('active')) {
        document.getElementById('hamburger').classList.remove('active');
        document.getElementById('nav-menu').classList.remove('active');
    }
});

function generateSkills() {
    renderContent('skills-grid', siteContent.skills, category => `
        <div class="skill-category card-base">
            <h3 class="skill-category-title">${category.category}</h3>
            <div class="${category.type === 'pane' ? 'skill-pane-container' : 'skill-tags'}">
                <div class="${category.type !== 'pane' ? '' : 'skill-tags'}">
                    ${category.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `);
}

function generateServices() {
    renderContent('services-grid', siteContent.services, service => `
        <div class="service-card card-base">
            <div class="service-icon">${service.icon}</div>
            <h3 class="service-title">${service.title}</h3>
            <p class="service-description">${service.description}</p>
        </div>
    `);
}

function generateTestimonialColumns() {
    const container = document.getElementById('testimonials-container');
    if (!container) return;

    const numColumns = 3;
    const columns = Array.from({ length: numColumns }, () => []);
    
    siteContent.testimonials.forEach((testimonial, index) => {
        columns[index % numColumns].push(testimonial);
    });

    container.innerHTML = columns.map(column => `
        <div class="testimonials-scroller-column">
            <div class="testimonials-scroller-inner">
                ${column.map(testimonial => `
                    <div class="testimonial-card">
                        <div class="testimonial-header">
                            <img class="testimonial-image" loading="lazy" width="100" height="100" src="${testimonial.image}" alt="${testimonial.name}">
                            <div class="testimonial-author-info">
                                <p class="testimonial-author">${testimonial.name}</p>
                                <p class="testimonial-title">${testimonial.title}, ${testimonial.company}</p>
                            </div>
                        </div>
                        <p class="testimonial-quote">"${testimonial.quote}"</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function initializeInfiniteScroller() {
    document.querySelectorAll(".testimonials-scroller-column").forEach(scroller => {
        const scrollerInner = scroller.querySelector(".testimonials-scroller-inner");
        const scrollerContent = Array.from(scrollerInner.children);
        scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
        scrollerInner.style.setProperty('--scroll-duration', `${Math.floor(Math.random() * 41) + 80}s`);
    });
}

function generatePortfolioItems() {
    renderContent('portfolio-grid', siteContent.portfolio, item => `
        <div class="portfolio-item" data-category="${item.category}">
            <div class="portfolio-card card-base">
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
    `);
}

function initializeLogoCarousel() {
    const logos = document.querySelectorAll('.logo-bar .logo-item');
    if (logos.length === 0) return;
    let currentIndex = 0;
    setInterval(() => {
        logos.forEach((logo, index) => logo.classList.toggle('active', index === currentIndex));
        currentIndex = (currentIndex + 1) % logos.length;
    }, 3000);
}

function initializeExpandableHighlights() {
    const container = document.querySelector('.about-highlights');
    if (!container) return;

    const handleInteraction = (event) => {
        // Find the parent highlight-item that was clicked or activated by key
        const highlightItem = event.target.closest('.highlight-item');
        
        // Exit if the interaction was not on a highlight item
        if (!highlightItem) return;

        // Ensure only Enter or Space keys trigger the action
        if (event.type === 'keydown' && !['Enter', ' '].includes(event.key)) {
            return;
        }
        
        event.preventDefault();

        const currentlyExpanded = container.querySelector('.expanded');

        // Close any other item that might already be open
        if (currentlyExpanded && currentlyExpanded !== highlightItem) {
            currentlyExpanded.classList.remove('expanded');
        }
        
        // Toggle the active state of the interacted item
        highlightItem.classList.toggle('expanded');
    };
    
    // Attach a single listener to the parent container for all clicks and key events
    container.addEventListener('click', handleInteraction);
    container.addEventListener('keydown', handleInteraction);

    // Add a listener to the document to handle clicks outside the component
    document.addEventListener('click', (event) => {
        // Ignore clicks within the component itself; the container's listener handles those.
        if (container.contains(event.target)) {
            return;
        }
        
        // If the click was outside, find and close any expanded item.
        const currentlyExpanded = container.querySelector('.expanded');
        if (currentlyExpanded) {
            currentlyExpanded.classList.remove('expanded');
        }
    });
}

function generateGanttChart() {
    const container = document.getElementById('gantt-chart-container');
    if (!container) return;

    // 1. Prepare data and find date range
    const jobs = siteContent.experience.map(job => {
        const [startStr, endStr] = job.period.split(' - ');
        const [startMonth, startYear] = startStr.split('/');
        const startDate = new Date(`${startYear}-${startMonth}-01`);

        let endDate;
        if (endStr.toLowerCase() === 'present') {
            endDate = new Date();
        } else {
            const [endMonth, endYear] = endStr.split('/');
            endDate = new Date(`${endYear}-${endMonth}-01`);
        }
        return { ...job, startDate, endDate };
    }).sort((a, b) => {
        return a.sortOrder - b.sortOrder;
    });

    const firstDate = new Date(Math.min(...jobs.map(j => j.startDate)));
    const lastDate = new Date(Math.max(...jobs.map(j => j.endDate)));

    const totalDuration = lastDate.getTime() - firstDate.getTime();

    // 2. Create Timeline Axis
    let timelineHTML = '<div class="gantt-timeline">';
    const startYear = firstDate.getFullYear();
    const endYear = lastDate.getFullYear();
    for (let year = startYear; year <= endYear; year++) {
        timelineHTML += `<span>${year}</span>`;
    }
    timelineHTML += '</div>';

    // 3. Create Chart Rows
    let rowsHTML = jobs.map((job, index) => {
        const offset = (job.startDate.getTime() - firstDate.getTime()) / totalDuration * 100;
        const width = (job.endDate.getTime() - job.startDate.getTime()) / totalDuration * 100;
        const isPresent = job.period.toLowerCase().includes('present');

        const achievementsList = job.achievements.map(a => `<li><span class="achievement-icon">${a.icon}</span><span>${a.text}</span></li>`).join('');

        return `
            <div class="gantt-row">
                <div class="gantt-label">
                    <h3>${job.title}</h3>
                    <p>${job.company}</p>
                </div>
                <div class="gantt-bar-area">
                    <div class="gantt-bar ${isPresent ? 'present' : ''}" style="margin-left: ${offset}%; width: ${width}%; animation-delay: ${index * 100}ms;"></div>
                    <div class="gantt-tooltip">
                        <div class="tooltip-period">${job.period}</div>
                        <ul class="tooltip-achievements">${achievementsList}</ul>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = timelineHTML + rowsHTML;

    // 4. Add scroll-triggered animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                container.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(container);
}
