// DOM Elements
const slider = document.querySelector('.slider');
const menuToggle = document.querySelector('.menu-toggle');
const playerControls = document.querySelector('.player-controls');
const edgeAnimation = document.querySelector('.animated-edge');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeUpBtn = document.getElementById('volumeUpBtn');
const volumeDownBtn = document.getElementById('volumeDownBtn');
const showMoreBtn = document.getElementById('show-more');
const albumsContainer = document.querySelector('.albums');

// Variables to track audio state
let currentAudio = null;
let currentPlayButton = null;
let isPlaying = false;
let volume = 0.7;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  // Add animations to elements on page load
  animateOnScroll();
  
  // Initialize albums scroll position
  let scrollAmount = 0;
  const itemWidth = 140; // Width of each album item + gap
  
  // Initialize audio elements
  document.querySelectorAll('audio').forEach(audio => {
    audio.volume = volume;
    audio.preload = 'metadata';
  });
});

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
  playerControls.classList.toggle('active');
});

// Hide mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!playerControls.contains(e.target) && !menuToggle.contains(e.target)) {
    playerControls.classList.remove('active');
  }
});

// Slider navigation
function activate(e) {
  if (e.target.closest('.next')) {
    slider.append(slider.children[0]);
    animateSlider('next');
  } else if (e.target.closest('.prev')) {
    slider.prepend(slider.children[slider.children.length - 1]);
    animateSlider('prev');
  }
}

// Add click event listener for slider navigation
document.addEventListener('click', (e) => {
  if (e.target.closest('.btn')) {
    activate(e);
  }
});

// Animate slider on navigation
function animateSlider(direction) {
  const items = document.querySelectorAll('.item');
  const activeItem = items[1]; // Second item is always active
  
  // Reset all animations
  items.forEach(item => {
    item.style.animation = 'none';
    item.offsetHeight; // Trigger reflow
    item.style.animation = '';
  });
  
  // Show content with animation
  const content = activeItem.querySelector('.content');
  if (content) {
    content.style.display = 'block';
    content.style.animation = 'show 0.75s ease-in-out 0.3s forwards';
  }
}

// Play audio function
function playSound(audioId, button) {
  // Stop current audio if playing
  if (currentAudio) {
    pauseCurrentAudio();
  }

  // Play the new audio
  const audio = document.getElementById(audioId);
  const playButton = button;
  const pauseButton = playButton.nextElementSibling;
  
  if (audio) {
    audio.volume = volume;
    audio.play().catch(e => console.log('Audio play error:', e));
    
    // Update UI
    playButton.style.display = 'none';
    pauseButton.style.display = 'flex';
    
    // Update current references
    currentAudio = audio;
    currentPlayButton = playButton;
    isPlaying = true;
    
    // Update header play button
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    
    // Add ended event listener
    audio.onended = () => {
      pauseSound(audioId, pauseButton);
    };
  }
}

// Pause audio function
function pauseSound(audioId, button) {
  const audio = document.getElementById(audioId);
  const pauseButton = button;
  const playButton = pauseButton.previousElementSibling;
  
  if (audio) {
    audio.pause();
    
    // Update UI
    pauseButton.style.display = 'none';
    playButton.style.display = 'flex';
    
    // Reset state if this was the current audio
    if (currentAudio === audio) {
      currentAudio = null;
      currentPlayButton = null;
      isPlaying = false;
      
      // Update header play button
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }
}

// Helper function to pause the current audio
function pauseCurrentAudio() {
  if (currentAudio && currentPlayButton) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    
    // Find and update the buttons
    const playButton = currentPlayButton;
    const pauseButton = playButton.nextElementSibling;
    
    playButton.style.display = 'flex';
    pauseButton.style.display = 'none';
  }
}

// Header player controls
playPauseBtn.addEventListener('click', () => {
  if (currentAudio) {
    if (isPlaying) {
      currentAudio.pause();
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      
      // Find and update the buttons for the currently playing audio
      if (currentPlayButton) {
        const pauseButton = currentPlayButton.nextElementSibling;
        currentPlayButton.style.display = 'flex';
        pauseButton.style.display = 'none';
      }
      
      isPlaying = false;
    } else {
      currentAudio.play();
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      
      // Find and update the buttons for the currently playing audio
      if (currentPlayButton) {
        const pauseButton = currentPlayButton.nextElementSibling;
        currentPlayButton.style.display = 'none';
        pauseButton.style.display = 'flex';
      }
      
      isPlaying = true;
    }
  } else {
    // Play the first audio if none is playing
    const firstAudio = document.querySelector('audio');
    const firstPlayButton = document.querySelector('.play-button');
    
    if (firstAudio && firstPlayButton) {
      playSound(firstAudio.id, firstPlayButton);
    }
  }
});

// Volume controls
volumeUpBtn.addEventListener('click', () => {
  if (volume < 1) {
    volume = Math.min(volume + 0.1, 1);
    updateAllAudioVolume();
  }
});

volumeDownBtn.addEventListener('click', () => {
  if (volume > 0) {
    volume = Math.max(volume - 0.1, 0);
    updateAllAudioVolume();
  }
});

// Update volume for all audio elements
function updateAllAudioVolume() {
  document.querySelectorAll('audio').forEach(audio => {
    audio.volume = volume;
  });
}

// Album scroll navigation
showMoreBtn.addEventListener('click', () => {
  const scrollWidth = albumsContainer.scrollWidth;
  const containerWidth = albumsContainer.clientWidth;
  let scrollAmount = albumsContainer.scrollLeft + containerWidth;
  
  // Reset to beginning if at the end
  if (scrollAmount >= scrollWidth - 50) {
    scrollAmount = 0;
  }
  
  // Smooth scroll
  albumsContainer.scrollTo({
    left: scrollAmount,
    behavior: 'smooth'
  });
});

// Animate elements on scroll
function animateOnScroll() {
  // Get all elements to animate
  const elements = document.querySelectorAll('.flexitem, .album-item, .song');
  
  // Create IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, { threshold: 0.1 });
  
  // Observe each element
  elements.forEach((element, index) => {
    // Set initial styles
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `all 0.5s ease ${index * 0.1}s`;
    
    // Start observing
    observer.observe(element);
  });
}

// Handle window resize events
window.addEventListener('resize', () => {
  // Adjust mobile menu display
  if (window.innerWidth > 768 && playerControls.classList.contains('active')) {
    playerControls.classList.remove('active');
  }
});

// Add parallax effect to background
document.addEventListener('mousemove', (e) => {
  const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
  const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
  
  document.body.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
    }
  });
});