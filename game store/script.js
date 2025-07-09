// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const edgeAnimation = document.querySelector('.animated-edge');
const gameCards = document.querySelectorAll('.game-card');
const featuredVideo = document.querySelector('.featured-video');

// Toggle Mobile Menu
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
    }
});

// Popup Management
function togglePopup(popupId) {
    const popup = document.getElementById(popupId);
    
    // Hide all popups
    document.querySelectorAll('.popup').forEach(pp => {
        if (pp.id !== popupId) {
            pp.classList.add('hidden');
        }
    });
    
    // Toggle the selected popup
    popup.classList.toggle('hidden');
    
    // Stop event propagation
    event.stopPropagation();
}

// Hide popups when clicking outside
window.addEventListener('click', (event) => {
    if (!event.target.closest('.popup') && !event.target.closest('.dropdown')) {
        document.querySelectorAll('.popup').forEach(popup => {
            popup.classList.add('hidden');
        });
    }
});

// Toggle Background Music
function toggleMusic(audioId) {
    const audio = document.getElementById(audioId);
    
    // Stop all other audio elements
    document.querySelectorAll('audio').forEach(a => {
        if (a.id !== audioId) {
            a.pause();
            a.currentTime = 0;
        }
    });
    
    // Play or pause the selected audio
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
        audio.currentTime = 0;
    }
}

// Search Games Functionality
function searchGames() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        const gameName = card.querySelector('h3').textContent.toLowerCase();
        
        if (gameName.includes(searchQuery)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// Show games by category
function showGamesByCategory(category) {
    // This would typically filter games by category from a database
    console.log(`Showing games in category: ${category}`);
    
    // For now, just show an alert
    alert(`Loading games in the ${category.toUpperCase()} category...`);
    
    // Hide all popups after selection
    document.querySelectorAll('.popup').forEach(popup => {
        popup.classList.add('hidden');
    });
}

// Show game details
function showGameDetails(gameId) {
    console.log(`Showing details for game: ${gameId}`);
    
    // In a real implementation, this would fetch game data and display it
    alert(`Loading details for game: ${gameId}`);
    
    // Hide all popups after selection
    document.querySelectorAll('.popup').forEach(popup => {
        popup.classList.add('hidden');
    });
}

// Show specific section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    document.getElementById(sectionId).classList.remove('hidden');
}

// Add scroll animations
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Animate the edge based on scroll position
    edgeAnimation.style.opacity = 1 - (scrollPosition / 1000);
    
    // Animate game cards on scroll
    gameCards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        
        if (cardPosition < screenHeight * 0.8) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
});

// Initialize game cards with opacity 0 for scroll animation
gameCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Add random hover effect colors to game cards
gameCards.forEach(card => {
    const randomHue = Math.floor(Math.random() * 360);
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = `0 15px 30px rgba(0, 0, 0, 0.4), 0 0 15px hsla(${randomHue}, 80%, 60%, 0.3)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Show the home section by default
    showSection('home');
    
    // Add a subtle animation to the featured video on hover
    featuredVideo.addEventListener('mouseenter', () => {
        featuredVideo.style.transform = 'scale(1.02)';
    });
    
    featuredVideo.addEventListener('mouseleave', () => {
        featuredVideo.style.transform = 'scale(1)';
    });
    
    // Preload audio files
    document.querySelectorAll('audio').forEach(audio => {
        audio.load();
    });
});