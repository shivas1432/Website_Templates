// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Main elements
    const sections = document.querySelectorAll('.slider-section');
    const navCircles = document.querySelectorAll('.circle');
    const viewMoreBtn = document.querySelector('.view-more');
    const mainHeading = document.querySelector('.main-heading');
    const model = document.querySelector('.model');

    // Section tracking
    let currentSectionIndex = 0;

    // Create background particles
    createParticles();

    // Function to create background particles
    function createParticles() {
        const particles = document.querySelector('.particles');
        const particleCount = 100;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.width = `${Math.random() * 3 + 1}px`;
            particle.style.height = particle.style.width;
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particles.appendChild(particle);
        }
        
        // Add particle style
        const style = document.createElement('style');
        style.textContent = `
            .particle {
                position: absolute;
                background-color: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                pointer-events: none;
                animation: floatParticle linear infinite;
            }
            
            @keyframes floatParticle {
                0% {
                    transform: translateY(0) translateX(0);
                }
                25% {
                    transform: translateY(-20px) translateX(10px);
                }
                50% {
                    transform: translateY(0) translateX(20px);
                }
                75% {
                    transform: translateY(20px) translateX(10px);
                }
                100% {
                    transform: translateY(0) translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Function to animate elements in a section
    function animateSection(section) {
        const elementsToAnimate = section.querySelectorAll('.animate-on-scroll');
        elementsToAnimate.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('in-view');
            }, index * 150);
        });
    }

    // Update navigation circles to highlight the correct one
    function updateNavCircles(index) {
        navCircles.forEach(circle => circle.classList.remove('active'));
        if (navCircles[index]) {
            navCircles[index].classList.add('active');
        }
    }

    // Navigate between sections
    function goToSection(index) {
        // Validate index
        if (index < 0) index = 0;
        if (index >= sections.length) index = sections.length - 1;
        
        // Update current index
        currentSectionIndex = index;
        
        // Hide all sections with smooth exit animation
        sections.forEach(section => {
            if (section.classList.contains('active')) {
                section.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.5s ease';
                section.style.opacity = '0';
                setTimeout(() => {
                    section.classList.remove('active');
                    section.style.opacity = '';
                }, 500);
            }
        });
        
        // Show current section after short delay for smooth transition
        setTimeout(() => {
            sections[currentSectionIndex].classList.add('active');
            sections[currentSectionIndex].style.opacity = '0';
            setTimeout(() => {
                sections[currentSectionIndex].style.opacity = '1';
            }, 50);
            
            // Update navigation
            updateNavCircles(currentSectionIndex);
            
            // Animate elements in the section
            animateSection(sections[currentSectionIndex]);
        }, 500);
    }

    // Set up navigation circles
    navCircles.forEach((circle, index) => {
        circle.addEventListener('click', function() {
            if (circle.classList.contains('active')) return;
            
            // Get section to navigate to from data attribute
            const sectionId = this.getAttribute('data-section');
            
            // Find the section index by id
            let sectionIndex = 0;
            sections.forEach((section, idx) => {
                if (section.id === sectionId) {
                    sectionIndex = idx;
                }
            });
            
            goToSection(sectionIndex);
            
            // Add ripple effect
            addRippleEffect(this);
            
            // Add active class to clicked circle and remove from others
            navCircles.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Add ripple effect to circles
    function addRippleEffect(element) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        element.appendChild(ripple);
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${0}px`;
        ripple.style.top = `${0}px`;
        
        ripple.classList.add('active');
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // View More button
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            goToSection(1); // Go to About section
            addRippleEffect(this);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            goToSection(currentSectionIndex - 1);
        } else if (e.key === 'ArrowRight') {
            goToSection(currentSectionIndex + 1);
        }
    });

    // Touch swipe for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 100;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left = next section
            goToSection(currentSectionIndex + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right = previous section
            goToSection(currentSectionIndex - 1);
        }
    }

    // Add typing animation effect to main heading
    function typeWriter(element, text, speed = 70) {
        // Add the typewriter class for the cursor effect
        element.classList.add('typewriter');
        element.textContent = "";
        
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Remove the typewriter class after typing is complete
                setTimeout(() => {
                    element.classList.remove('typewriter');
                }, 1000);
            }
        }
        
        type();
    }

    // Apply gradient text to highlights
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
        highlight.classList.add('gradient-text');
    });

    // Handle form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!name || !email || !message) {
                showFormMessage('Please fill out all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Show success message with typing effect
            showFormMessage('Message sent successfully!', 'success');
            
            // Reset form with animation
            const formElements = contactForm.querySelectorAll('input, textarea');
            formElements.forEach(element => {
                element.style.transition = 'all 0.3s ease';
                element.style.opacity = '0';
                setTimeout(() => {
                    element.value = '';
                    element.style.opacity = '1';
                }, 300);
            });
        });
    }

    // Function to show form messages
    function showFormMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        const formMessage = document.createElement('div');
        formMessage.classList.add('form-message', type);
        
        // typing effect to message
        const messageContent = document.createElement('span');
        formMessage.appendChild(messageContent);
        
        const contactForm = document.querySelector('.contact-form');
        contactForm.appendChild(formMessage);
        
        // Type the message
        let i = 0;
        function typeMessage() {
            if (i < message.length) {
                messageContent.textContent += message.charAt(i);
                i++;
                setTimeout(typeMessage, 20);
            }
        }
        typeMessage();
        
        // Remove type message after 3 seconds
        setTimeout(() => {
            formMessage.style.opacity = '0';
            setTimeout(() => {
                formMessage.remove();
            }, 300);
        }, 3000);
    }

    // Scroll-based animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Apply animation classes to elements, but EXCLUDE model element
    document.querySelectorAll('.skill-item, .cert-item, .project-card, .contact-item, .education-item').forEach(element => {
        // Exclude the model element from scroll animations
        if (element !== model) {
            element.classList.add('animate-on-scroll');
            observer.observe(element);
        }
    });

    // Enhanced hover effects for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            item.style.transform = 'translateY(-10px)';
            item.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            icon.style.transform = '';
            item.style.transform = '';
            item.style.boxShadow = '';
        });
    });

    //  hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const allCards = document.querySelectorAll('.project-card');
            allCards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                    c.style.transform = 'scale(0.98)';
                }
            });
        });
        card.addEventListener('mouseleave', () => {
            const allCards = document.querySelectorAll('.project-card');
            allCards.forEach(c => {
                c.style.opacity = '';
                c.style.transform = '';
            });
        });
    });

    // Initialize everything on load
    document.body.classList.add('loaded');
    
    // Apply glass effect to navigation and certain elements
    document.querySelector('nav').classList.add('glass-effect');
    document.querySelector('.nav-circles').classList.add('glass-effect');
    
    // Activate first section and circle
    navCircles[0].classList.add('active');
    goToSection(0);

    // Apply typing effect to main heading and model - ONE ANIMATION ONLY FOR EACH
    setTimeout(() => {
        // First animate the main heading
        if (mainHeading && mainHeading.textContent) {
            const originalText = mainHeading.textContent;
            typeWriter(mainHeading, originalText, 50);
        }
        
        // Wait for heading animation to complete before starting model animation
        setTimeout(() => {
            // Remove any existing animations or classes from model
            if (model) {
                // Store the original text
                const originalText = model.textContent;
                
                // Remove any existing classes that might cause animation conflicts
                model.classList.remove('slideLeft');
                model.classList.remove('animate-on-scroll');
                model.classList.remove('in-view');
                model.style.animation = 'none';
                
                // Force reflow to ensure old animations are cleared
                void model.offsetWidth;
                
                // Then apply ONLY the typewriter animation
                typeWriter(model, originalText, 70);
            }
        }, 1500);
    }, 1000);

    // Hide preloader with animation
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 800);
        }
    });
    
    // animated underline effect to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.style.transform = 'translateY(-3px)';
            title.style.color = 'var(--secondary-color)';
            
            const after = document.createElement('style');
            after.textContent = `
                .section-title:after {
                    width: 100% !important;
                    transition: width 0.4s ease !important;
                }
            `;
            document.head.appendChild(after);
            
            setTimeout(() => {
                document.head.removeChild(after);
            }, 400);
        });
        
        title.addEventListener('mouseleave', () => {
            title.style.transform = '';
            title.style.color = '';
        });
    });
    
    // Parallax effect for background blobs on mouse move
    document.addEventListener('mousemove', function(e) {
        const blobs = document.querySelectorAll('.blob');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        blobs.forEach((blob, index) => {
            const speed = 0.03 + (index * 0.01);
            const offsetX = (mouseX - 0.5) * speed * 100;
            const offsetY = (mouseY - 0.5) * speed * 100;
            
            blob.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
    
    // CSS for ripple effect if it doesn't exist
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            .circle {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
            @keyframes ripple {
                to {
                    transform: scale(2.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});