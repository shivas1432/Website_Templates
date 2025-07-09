// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const profile = document.querySelector('.profile');
    const dropdown = document.querySelector('.dropdown__wrapper');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const topEdge = document.querySelector('.top-edge-animation');
    const heroSection = document.querySelector('.hero');
    const header = document.querySelector('header');

    // Check if images exist and are loading properly
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.addEventListener('error', function() {
                console.error(`Failed to load image: ${img.src}`);
                // Replace with a placeholder if image fails to load
                img.src = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 300 200%22%3E%3Crect width%3D%22300%22 height%3D%22200%22 fill%3D%22%23cccccc%22%3E%3C%2Frect%3E%3Ctext x%3D%22150%22 y%3D%22100%22 font-size%3D%2220%22 text-anchor%3D%22middle%22 alignment-baseline%3D%22middle%22 fill%3D%22%23666666%22%3EImage Not Found%3C%2Ftext%3E%3C%2Fsvg%3E';
            });
        }
    });

    // Toggle dropdown menu
    if (profile && dropdown) {
        profile.addEventListener('click', (e) => {
            e.stopPropagation();
            if (dropdown.classList.contains('hide')) {
                dropdown.classList.remove('hide');
                dropdown.classList.add('dropdown__wrapper--fade-in');
            } else {
                dropdown.classList.remove('dropdown__wrapper--fade-in');
                dropdown.classList.add('hide');
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            const isClickInsideDropdown = dropdown.contains(event.target);
            const isProfileClicked = profile.contains(event.target);

            if (!isClickInsideDropdown && !isProfileClicked) {
                dropdown.classList.remove('dropdown__wrapper--fade-in');
                dropdown.classList.add('hide');
            }
        });
    }

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            let mobileMenu = document.querySelector('.show-mobile-menu');
            
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.classList.add('show-mobile-menu');
                
                // Create nav links
                const navLinks = document.createElement('nav');
                navLinks.innerHTML = `
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#subscription">Subscription</a></li>
                        <li><a href="#">Animals</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                `;
                
                mobileMenu.appendChild(navLinks);
                document.body.appendChild(mobileMenu);
                
                // Style nav links
                const links = navLinks.querySelectorAll('a');
                links.forEach(link => {
                    link.style.color = '#fff';
                    link.style.fontSize = '1.5rem';
                    link.style.fontWeight = 'bold';
                    link.style.textDecoration = 'none';
                    link.style.display = 'block';
                    link.style.padding = '15px 0';
                    link.style.transition = 'all 0.3s ease';
                });
                
                navLinks.querySelectorAll('li').forEach(item => {
                    item.style.marginBottom = '20px';
                    item.style.textAlign = 'center';
                });
                
                // Add close functionality to menu links
                links.forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.remove();
                        mobileMenuBtn.classList.remove('active');
                    });
                });
            } else {
                mobileMenu.remove();
            }
        });
    }

    // Smooth scrolling for the scroll indicator
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const storySection = document.querySelector('.story');
            if (storySection) {
                storySection.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Make sure all sections are visible
    const sections = document.querySelectorAll('.section-title, .story, .grid-container, .spotlight-container, .container.wildlife-cards, .pricing-table');
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
    });

    // Add manual fade-in animations for sections as you scroll
    const addFadeInOnScroll = () => {
        const fadeElements = document.querySelectorAll('.grid-item, .content-block, .wildlife-cards > div, .plan');
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                if (!element.classList.contains('plan')) {
                    element.style.transform = 'translateY(0)';
                }
            } else {
                element.style.opacity = '0';
                if (!element.classList.contains('plan')) {
                    element.style.transform = 'translateY(50px)';
                }
            }
        });
    };

    // Parallax effect for hero section background with safety check
    window.addEventListener('scroll', () => {
        if (heroSection) {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
        
        // Enhanced top edge animation based on scroll
        if (topEdge) {
            const scrollPosition = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollPercentage = (scrollPosition / maxScroll) * 100;
            
            topEdge.style.backgroundPosition = `${scrollPercentage}% 50%`;
        }
        
        // Header background opacity change on scroll
        if (header) {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            } else {
                header.style.backgroundColor = 'rgba(26, 26, 26, 0.75)';
            }
        }
        
        // Call the fade-in function as you scroll
        addFadeInOnScroll();
    });

    // Initial fade check (in case some elements are already in viewport)
    addFadeInOnScroll();

    // Gallery image hover effect
    const galleryImages = document.querySelectorAll('.grid-item img, .wildlife-cards img');
    
    galleryImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add interactivity to content blocks
    const contentBlocks = document.querySelectorAll('.content-block');
    
    contentBlocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.content-overlay');
            if (overlay) {
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
            }
        });
        
        block.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.content-overlay');
            if (overlay) {
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
            }
        });
    });

    // Subscription buttons
    const subscribeButtons = document.querySelectorAll('.btn-subscribe');
    
    subscribeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planName = this.closest('.plan').querySelector('h3').textContent;
            alert(`Thank you for choosing our ${planName} plan! We'll contact you soon with more details.`);
        });
    });

    // Add current year to footer copyright
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-bottom p');
    if (copyrightElement) {
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2024', currentYear);
    }

    // Fix any broken background images
    const backgroundElements = ['.sparrow', '.dog', '.cat', '.horse', '.hero'];
    backgroundElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            // Add a fallback background color
            element.style.backgroundColor = '#1a1a1a';
        });
    });

    // Add a loading complete event
    window.addEventListener('load', () => {
        console.log('All resources finished loading!');
        document.body.classList.add('loaded');
    });
});