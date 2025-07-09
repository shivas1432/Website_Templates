document.addEventListener("DOMContentLoaded", function() {
    // Smooth Fade-In Animation
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => observer.observe(element));

    // Mobile Navigation Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    hamburger.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });

    // Form Submission Alert
    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Message sent successfully!");
    });

    // Portfolio Modal Functionality
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close');

    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const modalId = item.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = 'flex';
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = btn.closest('.modal');
            modal.style.display = 'none';
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById("contactForm");
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Thank you for reaching out! We will get back to you soon.");
        contactForm.reset();
    });

    // Show More Reviews Button
    const showMoreButton = document.getElementById('showMoreReviews');
    const reviews = document.querySelectorAll('.review-item');

    const initialReviewCount = 3;
    reviews.forEach((review, index) => {
        if (index >= initialReviewCount) {
            review.style.display = 'none';
        }
    });

    showMoreButton.addEventListener('click', function() {
        const hiddenReviews = Array.from(reviews).filter(review => review.style.display === 'none');
        hiddenReviews.forEach(review => {
            review.style.display = 'block';
        });
        showMoreButton.style.display = 'none';
    });
});

document.addEventListener('mousemove', function (e) {
    const smoke = document.createElement('div');
    smoke.classList.add('smoke-effect');
    document.body.appendChild(smoke);

    smoke.style.left = `${e.pageX}px`;
    smoke.style.top = `${e.pageY}px`;

    setTimeout(() => {
        smoke.remove();
    }, 1000); // Remove the effect after the animation
});
