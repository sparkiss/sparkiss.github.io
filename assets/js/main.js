// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to 'dark' mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Add a little rotation animation
        this.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
}

// Skills data loaded from Jekyll _data files (see _data/skills.json)
const skills = window.siteData?.skills || [];
const categoryColors = window.siteData?.categoryColors || {};

// Shuffle array function for random positioning
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Create tag cloud
function createTagCloud() {
    const tagCloudElement = document.getElementById('tagCloud');
    if (!tagCloudElement || !skills.length) return;

    // Shuffle skills for visual variety
    const shuffledSkills = shuffleArray(skills);

    shuffledSkills.forEach(skill => {
        const tag = document.createElement('div');
        tag.className = `tag size-${skill.weight}`;
        tag.textContent = skill.name;
        tag.style.color = categoryColors[skill.category] || '#2563eb';

        // Add hover effect to show category
        tag.title = `${skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}`;

        // Add animation delay for staggered appearance
        tag.style.animationDelay = `${Math.random() * 0.5}s`;

        tagCloudElement.appendChild(tag);
    });
}

// Smooth scroll for anchor links (if any are added later)
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add intersection observer for fade-in animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.timeline-item, .strength-card, .edu-card, .homelab-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Add tag animation on hover
function initTagAnimations() {
    // This will be handled by CSS, but we can add additional JS effects if needed
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    createTagCloud();
    initSmoothScroll();
    initAnimations();

    // Slight delay for tag animations to ensure tags are rendered
    setTimeout(initTagAnimations, 100);
});

// Add a parallax effect to hero section on scroll (subtle)
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Log message for developers
console.log('%c👋 Hello! Thanks for checking out my portfolio.', 'font-size: 16px; font-weight: bold; color: #2563eb;');
console.log('%cFeel free to reach out at sparkiss@gmail.com', 'font-size: 14px; color: #6b7280;');
