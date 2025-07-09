// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        initializeAnimations();
    }, 2000);
});

// Particle Background
function createParticles() {
    const canvas = document.getElementById('particles-bg');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(0, 255, 255, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

createParticles();

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Portal Mouse Interaction
const portal = document.querySelector('.time-portal');
const hero = document.querySelector('.hero');

if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        if (portal) {
            portal.style.transform = `translate(${deltaX * 20}px, ${deltaY * 20}px)`;
        }
    });
}

// Parallax Effect for Scene Elements
const sceneElements = document.querySelectorAll('.scene-elements img');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    sceneElements.forEach((element, index) => {
        const speed = 0.1 * (index + 1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Initialize Intersection Observer for Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('era-card')) {
                    entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}ms`;
                }
                
                if (entry.target.classList.contains('testimonial-card')) {
                    entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.era-card, .testimonial-card, .section-title').forEach(el => {
        observer.observe(el);
    });
}

// Timeline Animation
function createTimelineDots() {
    const container = document.querySelector('.timeline-dots');
    if (!container) return;
    
    for (let i = 0; i < 10; i++) {
        const dot = document.createElement('div');
        dot.className = 'timeline-dot';
        dot.style.left = `${i * 10}%`;
        dot.style.animationDelay = `${i * 0.2}s`;
        container.appendChild(dot);
    }
}

createTimelineDots();

// Era Card Hover Effects
document.querySelectorAll('.era-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        card.style.transform = `perspective(1000px) rotateY(${deltaX * 5}deg) rotateX(${-deltaY * 5}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
    });
});

// Testimonial Cards Glow Effect
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const glow = card.querySelector('.testimonial-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 0, 255, 0.2) 0%, transparent 70%)`;
        }
    });
});

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Typewriter Effect for Loading Text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add custom cursor
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Interactive Portal Particles
function createPortalParticles() {
    const portalParticles = document.querySelector('.portal-particles');
    if (!portalParticles) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'portal-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        portalParticles.appendChild(particle);
    }
}

createPortalParticles();

// Counter Animation
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const value = parseInt(entry.target.getAttribute('data-value'));
            animateCounter(entry.target, 0, value, 2000);
        }
    });
}, { threshold: 0.5 });

// Add stats elements to your HTML and observe them
document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// 3D Tilt Effect
function tiltEffect(element) {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 30;
        const angleY = (centerX - x) / 30;
        
        element.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}

// Apply tilt effect to cards
document.querySelectorAll('.era-card, .testimonial-card').forEach(card => {
    tiltEffect(card);
});

// Dynamic Timeline Path Animation
function animateTimelinePath() {
    const path = document.querySelector('.timeline-path');
    if (!path) return;
    
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    
    window.addEventListener('scroll', () => {
        const scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / 
            (document.documentElement.scrollHeight - document.documentElement.clientHeight);
        
        const drawLength = length * scrollPercentage;
        path.style.strokeDashoffset = length - drawLength;
    });
}

animateTimelinePath();

// Magnetic Buttons
document.querySelectorAll('.cta-button, .era-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Timeline Visual Class - Enhanced
class TimelineVisual {
    constructor() {
        this.timeline = document.querySelector('.timeline-visual');
        this.path = document.querySelector('.timeline-path');
        this.events = document.querySelectorAll('.timeline-event');
        this.points = document.querySelectorAll('.timeline-point');
        this.svg = document.querySelector('.timeline-svg');
        
        if (this.timeline) {
            this.init();
        }
    }
    
    init() {
        this.setupScrollAnimation();
        this.setupEventInteractions();
        this.setupPointInteractions();
        this.createBackgroundParticles();
        this.alignEventsToPath();
        window.addEventListener('resize', () => this.alignEventsToPath());
    }
    
    setupScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.animateTimelinePath();
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(this.timeline);
    }
    
    animateTimelinePath() {
        if (this.path) {
            const length = this.path.getTotalLength();
            this.path.style.strokeDasharray = length;
            this.path.style.strokeDashoffset = length;
            
            // Animate the path
            this.path.style.animation = 'drawPath 3s ease-out forwards';
        }
    }
    
    setupEventInteractions() {
        this.events.forEach((event, index) => {
            event.addEventListener('mouseenter', () => {
                this.highlightEvent(event, index);
                if (this.points[index]) {
                    this.points[index].classList.add('active');
                }
            });
            
            event.addEventListener('mouseleave', () => {
                this.resetEventHighlight(event);
                if (this.points[index]) {
                    this.points[index].classList.remove('active');
                }
            });
            
            event.addEventListener('click', () => {
                this.showEventDetails(event);
            });
        });
    }
    
    setupPointInteractions() {
        this.points.forEach((point, index) => {
            point.addEventListener('mouseenter', () => {
                point.classList.add('active');
                if (this.events[index]) {
                    this.events[index].querySelector('.event-content').style.transform = 'translateY(-10px)';
                    this.events[index].querySelector('.event-content').style.boxShadow = '0 15px 40px rgba(0, 255, 255, 0.3)';
                }
            });
            
            point.addEventListener('mouseleave', () => {
                point.classList.remove('active');
                if (this.events[index]) {
                    this.events[index].querySelector('.event-content').style.transform = '';
                    this.events[index].querySelector('.event-content').style.boxShadow = '';
                }
            });
            
            point.addEventListener('click', () => {
                if (this.events[index]) {
                    this.showEventDetails(this.events[index]);
                }
            });
        });
    }
    
    alignEventsToPath() {
        if (window.innerWidth <= 768) return; // Skip for mobile
        
        // Get the path points at specific positions
        const pathLength = this.path.getTotalLength();
        const positions = [0, 0.25, 0.5, 0.75, 1];
        
        this.events.forEach((event, index) => {
            if (index < positions.length) {
                const point = this.path.getPointAtLength(pathLength * positions[index]);
                const svgRect = this.svg.getBoundingClientRect();
                const timelineRect = this.timeline.getBoundingClientRect();
                
                // Convert SVG coordinates to container coordinates
                const x = (point.x / this.svg.viewBox.baseVal.width) * svgRect.width;
                const y = (point.y / this.svg.viewBox.baseVal.height) * svgRect.height;
                
                // Position event
                const eventLeft = (x / svgRect.width) * 100;
                event.style.left = `${eventLeft}%`;
                
                // Adjust vertical position based on curve
                const curveOffset = y - (svgRect.height / 2);
                const baseTop = 150; // Base position
                event.style.top = `${baseTop + curveOffset}px`;
            }
        });
    }
    
    highlightEvent(event, index) {
        // Create a glow effect on the timeline path
        const pathClone = this.path.cloneNode();
        pathClone.setAttribute('stroke', '#FF00FF');
        pathClone.setAttribute('stroke-width', '8');
        pathClone.setAttribute('opacity', '0.5');
        pathClone.classList.add('path-highlight');
        
        this.svg.insertBefore(pathClone, this.path);
        
        // Animate the glow
        pathClone.style.animation = 'glowPulse 1s ease-in-out infinite';
        
        // Store reference for cleanup
        event.pathHighlight = pathClone;
    }
    
    resetEventHighlight(event) {
        if (event.pathHighlight) {
            event.pathHighlight.style.opacity = '0';
            setTimeout(() => {
                event.pathHighlight.remove();
                delete event.pathHighlight;
            }, 300);
        }
    }
    
    createBackgroundParticles() {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${5 + Math.random() * 5}s`;
            
            this.timeline.appendChild(particle);
        }
    }
    
    showEventDetails(event) {
        const year = event.dataset.year;
        const title = event.querySelector('h3').textContent;
        const description = event.querySelector('p').textContent;
        
        // Create modal-like detail view
        const detailView = document.createElement('div');
        detailView.className = 'event-detail-view';
        detailView.innerHTML = `
            <div class="detail-content">
                <button class="detail-close">&times;</button>
                <h2>${title}</h2>
                <div class="detail-year">${year}</div>
                <p>${description}</p>
                <div class="detail-actions">
                    <button class="btn-book">Book This Journey</button>
                    <button class="btn-learn">Learn More</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(detailView);
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            detailView.classList.add('active');
        }, 10);
        
        // Close handlers
        const closeBtn = detailView.querySelector('.detail-close');
        const closeModal = () => {
            detailView.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                detailView.remove();
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        detailView.addEventListener('click', (e) => {
            if (e.target === detailView) {
                closeModal();
            }
        });
        
        // ESC key to close
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }
}

// Initialize all components when document is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize timeline if it exists
    new TimelineVisual();
    
    // Initialize all animations
    initializeAnimations();
    
    console.log('ChronoQuest initialized successfully!');
});

// Handle visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.querySelectorAll('*').forEach(el => {
            if (el.style.animationPlayState !== 'paused') {
                el.style.animationPlayState = 'paused';
            }
        });
    } else {
        // Resume animations when tab becomes visible
        document.querySelectorAll('*').forEach(el => {
            if (el.style.animationPlayState === 'paused') {
                el.style.animationPlayState = 'running';
            }
        });
    }
});