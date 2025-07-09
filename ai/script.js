// Timeline Visual JavaScript
class TimelineVisual {
    constructor() {
        this.timeline = document.querySelector('.timeline-visual');
        this.path = document.querySelector('.timeline-path');
        this.events = document.querySelectorAll('.timeline-event');
        this.progressBar = document.querySelector('.progress-bar');
        this.timelineContainer = document.querySelector('.timeline-container');
        
        this.init();
    }
    
    init() {
        this.setupScrollAnimation();
        this.setupEventInteractions();
        this.setupProgressBar();
        this.createAdditionalParticles();
        this.setupSVGAnimation();
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
            });
            
            event.addEventListener('mouseleave', () => {
                this.resetEventHighlight(event);
            });
            
            event.addEventListener('click', () => {
                this.showEventDetails(event);
            });
        });
    }
    
    highlightEvent(event, index) {
        // Create connection line to timeline
        const marker = event.querySelector('.event-marker');
        const rect = marker.getBoundingClientRect();
        const timelineRect = this.timeline.getBoundingClientRect();
        
        const connectionLine = document.createElement('div');
        connectionLine.className = 'event-connection';
        connectionLine.style.cssText = `
            position: absolute;
            width: 2px;
            height: 100px;
            background: linear-gradient(to bottom, transparent, var(--secondary-color));
            left: ${rect.left - timelineRect.left + rect.width / 2}px;
            top: ${rect.top - timelineRect.top - 100}px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        this.timeline.appendChild(connectionLine);
        
        // Force reflow
        connectionLine.offsetHeight;
        connectionLine.style.opacity = '1';
        
        // Store reference for cleanup
        event.connectionLine = connectionLine;
    }
    
    resetEventHighlight(event) {
        if (event.connectionLine) {
            event.connectionLine.style.opacity = '0';
            setTimeout(() => {
                event.connectionLine.remove();
                delete event.connectionLine;
            }, 300);
        }
    }
    
    setupProgressBar() {
        window.addEventListener('scroll', () => {
            const timelineRect = this.timeline.getBoundingClientRect();
            const timelineHeight = this.timeline.offsetHeight;
            const viewportHeight = window.innerHeight;
            
            if (timelineRect.top < viewportHeight && timelineRect.bottom > 0) {
                // Calculate progress based on timeline visibility
                const visiblePortion = Math.min(viewportHeight - timelineRect.top, timelineHeight);
                const progress = Math.max(0, Math.min(1, visiblePortion / timelineHeight));
                
                this.progressBar.style.width = `${progress * 100}%`;
            }
        });
    }
    
    createAdditionalParticles() {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'timeline-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--secondary-color);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.2};
                animation: floatParticle ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            this.timelineContainer.appendChild(particle);
        }
    }
    
    setupSVGAnimation() {
        // Create multiple pulses traveling along the path
        const svg = document.querySelector('.timeline-svg');
        const path = document.querySelector('.timeline-path');
        
        for (let i = 0; i < 3; i++) {
            const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            pulse.setAttribute('r', '6');
            pulse.setAttribute('fill', i % 2 === 0 ? '#FF00FF' : '#00FFFF');
            pulse.classList.add('timeline-pulse');
            
            const animateMotion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
            animateMotion.setAttribute('dur', `${8 + i * 2}s`);
            animateMotion.setAttribute('repeatCount', 'indefinite');
            animateMotion.setAttribute('begin', `${i * 2}s`);
            
            const mpath = document.createElementNS('http://www.w3.org/2000/svg', 'mpath');
            mpath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#timeline-path');
            
            animateMotion.appendChild(mpath);
            pulse.appendChild(animateMotion);
            svg.appendChild(pulse);
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
        
        // Animate in
        setTimeout(() => {
            detailView.classList.add('active');
        }, 10);
        
        // Close handlers
        const closeBtn = detailView.querySelector('.detail-close');
        closeBtn.addEventListener('click', () => {
            detailView.classList.remove('active');
            setTimeout(() => {
                detailView.remove();
            }, 300);
        });
        
        detailView.addEventListener('click', (e) => {
            if (e.target === detailView) {
                detailView.classList.remove('active');
                setTimeout(() => {
                    detailView.remove();
                }, 300);
            }
        });
    }
}

// Initialize timeline when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TimelineVisual();
});

// Additional CSS for JavaScript-created elements
const timelineStyles = `
    /* Timeline Particles */
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(10px, -10px);
        }
    }
    
    /* Event Connection Line */
    .event-connection {
        pointer-events: none;
        z-index: 1;
    }
    
    /* Event Detail View */
    .event-detail-view {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .event-detail-view.active {
        opacity: 1;
    }
    
    .detail-content {
        background: var(--card-darker);
        padding: 40px;
        border-radius: 20px;
        max-width: 500px;
        width: 90%;
        position: relative;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .event-detail-view.active .detail-content {
        transform: scale(1);
    }
    
    .detail-close {
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        color: var(--text-light);
        font-size: 24px;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    
    .detail-close:hover {
        opacity: 1;
    }
    
    .detail-content h2 {
        font-family: 'Orbitron', sans-serif;
        font-size: 28px;
        color: var(--secondary-color);
        margin-bottom: 10px;
    }
    
    .detail-year {
        font-family: 'Orbitron', sans-serif;
        font-size: 18px;
        color: var(--primary-color);
        margin-bottom: 20px;
    }
    
    .detail-content p {
        color: var(--text-gray);
        line-height: 1.6;
        margin-bottom: 30px;
    }
    
    .detail-actions {
        display: flex;
        gap: 20px;
    }
    
    .detail-actions button {
        flex: 1;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .btn-book {
        background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
    }
    
    .btn-learn {
        background: none;
        border: 2px solid var(--secondary-color);
        color: var(--secondary-color);
    }
    
    .btn-book:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 0, 255, 0.4);
    }
    
    .btn-learn:hover {
        background: var(--secondary-color);
        color: var(--bg-dark);
    }
`;

// Inject styles
const styleElement = document.createElement('style');
styleElement.textContent = timelineStyles;
document.head.appendChild(styleElement);