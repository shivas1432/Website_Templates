document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('show');
        });
    }
    
    // Top Edge Animation Enhancement
    function enhanceEdgeAnimation() {
        const edgeAnimation = document.querySelector('.edge-animation');
        
        // Create additional animation elements dynamically
        for (let i = 0; i < 3; i++) {
            const element = document.createElement('div');
            element.classList.add('animation-element');
            element.style.width = (Math.random() * 15 + 5) + '%';
            element.style.left = '-' + element.style.width;
            element.style.animationDelay = (Math.random() * 8) + 's';
            element.style.opacity = (Math.random() * 0.5 + 0.5);
            edgeAnimation.appendChild(element);
        }
    }
    
    // Initialize enhanced edge animation
    enhanceEdgeAnimation();
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle active class on clicked item
            item.classList.toggle('active');
            
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    
    // Tab Switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
    
    // Animation on Scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.content-wrapper, .stats-card, .vision-mission-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (elementPosition < screenPosition - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initialize the animation
    animateOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email && email.includes('@')) {
                // Simulate successful subscription
                emailInput.value = '';
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.textContent = 'Thank you for subscribing!';
                
                const formWrapper = document.querySelector('.newsletter-form-wrapper');
                formWrapper.appendChild(successMessage);
                
                // Remove success message after a few seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            } else {
                // Show error for invalid email
                emailInput.classList.add('error');
                setTimeout(() => {
                    emailInput.classList.remove('error');
                }, 1500);
            }
        });
    }
    
    // Image hover effects
    const imageCards = document.querySelectorAll('.image-card');
    
    imageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'var(--box-shadow)';
        });
    });
    
    // Animated stats counter
    function animateCounters() {
        const statElements = document.querySelectorAll('.stat-item h3');
        
        statElements.forEach(element => {
            const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
            const suffix = element.textContent.replace(/[\d]/g, '');
            let current = 0;
            const increment = target / 50; // Divide by steps
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + suffix;
                }
            }, 30);
        });
    }
    
    // Check if element is in viewport for counter animation
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Initialize counter when stats section is in view
    const statsSection = document.querySelector('.stats-section');
    let counterAnimated = false;
    
    function checkCounterAnimation() {
        if (!counterAnimated && statsSection && isInViewport(statsSection)) {
            animateCounters();
            counterAnimated = true;
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkCounterAnimation);
    
    // Check on initial load
    checkCounterAnimation();
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop;
                    
                    window.scrollTo({
                        top: offsetTop - 80, // Account for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Parallax effect for images
    function parallaxEffect() {
        const images = document.querySelectorAll('.image-card img');
        
        images.forEach(img => {
            const speed = 0.1;
            const yPos = -(window.pageYOffset * speed);
            img.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Only enable parallax on desktop
    if (window.innerWidth > 992) {
        window.addEventListener('scroll', parallaxEffect);
    }
    
    // Enhance social icons with hover tooltips
    const socialIcons = document.querySelectorAll('.social-icons a');
    
    socialIcons.forEach(icon => {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        
        // Determine tooltip text based on icon
        let tooltipText = '';
        if (icon.querySelector('.fa-twitter')) {
            tooltipText = 'Twitter';
        } else if (icon.querySelector('.fa-facebook-f')) {
            tooltipText = 'Facebook';
        } else if (icon.querySelector('.fa-instagram')) {
            tooltipText = 'Instagram';
        } else if (icon.querySelector('.fa-linkedin-in')) {
            tooltipText = 'LinkedIn';
        }
        
        tooltip.textContent = tooltipText;
        icon.appendChild(tooltip);
        
        icon.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(-10px)';
        });
        
        icon.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(0)';
        });
    });
    
    // Preloader
    function hidePreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('hide');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }
    
    // Hide preloader when page is loaded
    window.addEventListener('load', hidePreloader);
    
    // Add additional stats animation
    const statsCard = document.querySelector('.stats-card');
    
    if (statsCard) {
        statsCard.addEventListener('mouseenter', function() {
            const statsImage = this.querySelector('.stats-image img');
            if (statsImage) {
                statsImage.style.animationDuration = '1.5s';
                statsImage.style.transform = 'scale(1.1)';
            }
        });
        
        statsCard.addEventListener('mouseleave', function() {
            const statsImage = this.querySelector('.stats-image img');
            if (statsImage) {
                statsImage.style.animationDuration = '3s';
                statsImage.style.transform = 'scale(1)';
            }
        });
    }
    
    // Add reveal animations for vision and mission headings
    const headings = document.querySelectorAll('.text-content h1');
    
    headings.forEach(heading => {
        heading.innerHTML = heading.textContent.split('').map(char => {
            if (char === ' ') {
                return ' ';
            }
            return `<span class="reveal-char">${char}</span>`;
        }).join('');
        
        const chars = heading.querySelectorAll('.reveal-char');
        
        chars.forEach((char, index) => {
            char.style.animationDelay = `${index * 0.05}s`;
        });
    });
    
    // Function to check if dark mode is preferred
    function checkDarkModePreference() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Apply dark mode if preferred
    if (checkDarkModePreference()) {
        document.body.classList.add('dark-mode');
    }
    
    // Watch for changes in dark mode preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
    
    // Initialize Animations
    function initAnimations() {
        // Add animation to main elements
        document.querySelectorAll('.vision-mission-card, .content-wrapper, .stats-card').forEach(el => {
            el.classList.add('animated');
        });
    }
    
    // Run animations after a slight delay
    setTimeout(initAnimations, 500);
});