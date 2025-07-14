// Boot Sequence Animation
function skipBootSequence() {
    document.body.classList.add('loaded');
    const bootSequence = document.getElementById('boot-sequence');
    if (bootSequence) {
        bootSequence.style.display = 'none';
    }
}

// Handle browser back button and page load
window.onload = function() {
    // Set flag to skip boot sequence when navigating back
    sessionStorage.setItem('skipBoot', 'true');
};

// Handle browser back/forward buttons
window.onpopstate = function() {
    // Skip boot sequence when using browser navigation
    sessionStorage.setItem('skipBoot', 'true');
};

function initializeMainContent() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.classList.add('visible');
        navbar.style.display = 'flex';
    }

    // Initialize sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
        section.style.opacity = '1';
        section.style.transform = 'none';
        section.style.visibility = 'visible';
    });

    // Initialize all content immediately
    document.querySelectorAll('.fade-in, .section, .section-title, .skill-category, .certificate-card, .project-card').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'none';
        element.style.transition = 'none';
        element.classList.add('visible');
    });

    // Initialize other components
    initializeActiveSection();
    initParticles();
    initMatrixRain();
}

document.addEventListener('DOMContentLoaded', () => {
    // First, make sure body is visible and scrollable
    document.body.style.overflow = 'auto';
    document.body.style.visibility = 'visible';

    // Check if we should skip the boot sequence
    if (sessionStorage.getItem('skipBoot') === 'true') {
        // Skip boot sequence
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        const bootSequence = document.getElementById('boot-sequence');
        if (bootSequence) {
            bootSequence.style.display = 'none';
        }

        // Show navbar immediately
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.display = 'flex';
            navbar.style.visibility = 'visible';
            navbar.style.opacity = '1';
            navbar.classList.add('visible');
        }

        // Show all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '1';
            section.style.visibility = 'visible';
            section.style.transform = 'none';
        });

        // Show all content
        document.querySelectorAll('.fade-in, .section, .section-title, .skill-category, .certificate-card, .project-card').forEach(element => {
            element.style.opacity = '1';
            element.style.visibility = 'visible';
            element.style.transform = 'none';
            element.classList.add('visible');
        });

        // Initialize components
        initParticles();
        initMatrixRain();
        initializeActiveSection();

        sessionStorage.removeItem('skipBoot');
        return;
    }

    document.body.classList.add('loading');
    const bootSequence = document.getElementById('boot-sequence');
    const bootLog = document.querySelector('.boot-log');
    const bootLogContainer = document.querySelector('.boot-log-container');
    const logEntries = document.querySelectorAll('.log-entry');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.boot-progress-text');
    const statusText = document.querySelector('.system-info span:last-child');
    const navbar = document.querySelector('.navbar');
    let currentEntry = 0;
    let progress = 0;

    // Function to update progress bar and text
    const updateProgress = (value) => {
        progress = value;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `[${Math.round(progress)}%] System initialization in progress...`;

        // Update status text based on progress
        if (progress < 25) {
            statusText.textContent = 'STATUS: Initializing core systems...';
        } else if (progress < 50) {
            statusText.textContent = 'STATUS: Loading security modules...';
        } else if (progress < 75) {
            statusText.textContent = 'STATUS: Configuring defenses...';
        } else if (progress < 90) {
            statusText.textContent = 'STATUS: Finalizing setup...';
        } else {
            statusText.textContent = 'STATUS: System Ready';
        }
    };

    // Function to show log entries one by one with progress
    const showNextLog = () => {
        if (currentEntry < logEntries.length) {
            // Calculate progress based on current entry
            const progressIncrement = 100 / logEntries.length;
            const targetProgress = (currentEntry + 1) * progressIncrement;
            
            // Show current log entry
            const entry = logEntries[currentEntry];
            entry.classList.add('visible');
            
            // Calculate scroll position
            const totalHeight = entry.offsetTop + entry.offsetHeight;
            const containerHeight = bootLogContainer.offsetHeight;
            
            // Only scroll if we're past the visible area
            if (totalHeight > containerHeight) {
                const scrollAmount = totalHeight - containerHeight;
                bootLog.style.transform = `translateY(-${scrollAmount}px)`;
            }
            
            // Smoothly update progress
            const startProgress = progress;
            const duration = 500;
            const startTime = performance.now();
            
            const animateProgress = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progressPercentage = Math.min(elapsed / duration, 1);
                const currentProgress = startProgress + (targetProgress - startProgress) * progressPercentage;
                
                updateProgress(currentProgress);
                
                if (progressPercentage < 1) {
                    requestAnimationFrame(animateProgress);
                }
            };
            
            requestAnimationFrame(animateProgress);
            
            // Move to next entry
            currentEntry++;
            
            // Random delay between 100ms and 400ms for more terminal-like feel
            const delay = Math.random() * 300 + 100;
            setTimeout(showNextLog, delay);
        } else {
            // After all logs are shown, wait 1 second and hide boot sequence
            setTimeout(() => {
                bootSequence.classList.add('hidden');
                document.body.classList.remove('loading');
                // Show navbar after boot sequence
                navbar.classList.add('visible');
                initializeMainContent();
            }, 1000);
        }
    };

    // Start the boot sequence after a short delay
    setTimeout(showNextLog, 1000);
});

// Initialize main content with animations
function initializeMainContent() {
    const navbar = document.querySelector('.navbar');

    // Show navbar with animation
    setTimeout(() => {
        navbar.classList.add('visible');
    }, 300);

    // Initialize sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
        section.style.opacity = '1';
        section.style.transform = 'none';
    });

    // Initialize cards with proper visibility
    const cards = document.querySelectorAll('.skill-category, .certificate-card, .project-card');
    cards.forEach((card) => {
        if (isMobile) {
            card.style.opacity = '1';
            card.style.transform = 'none';
            card.classList.add('visible');
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'none';
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            observer.observe(card);
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            cards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'none';
                card.classList.add('visible');
            });
        }
    });
}

// Call initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMainContent);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Initialize skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.dataset.level;
                entry.target.querySelector('.skill-level').style.width = `${level}%`;
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// Active section highlighting
function initializeActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    function setActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for better trigger point
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', setActiveSection);
    
    // Call once on page load
    setActiveSection();
}

// Fade-in animation for sections
function initializeFadeIn() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        fadeObserver.observe(element);
    });
}

// Navbar scroll effect
function initializeNavbarEffect() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
}

// Add glitch effect to the name
document.addEventListener('DOMContentLoaded', () => {
    const glitchText = document.querySelector('.glitch-text');
    if (!glitchText) return;

    const addGlitch = () => {
        glitchText.classList.add('glitch');
        setTimeout(() => {
            glitchText.classList.remove('glitch');
        }, 200);
    };

    // Random glitch effect
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance of glitch
            addGlitch();
        }
    }, 2000);
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
});

// Simplified particle system
function initParticles() {
    const container = document.querySelector('.particles-background');
    if (!container) return;

    // Clear any existing particles
    container.innerHTML = '';
    
    // Reduced particle count for better performance
    const particleCount = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Smaller size for better performance
        const size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Fixed position relative to viewport
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Slower animation for better performance
        const duration = Math.random() * 5 + 10;
        particle.style.animation = `float ${duration}s linear infinite`;
        
        container.appendChild(particle);
    }
}

// Initialize particles only once when the page loads
window.addEventListener('load', initParticles);

// Reinitialize particles only on orientation change for mobile
window.addEventListener('orientationchange', initParticles);

// Remove all other particle-related event listeners
document.removeEventListener('scroll', initParticles);
document.removeEventListener('visibilitychange', initParticles);
window.removeEventListener('resize', initParticles);

// Matrix Rain Effect
function initMatrixRain() {
    const canvas = document.querySelector('.matrix-rain');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const characters = '01';
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00e5ff';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
}

// Scroll Animations
function initScrollAnimations() {
    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Disable animations on mobile
        document.querySelectorAll('.fade-in, .section, .section-title, .skill-category, .certificate-card, .project-card').forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
            element.style.transition = 'none';
            element.classList.add('visible');
        });
        return;
    }

    // Desktop animations
    document.querySelectorAll('.section-title').forEach(title => {
        title.style.opacity = '1';
        title.style.transform = 'none';
        title.style.visibility = 'visible';
    });

    const sections = document.querySelectorAll('.skill-category, .certificate-card, .project-card');
    const options = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    sections.forEach(section => {
        section.classList.remove('visible');
        observer.observe(section);
    });

    // Ensure profile and about sections are always visible
    document.querySelectorAll('.profile-section, .about-section, .section-title').forEach(section => {
        section.classList.add('visible');
    });
}

// Initialize everything after boot sequence
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles immediately
    initParticles();
    
    // Initialize active section highlighting
    initializeActiveSection();
    
    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Disable all animations on mobile except particles
        document.querySelectorAll('.fade-in, .section, .section-title, .skill-category, .certificate-card, .project-card').forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
            element.style.transition = 'none';
            element.classList.add('visible');
        });
    } else {
        // Initialize other animations for desktop
        initMatrixRain();
        initScrollAnimations();
    }
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            initParticles(); // Always reinitialize particles on resize
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                // Disable animations on mobile except particles
                document.querySelectorAll('.fade-in, .section, .section-title, .skill-category, .certificate-card, .project-card').forEach(element => {
                    element.style.opacity = '1';
                    element.style.transform = 'none';
                    element.style.transition = 'none';
                    element.classList.add('visible');
                });
            } else {
                initScrollAnimations();
            }
        }, 250);
    });
});

// Add keyframe animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
        }
        50% {
            transform: translateY(-100px) translateX(50px);
        }
        100% {
            transform: translateY(0) translateX(0);
        }
    }
`;
document.head.appendChild(style);

const projectDetails = {
    // ... existing projects ...
    'splunk': {
        title: 'Splunk-based Threat Detection and Log Monitoring',
        description: `
            <h3>Project Overview</h3>
            <p>Implemented a centralized threat detection and monitoring solution using Splunk. The system was designed to ingest, parse, and visualize various log sources including SSH, FTP, and web login attempts, simulating real-world attacker behavior using tools like Hydra and Gobuster from a Kali Linux machine.</p>

            <h3>Key Features</h3>
            <ul>
                <li>Deployed and configured Splunk on Ubuntu VM</li>
                <li>Ingested logs from multiple sources: SSH, FTP, and web login/enumeration logs</li>
                <li>Simulated real-world attacker behaviors using Kali Linux</li>
                <li>Parsed and extracted fields using props.conf and transforms.conf</li>
                <li>Created real-time alerts and dashboards to monitor attacker activity</li>
            </ul>

            <h3>Technical Implementation</h3>
            <ul>
                <li>Configured Splunk to ingest logs from multiple sources including auth.log, vsftpd.log, and custom JSON logs</li>
                <li>Implemented custom field extraction using regex patterns for SSH logs</li>
                <li>Created real-time alerts for detecting brute-force attacks and suspicious login patterns</li>
                <li>Built interactive dashboards for visualizing attack patterns and monitoring system security</li>
            </ul>

            <h3>Tools & Technologies</h3>
            <ul>
                <li>Splunk Enterprise</li>
                <li>Ubuntu Linux</li>
                <li>Kali Linux</li>
                <li>Hydra (for brute-force simulation)</li>
                <li>Gobuster (for web enumeration)</li>
                <li>Custom Flask Web Application</li>
            </ul>

            <h3>Results</h3>
            <ul>
                <li>Successfully detected and logged all simulated attacks in real-time</li>
                <li>Created comprehensive dashboards for security monitoring</li>
                <li>Implemented effective alerting system for suspicious activities</li>
                <li>Demonstrated Splunk's capabilities as a SIEM solution</li>
            </ul>
        `,
        image: 'assets/splunk-project.jpg'
    }
}; 