

// Advanced Starfield Animation
function createAdvancedStarfield() {
    const starfield = document.querySelector('.stars');
    const additionalStars = 200;
    
    for (let i = 0; i < additionalStars; i++) {
        const star = document.createElement('div');
        star.className = 'dynamic-star';
        star.style.position = 'absolute';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.8 + 0.2;
        star.style.animation = `twinkle ${Math.random() * 5 + 3}s infinite`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starfield.appendChild(star);
    }
}

// Parallax Effect
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const stars = document.querySelector('.stars');
        const twinkling = document.querySelector('.twinkling');
        
        stars.style.transform = `translateY(${scrolled * 0.5}px)`;
        twinkling.style.transform = `translateY(${scrolled * 0.3}px)`;
        
        // Parallax for cards
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            const speed = 0.1 * (index % 3);
            card.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Bubble Interactions
function initBubbleInteractions() {
    const bubbles = document.querySelectorAll('.speech-bubble, .large-speech-bubble, .top-speech-bubble, .mini-speech-bubble');
    
    bubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', () => {
            bubble.style.transform = 'scale(1.05)';
            bubble.style.transition = 'transform 0.3s ease';
            bubble.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
        });
        
        bubble.addEventListener('mouseleave', () => {
            bubble.style.transform = 'scale(1)';
            bubble.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });
    });
}

// Logo Animation
function initLogoAnimation() {
    const logoCircle = document.querySelector('.logo-circle');
    const logoLines = document.querySelectorAll('.logo-lines span');
    
    logoCircle.addEventListener('mouseenter', () => {
        logoCircle.style.transform = 'rotate(360deg)';
        logoCircle.style.transition = 'transform 0.8s ease';
        
        logoLines.forEach((line, index) => {
            line.style.transform = `scaleX(${1.2 - index * 0.05})`;
            line.style.transition = 'transform 0.3s ease';
            line.style.transitionDelay = `${index * 0.05}s`;
        });
    });
    
    logoCircle.addEventListener('mouseleave', () => {
        logoCircle.style.transform = 'rotate(0deg)';
        logoLines.forEach(line => {
            line.style.transform = 'scaleX(1)';
        });
    });
}

// Card Hover Effects
function initCardEffects() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Burst Animation Enhancement
function enhanceBurstAnimation() {
    const burstContainer = document.querySelector('.burst-container');
    if (!burstContainer) return;
    
    const burstRays = document.querySelector('.burst-rays');
    let rotation = 0;
    
    function animateBurst() {
        rotation += 0.5;
        burstRays.style.transform = `rotate(${rotation}deg)`;
        requestAnimationFrame(animateBurst);
    }
    
    animateBurst();
    
    // Add pulse effect
    setInterval(() => {
        const pulse = document.createElement('div');
        pulse.style.position = 'absolute';
        pulse.style.top = '0';
        pulse.style.left = '0';
        pulse.style.width = '100%';
        pulse.style.height = '100%';
        pulse.style.background = 'radial-gradient(circle, rgba(232,67,147,0.5) 0%, transparent 70%)';
        pulse.style.animation = 'burstPulse 2s ease-out forwards';
        burstContainer.appendChild(pulse);
        
        setTimeout(() => pulse.remove(), 2000);
    }, 3000);
}

// Control Panel Interactions
function initControlPanel() {
    const controls = document.querySelectorAll('.control-item');
    
    controls.forEach(control => {
        control.addEventListener('click', () => {
            control.style.transform = 'scale(0.9)';
            setTimeout(() => {
                control.style.transform = 'scale(1)';
            }, 150);
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '100%';
            ripple.style.height = '100%';
            ripple.style.borderRadius = '15px';
            ripple.style.background = 'rgba(255,255,255,0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            control.style.position = 'relative';
            control.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Typing Effect for Text
function initTypingEffect() {
    const textElements = document.querySelectorAll('.card-content p, .speech-bubble p');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.minHeight = '20px';
        
        let index = 0;
        function typeText() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 20);
            }
        }
        
        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeText();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Dynamic Background Gradients
function initDynamicGradients() {
    const gradientElements = document.querySelectorAll('[class*="-gradient"]');
    
    gradientElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.filter = 'brightness(1.1) saturate(1.2)';
            element.style.transition = 'filter 0.3s ease';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.filter = 'brightness(1) saturate(1)';
        });
    });
}

// Particle System
function initParticleSystem() {
    const container = document.querySelector('.cosmic-background');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'white';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        particle.style.opacity = Math.random() * 0.5 + 0.5;
        
        const duration = Math.random() * 10 + 5;
        const xMove = Math.random() * 100 - 50;
        
        particle.style.animation = `particleFloat ${duration}s linear forwards`;
        particle.style.setProperty('--x-end', `${xMove}px`);
        
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), duration * 1000);
    }
    
    setInterval(createParticle, 200);
}

// Add Custom Animations
function addCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes burstPulse {
            0% {
                transform: scale(1);
                opacity: 0.5;
            }
            100% {
                transform: scale(1.5);
                opacity: 0;
            }
        }
        
        @keyframes particleFloat {
            0% {
                transform: translate(0, 0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translate(var(--x-end), -${window.innerHeight + 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize Everything
function init() {
    createAdvancedStarfield();
    initParallax();
    initBubbleInteractions();
    initLogoAnimation();
    initCardEffects();
    enhanceBurstAnimation();
    initControlPanel();
    initTypingEffect();
    initSmoothScroll();
    initDynamicGradients();
    initParticleSystem();
    addCustomAnimations();
    
    // Add loading animation
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    });
}

// Start the application
document.addEventListener('DOMContentLoaded', init);

// Add resize handler for responsive animations
window.addEventListener('resize', () => {
    // Recalculate particle positions
    const particles = document.querySelectorAll('.dynamic-star');
    particles.forEach(particle => {
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
    });
});

console.log('ChoVerse Advanced Website Initialized! 🚀✨');
