// Initialize AOS animation library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });

    // Profile dropdown toggle
    const profile = document.querySelector('.profile');
    const dropdown = document.querySelector('.dropdown__wrapper');

    if (profile && dropdown) {
        profile.addEventListener('click', () => {
            dropdown.classList.toggle('hide');
            dropdown.classList.toggle('dropdown__wrapper--fade-in');
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", (event) => {
            const isClickInsideDropdown = dropdown.contains(event.target);
            const isProfileClicked = profile.contains(event.target);

            if (!isClickInsideDropdown && !isProfileClicked) {
                dropdown.classList.add('hide');
            }
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show-mobile-menu');
            mobileMenuBtn.classList.toggle('menu-open');
        });
    }

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('data-target');
            const data = +counter.innerText;
            
            const time = value / speed;
            
            if (data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 1);
            } else {
                counter.innerText = value;
            }
        };
        
        animate();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Video playback control
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    });

    // Set current year in footer
    document.getElementById("year").innerHTML = new Date().getFullYear();

    // Add scroll animation for header
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('header-scrolled');
            
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('header-scrolled');
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Parallax effect for sections
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        document.querySelectorAll('.solar-clip, .solar-image').forEach(element => {
            element.style.transform = `translateY(${scrollPosition * 0.05}px) rotateY(${scrollPosition * 0.01}deg)`;
        });
    });

    // Add CSS class to elements when they come into viewport
    const addInViewClass = () => {
        const elements = document.querySelectorAll('.service1, .service2, .service3, .plan, .small-container');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('in-viewport');
            }
        });
    };

    window.addEventListener('scroll', addInViewClass);
    addInViewClass(); // Check on initial load

    // Enhance the top edge animation with dynamic behavior
    const topEdge = document.querySelector('.top-edge-animation');
    
    if (topEdge) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollPercentage = (scrollPosition / maxScroll) * 100;
            
            // Change the animation based on scroll position
            topEdge.style.backgroundPosition = `${scrollPercentage}% 50%`;
        });
    }
});