/**
 * ROYAL SPICE RESTAURANT WEBSITE
 * Main JavaScript File
 */

// DOCUMENT READY
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initSidebar();
    initSlider();
    initScrollAnimation();
    updateYear();
});

// NAVIGATION SIDEBAR
function initSidebar() {
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.Links li');

    // Toggle sidebar
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.style.left = sidebar.style.left === '0px' ? '-290px' : '0px';
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (sidebar && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
            if (sidebar.style.left === '0px') {
                sidebar.style.left = '-290px';
            }
        }
    });

    // Navigation link click handler
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            navLinks.forEach(item => item.classList.remove('activeLink'));
            // Add active class to clicked link
            this.classList.add('activeLink');
            // Call navigation function
            Navigate(index);
            // Close sidebar on mobile
            if (window.innerWidth < 768) {
                sidebar.style.left = '-290px';
            }
        });
    });
}

// SECTION NAVIGATION
function Navigate(index) {
    const sections = [
        document.querySelector('.intro-bar'),
        document.querySelector('.special-selection'),
        document.querySelector('.tasty-menu'),
        document.querySelector('.dilicious-dishes'),
        document.querySelector('.contact-container'),
        document.querySelector('.location-display')
    ];

    if (sections[index]) {
        sections[index].scrollIntoView({ behavior: 'smooth' });
    }
}

// IMAGE SLIDER
function initSlider() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const listItems = document.querySelectorAll('.breakfast-list li');
    let currentIndex = 0;
    let autoSlideInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    // Update slide position
    function updateSlidePosition() {
        if (sliderWrapper) {
            sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }

    // Update active thumbnail
    function updateActiveThumbnail() {
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === currentIndex);
        });
    }

    // Auto slider function
    function startAutoSlider() {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % thumbnails.length;
            updateSlidePosition();
            updateActiveThumbnail();
        }, 4000);
    }

    // Stop auto slider
    function stopAutoSlider() {
        clearInterval(autoSlideInterval);
    }

    // Show specific slide
    function showSlide(index) {
        if (index < 0) {
            index = thumbnails.length - 1;
        } else if (index >= thumbnails.length) {
            index = 0;
        }
        
        currentIndex = index;
        updateSlidePosition();
        updateActiveThumbnail();
    }

    // Add touch events for mobile swipe
    if (sliderWrapper) {
        sliderWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlider();
        }, { passive: true });

        sliderWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlider();
        }, { passive: true });
    }

    // Handle touch swipe
    function handleSwipe() {
        // Right to left (next)
        if (touchEndX < touchStartX - 50) {
            showSlide(currentIndex + 1);
        }
        // Left to right (previous)
        else if (touchEndX > touchStartX + 50) {
            showSlide(currentIndex - 1);
        }
    }

    // Add click event listeners to thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            stopAutoSlider();
            showSlide(index);
            startAutoSlider();
        });
    });

    // Add click event listeners to list items
    listItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'));
            stopAutoSlider();
            showSlide(index);
            startAutoSlider();
        });
    });

    // Initialize slider
    if (sliderWrapper && thumbnails.length > 0) {
        updateSlidePosition();
        updateActiveThumbnail();
        startAutoSlider();
    }
}

// SCROLL ANIMATIONS
function initScrollAnimation() {
    // Elements to animate on scroll
    const elementsToAnimate = [
        ...document.querySelectorAll('.dish1, .dish2, .dish3, .dish4, .dish5'),
        ...document.querySelectorAll('.ss'),
        ...document.querySelectorAll('.menu-list'),
        document.querySelector('.contact-form'),
        document.querySelector('.location-display')
    ];

    // Observer options
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Intersection observer callback
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    };

    // Create observer
    const observer = new IntersectionObserver(handleIntersection, options);

    // Observe each element
    elementsToAnimate.forEach(element => {
        if (element) {
            element.classList.add('will-animate');
            observer.observe(element);
        }
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .will-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// UPDATE COPYRIGHT YEAR
function updateYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// TOOLTIP HANDLING
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.touch-me-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const tooltip = this.nextElementSibling;
            if (tooltip.classList.contains('tooltip')) {
                tooltip.style.display = 'block';
                setTimeout(() => {
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translateX(-50%) scale(1)';
                }, 10);
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const tooltip = this.nextElementSibling;
            if (tooltip.classList.contains('tooltip')) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateX(-50%) scale(0.9)';
                setTimeout(() => {
                    tooltip.style.display = 'none';
                }, 300);
            }
        });
    });
});