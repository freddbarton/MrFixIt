// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields (Name, Email, and Message).');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you within 24 hours.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Scroll progress indicator
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        let progressBar = document.querySelector('.scroll-indicator');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-indicator';
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // Active navigation highlighting
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav a[href^="#"]');
        
        let currentSection = '';
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // Mobile menu toggle (if needed for smaller screens)
    function createMobileMenu() {
        const header = document.querySelector('.header .container');
        const nav = document.querySelector('.nav');
        
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-toggle')) {
                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'mobile-menu-toggle';
                toggleBtn.innerHTML = '☰';
                toggleBtn.style.cssText = `
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: none;
                `;
                
                header.appendChild(toggleBtn);
                
                toggleBtn.addEventListener('click', function() {
                    nav.classList.toggle('mobile-nav-open');
                });
            }
        }
    }
    
    window.addEventListener('resize', createMobileMenu);
    createMobileMenu();
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-item, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Reading time calculator for the article
    function calculateReadingTime() {
        const article = document.querySelector('.article-content');
        if (article) {
            const text = article.textContent || article.innerText;
            const wordsPerMinute = 200;
            const wordCount = text.trim().split(/\s+/).length;
            const readingTime = Math.ceil(wordCount / wordsPerMinute);
            
            const readingTimeElement = document.querySelector('.reading-time');
            if (readingTimeElement) {
                readingTimeElement.textContent = `${readingTime} min read`;
            }
        }
    }
    
    calculateReadingTime();
    
    // Add CSS for active navigation state
    const style = document.createElement('style');
    style.textContent = `
        .nav a.active {
            color: #f39c12 !important;
            background-color: rgba(243, 156, 18, 0.2) !important;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: block !important;
            }
            
            .nav {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: #2c3e50;
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s ease;
                pointer-events: none;
            }
            
            .nav.mobile-nav-open {
                transform: translateY(0);
                opacity: 1;
                pointer-events: all;
            }
            
            .nav ul {
                flex-direction: column;
                padding: 1rem;
                gap: 0;
            }
            
            .nav li {
                width: 100%;
            }
            
            .nav a {
                display: block;
                padding: 1rem;
                border-bottom: 1px solid #34495e;
            }
        }
    `;
    document.head.appendChild(style);
});

// Utility function to debounce scroll events
function debounce(func, wait) {
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

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(function() {
    // Any additional scroll-based functionality can be added here
}, 10));

