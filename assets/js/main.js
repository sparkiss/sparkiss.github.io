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

// Skills data with weights (1-5, where 5 is most prominent)
const skills = [
    // Databases - High weight
    { name: 'Oracle', weight: 5, category: 'database' },
    { name: 'MySQL', weight: 5, category: 'database' },
    { name: 'PostgreSQL', weight: 4, category: 'database' },
    { name: 'MS SQL Server', weight: 4, category: 'database' },
    { name: 'MongoDB', weight: 4, category: 'database' },
    { name: 'Firebird', weight: 3, category: 'database' },
    { name: 'SQLite', weight: 3, category: 'database' },

    // Programming Languages
    { name: 'PHP', weight: 5, category: 'language' },
    { name: 'Rust', weight: 5, category: 'language' },
    { name: 'C++', weight: 4, category: 'language' },
    { name: 'Python', weight: 4, category: 'language' },
    { name: 'Java', weight: 4, category: 'language' },
    { name: 'Go', weight: 4, category: 'language' },
    { name: 'C', weight: 3, category: 'language' },
    { name: 'C#', weight: 3, category: 'language' },

    // Frameworks
    { name: 'Yii Framework', weight: 5, category: 'framework' },
    { name: 'Symfony', weight: 4, category: 'framework' },
    { name: 'Flask', weight: 3, category: 'framework' },
    { name: 'Actix', weight: 4, category: 'framework' },
    { name: 'Axum', weight: 4, category: 'framework' },
    { name: 'Qt', weight: 4, category: 'framework' },
    { name: '.NET', weight: 3, category: 'framework' },

    // Architecture & Patterns
    { name: 'Microservices', weight: 5, category: 'architecture' },
    { name: 'REST API', weight: 5, category: 'architecture' },
    { name: 'DDD', weight: 4, category: 'architecture' },
    { name: 'TDD', weight: 4, category: 'architecture' },
    { name: 'Event-Driven', weight: 4, category: 'architecture' },

    // Search & Indexing
    { name: 'Elasticsearch', weight: 5, category: 'search' },
    { name: 'Apache Solr', weight: 4, category: 'search' },

    // Message Queues
    { name: 'RabbitMQ', weight: 5, category: 'messaging' },
    { name: 'Kafka', weight: 5, category: 'messaging' },
    { name: 'Redpanda', weight: 4, category: 'messaging' },
    { name: 'Beanstalkd', weight: 4, category: 'messaging' },

    // Caching
    { name: 'Redis', weight: 5, category: 'caching' },
    { name: 'Memcached', weight: 3, category: 'caching' },

    // DevOps & Tools
    { name: 'Docker', weight: 5, category: 'devops' },
    { name: 'GitLab CI', weight: 4, category: 'devops' },
    { name: 'Git', weight: 5, category: 'devops' },
    { name: 'Linux', weight: 5, category: 'devops' },
    { name: 'Nginx', weight: 4, category: 'devops' },
    { name: 'Apache', weight: 4, category: 'devops' },

    // Development Tools
    { name: 'Visual Studio', weight: 4, category: 'tools' },
    { name: 'NeoVim', weight: 4, category: 'tools' },
    { name: 'Qt Creator', weight: 3, category: 'tools' },

    // Specialized
    { name: 'VoIP', weight: 3, category: 'specialized' },
    { name: 'POS Systems', weight: 3, category: 'specialized' },
    { name: 'Langfuse', weight: 3, category: 'specialized' },

    // Platforms
    { name: 'Android', weight: 3, category: 'platform' },
    { name: 'iOS', weight: 3, category: 'platform' },
    { name: 'Windows', weight: 4, category: 'platform' },
];

// Color palette for different categories
const categoryColors = {
    database: '#3b82f6',      // Blue
    language: '#8b5cf6',      // Purple
    framework: '#10b981',     // Green
    architecture: '#f59e0b',  // Orange
    search: '#ef4444',        // Red
    messaging: '#ec4899',     // Pink
    caching: '#14b8a6',       // Teal
    devops: '#6366f1',        // Indigo
    tools: '#84cc16',         // Lime
    specialized: '#f97316',   // Orange-red
    platform: '#06b6d4',      // Cyan
};

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
    if (!tagCloudElement) return;

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
