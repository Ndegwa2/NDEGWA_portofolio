// ===================================
// Smooth Scrolling Navigation
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 84; // Height of sticky header
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state
                updateActiveNavLink(this);
            }
        });
    });
    
    // Update active nav link on scroll
    function updateActiveNavLink(clickedLink) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        if (clickedLink) {
            clickedLink.classList.add('active');
        }
    }
    
    // Highlight active section on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // ===================================
    // Hero Button Smooth Scroll
    // ===================================
    const heroButtons = document.querySelectorAll('.hero-buttons a');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const headerOffset = 84;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===================================
    // Intersection Observer for Animations
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.hero-content, .about-content, .skills-grid, .project-card, .contact-content');
    animatedElements.forEach(el => observer.observe(el));
    
    // ===================================
    // Mobile Menu Toggle (for future enhancement)
    // ===================================
    const createMobileMenu = () => {
        const header = document.querySelector('.header');
        const nav = document.querySelector('.nav');
        
        if (window.innerWidth <= 768) {
            // Add mobile menu button if not exists
            if (!document.querySelector('.mobile-menu-toggle')) {
                const menuToggle = document.createElement('button');
                menuToggle.className = 'mobile-menu-toggle';
                menuToggle.innerHTML = '☰';
                menuToggle.setAttribute('aria-label', 'Toggle menu');
                
                header.querySelector('.container').appendChild(menuToggle);
                
                menuToggle.addEventListener('click', () => {
                    nav.classList.toggle('mobile-active');
                    menuToggle.classList.toggle('active');
                    menuToggle.innerHTML = menuToggle.classList.contains('active') ? '✕' : '☰';
                });
            }
        }
    };
    
    // ===================================
    // Skill Chips Interaction
    // ===================================
    const skillChips = document.querySelectorAll('.skill-chip');
    
    skillChips.forEach(chip => {
        chip.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // ===================================
    // Project Cards Tilt Effect
    // ===================================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // ===================================
    // Header Shadow on Scroll
    // ===================================
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 12px rgba(11, 61, 145, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(11, 61, 145, 0.05)';
        }
    });
    
    // ===================================
    // Avatar Click Animation
    // ===================================
    const avatar = document.querySelector('.avatar');
    
    avatar.addEventListener('click', function() {
        this.style.animation = 'spin 0.5s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
    
    // ===================================
    // Typing Effect for Hero Title (Optional)
    // ===================================
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Uncomment to enable typing effect
    // const heroTitle = document.querySelector('.hero-title');
    // const originalText = heroTitle.textContent;
    // typeWriter(heroTitle, originalText, 30);
    
    // ===================================
    // Form Validation (if contact form is added)
    // ===================================
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const formData = new FormData(this);
            let isValid = true;
            
            formData.forEach((value, key) => {
                if (!value.trim()) {
                    isValid = false;
                    const input = this.querySelector(`[name="${key}"]`);
                    input.style.borderColor = 'red';
                }
            });
            
            if (isValid) {
                // Handle form submission
                console.log('Form submitted successfully');
                this.reset();
            }
        });
    }
    
    // ===================================
    // Lazy Loading Images (if images are added)
    // ===================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ===================================
    // Performance Monitoring
    // ===================================
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        }
    });
    
    // ===================================
    // Dark Mode Toggle (Optional Feature)
    // ===================================
    const initDarkMode = () => {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.innerHTML = '🌙';
        darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
        darkModeToggle.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-blue);
            color: white;
            border: none;
            cursor: pointer;
            font-size: 20px;
            box-shadow: 0 4px 12px rgba(11, 61, 145, 0.3);
            z-index: 1000;
            transition: transform 0.3s ease;
        `;
        
        // Uncomment to enable dark mode toggle
        // document.body.appendChild(darkModeToggle);
        
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        });
        
        darkModeToggle.addEventListener('mouseenter', () => {
            darkModeToggle.style.transform = 'scale(1.1)';
        });
        
        darkModeToggle.addEventListener('mouseleave', () => {
            darkModeToggle.style.transform = 'scale(1)';
        });
    };
    
    // Uncomment to enable dark mode
    // initDarkMode();
    
    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c👋 Welcome to Samuel Ndegwa\'s Portfolio!', 'color: #0b3d91; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript', 'color: #374a70; font-size: 14px;');
});

// ===================================
// CSS Animation Keyframes (added via JS)
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .nav-link.active {
        color: var(--primary-blue);
        font-weight: 600;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
`;
document.head.appendChild(style);