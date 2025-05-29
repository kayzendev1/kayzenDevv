// DOM Elements
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const visualizer = document.getElementById('visualizer');
const creditsToggle = document.getElementById('creditsToggle');
const creditsPopup = document.getElementById('creditsPopup');

// Music Player Functionality
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        isPlaying = false;
        visualizer.classList.remove('active');
    } else {
        bgMusic.play().then(() => {
            isPlaying = true;
            visualizer.classList.add('active');
        }).catch((error) => {
            console.log('Auto-play prevented by browser policy');
        });
    }
});

// Audio event listeners
bgMusic.addEventListener('ended', () => {
    isPlaying = false;
    visualizer.classList.remove('active');
});

bgMusic.addEventListener('play', () => {
    isPlaying = true;
    visualizer.classList.add('active');
});

bgMusic.addEventListener('pause', () => {
    isPlaying = false;
    visualizer.classList.remove('active');
});

// Credits Panel Functionality
let creditsExpanded = false;

creditsToggle.addEventListener('click', () => {
    creditsExpanded = !creditsExpanded;
    if (creditsExpanded) {
        creditsPopup.classList.add('active');
    } else {
        creditsPopup.classList.remove('active');
    }
});

// Close credits when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('.floating-credits')) {
        creditsExpanded = false;
        creditsPopup.classList.remove('active');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Smooth Scrolling for Project Button
document.querySelector('a[href="#projects"]').addEventListener('click', (e) => {
    e.preventDefault();
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
        projectsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe all sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingElements = document.querySelectorAll('.orb');
    
    floatingElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Auto-scroll functionality (Toggle with Ctrl+A)
let autoScrollActive = false;
let autoScrollInterval;

const toggleAutoScroll = () => {
    if (autoScrollActive) {
        clearInterval(autoScrollInterval);
        autoScrollActive = false;
        console.log('Auto-scroll disabled');
    } else {
        autoScrollActive = true;
        console.log('Auto-scroll enabled');
        
        const sections = document.querySelectorAll('section');
        let currentSection = 0;
        
        autoScrollInterval = setInterval(() => {
            if (currentSection < sections.length) {
                sections[currentSection].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                currentSection++;
            } else {
                currentSection = 0;
            }
        }, 4000); // Scroll every 4 seconds
    }
};

// Keyboard shortcut for auto-scroll (Ctrl+A)
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'a' && e.ctrlKey) {
        e.preventDefault();
        toggleAutoScroll();
    }
});

// Skill cards hover animation
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.skill-icon');
        icon.style.animation = 'bounce 0.6s ease-in-out';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.skill-icon');
        icon.style.animation = '';
    });
});

// Service cards hover effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Add stagger animation to credit items
document.querySelectorAll('.credit-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.addEventListener('mouseenter', () => {
        item.style.color = '#6366f1';
        item.style.background = 'rgba(255, 255, 255, 0.1)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.color = '#cbd5e1';
        item.style.background = '';
    });
});

// Dynamic typing effect for hero subtitle (optional enhancement)
const heroSubtitle = document.querySelector('.hero-subtitle');
const originalText = heroSubtitle.textContent;
const typingSpeed = 100;

function typeWriter(text, element, speed) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 1000); // Start after 1 second
}

// Uncomment the line below to enable typing effect
// typeWriter(originalText, heroSubtitle, typingSpeed);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    const scrolled = window.pageYOffset;
    const floatingElements = document.querySelectorAll('.orb');
    
    floatingElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

console.log('kayzenDev Portfolio loaded successfully!');
console.log('Press Ctrl+A to toggle auto-scroll feature');