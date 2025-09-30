document.addEventListener('DOMContentLoaded', function() {
    // Apple-style smooth page loading
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Apple-style Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link, .nav-item a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                const offsetTop = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
                if (navToggle) {
                    navToggle.classList.remove('active');
                }

                // Update active link with Apple-style animation
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                    navLink.style.transform = 'scale(1)';
                });
                this.classList.add('active');
                this.style.transform = 'scale(1.05)';

                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });

    // Profile Image Handler
    const profileImg = document.getElementById('profile-img');
    const profilePlaceholder = document.querySelector('.profile-placeholder');

    if (profileImg && profilePlaceholder) {
        // Check if profile image exists and show/hide accordingly
        profileImg.addEventListener('load', function() {
            this.style.display = 'block';
            profilePlaceholder.style.display = 'none';
        });

        profileImg.addEventListener('error', function() {
            this.style.display = 'none';
            profilePlaceholder.style.display = 'flex';
        });
    }

    // Scroll-based Navigation Highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Animated Counter for Stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // The lower the slower

        counters.forEach(counter => {
            const updateCount = () => {
                const target = counter.innerText;
                const count = +counter.getAttribute('data-count') || 0;

                // Extract number from target (removing + and other characters)
                const targetNum = parseInt(target.replace(/[^\d]/g, ''));
                const inc = targetNum / speed;

                if (count < targetNum) {
                    counter.setAttribute('data-count', Math.ceil(count + inc));

                    // Format the number with original suffix
                    if (target.includes('M+')) {
                        counter.innerText = Math.ceil(count + inc) + 'M+';
                    } else if (target.includes('+')) {
                        counter.innerText = Math.ceil(count + inc) + '+';
                    } else {
                        counter.innerText = Math.ceil(count + inc);
                    }

                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Intersection Observer for Stats Animation
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // Apple-style Tab Functionality for About Section
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Apple-style smooth transition
            tabContents.forEach(content => {
                content.style.opacity = '0';
                content.style.transform = 'translateY(20px)';
            });

            setTimeout(() => {
                // Remove active class from all tabs and buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                    targetContent.style.opacity = '1';
                    targetContent.style.transform = 'translateY(0)';

                    // Animate skill bars if skills tab is activated
                    if (targetTab === 'skills') {
                        setTimeout(() => {
                            animateSkillBars();
                        }, 300);
                    }
                }
            }, 150);
        });
    });

    // Apple-style Content Tab Functionality for Insights Section
    const contentTabButtons = document.querySelectorAll('.content-tab-btn');
    const contentTabContents = document.querySelectorAll('.content-tab-content');

    contentTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetContentTab = this.getAttribute('data-content-tab');

            // Apple-style smooth transition
            contentTabContents.forEach(content => {
                content.style.opacity = '0';
                content.style.transform = 'translateY(20px)';
            });

            setTimeout(() => {
                // Remove active class from all content tabs and buttons
                contentTabButtons.forEach(btn => btn.classList.remove('active'));
                contentTabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                const targetContentTabContent = document.getElementById(targetContentTab);
                if (targetContentTabContent) {
                    targetContentTabContent.classList.add('active');
                    targetContentTabContent.style.opacity = '1';
                    targetContentTabContent.style.transform = 'translateY(0)';
                }
            }, 150);
        });
    });

    // Skill Bar Animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');

        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) {
                bar.style.setProperty('--target-width', width + '%');
                bar.style.width = width + '%';
            }
        });
    }

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter project cards
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });

    // Apple-style Scroll Animations with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }
        });
    }, observerOptions);

    // Initialize and observe Apple-style cards
    const animateElements = document.querySelectorAll('.card, .project-card, .work-card, .insight-card');
    animateElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(60px)';
        scrollObserver.observe(el);
    });

    // Apple-style scroll effects with performance optimization
    let ticking = false;

    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-content');
        const brainIcon = document.querySelector('.brain-icon');

        // Subtle parallax for hero content
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.05}px)`;
        }

        // Floating animation for brain icon
        if (brainIcon) {
            const rotation = scrolled * 0.1;
            brainIcon.style.transform = `translateY(${Math.sin(scrolled * 0.01) * 10}px) rotate(${rotation}deg)`;
        }

        // Navbar backdrop blur effect
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (scrolled > 50) {
                navbar.style.background = 'rgba(251, 251, 253, 0.8)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(251, 251, 253, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.borderBottom = '1px solid transparent';
            }
        }

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    // Apple-style text reveal animation
    function animateTextReveal() {
        const titleElement = document.querySelector('.hero-title');
        const subtitleElement = document.querySelector('.hero-subtitle');

        if (titleElement) {
            titleElement.style.opacity = '0';
            titleElement.style.transform = 'translateY(30px)';
            titleElement.style.transition = 'opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

            setTimeout(() => {
                titleElement.style.opacity = '1';
                titleElement.style.transform = 'translateY(0)';
            }, 300);
        }

        if (subtitleElement) {
            subtitleElement.style.opacity = '0';
            subtitleElement.style.transform = 'translateY(30px)';
            subtitleElement.style.transition = 'opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

            setTimeout(() => {
                subtitleElement.style.opacity = '1';
                subtitleElement.style.transform = 'translateY(0)';
            }, 600);
        }
    }

    // Initialize text reveal animation
    setTimeout(animateTextReveal, 500);

    // Apple-style button interactions
    const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .tab-btn, .content-tab-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });

        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.05)';
        });
    });

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // View Details Button Functionality
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;

            // For now, just show an alert. In a real implementation,
            // this would open a modal or navigate to a detailed page
            alert(`View case study for: ${projectTitle}\n\nThis would typically open a detailed project page or modal.`);
        });
    });

    // Apple-style section reveal animations
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    // Apply initial styles and observe sections
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(80px)';
        sectionObserver.observe(section);
    });

    // Apple-style dynamic gradient background
    function createAppleGradients() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        const gradientOverlay = document.createElement('div');
        gradientOverlay.style.position = 'absolute';
        gradientOverlay.style.top = '0';
        gradientOverlay.style.left = '0';
        gradientOverlay.style.width = '100%';
        gradientOverlay.style.height = '100%';
        gradientOverlay.style.background = 'linear-gradient(135deg, rgba(0, 122, 255, 0.05) 0%, rgba(88, 86, 214, 0.05) 50%, rgba(255, 45, 85, 0.05) 100%)';
        gradientOverlay.style.zIndex = '1';
        gradientOverlay.style.pointerEvents = 'none';
        heroSection.style.position = 'relative';
        heroSection.appendChild(gradientOverlay);

        // Animated gradient shift
        let gradientStep = 0;
        setInterval(() => {
            gradientStep += 1;
            const hue1 = (gradientStep % 360);
            const hue2 = ((gradientStep + 120) % 360);
            const hue3 = ((gradientStep + 240) % 360);
            gradientOverlay.style.background = `linear-gradient(135deg, hsla(${hue1}, 70%, 60%, 0.03) 0%, hsla(${hue2}, 70%, 60%, 0.03) 50%, hsla(${hue3}, 70%, 60%, 0.03) 100%)`;
        }, 100);
    }

    createAppleGradients();

    // Initialize skill bars animation when About section becomes visible
    const aboutSection = document.querySelector('#about-me');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Check if skills tab is active
                    const skillsTab = document.getElementById('skills');
                    if (skillsTab && skillsTab.classList.contains('active')) {
                        setTimeout(() => {
                            animateSkillBars();
                        }, 500);
                    }
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        aboutObserver.observe(aboutSection);
    }

    // Add click-to-copy functionality for contact details
    const contactDetails = document.querySelectorAll('.contact-details p');
    contactDetails.forEach(detail => {
        detail.style.cursor = 'pointer';
        detail.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                // Show temporary feedback
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.color = 'var(--accent-primary)';

                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 1500);
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);

                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.color = 'var(--accent-primary)';

                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 1500);
            });
        });
    });

    // Add tooltip for copy functionality
    contactDetails.forEach(detail => {
        detail.title = 'Click to copy';
    });

    // Download Button Functionality for Whitepapers
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const whitepaper = this.closest('.whitepaper-card');
            const title = whitepaper.querySelector('h3').textContent;

            // Simulate download
            alert(`Downloading: ${title}\n\nThis would typically trigger a PDF download.`);
        });
    });

    // App Button Functionality
    const appButtons = document.querySelectorAll('.app-btn');
    appButtons.forEach(button => {
        button.addEventListener('click', function() {
            const app = this.closest('.app-card');
            const title = app.querySelector('h3').textContent;
            const action = this.textContent.trim();

            // Simulate different actions
            if (action.includes('Try') || action.includes('Join')) {
                alert(`Launching: ${title}\n\nThis would typically open the application or beta signup.`);
            } else if (action.includes('View Code') || action.includes('Learn More')) {
                alert(`Opening details for: ${title}\n\nThis would typically open GitHub repository or detailed information.`);
            }
        });
    });

    // Blog Link Functionality
    const blogLinks = document.querySelectorAll('.blog-link');
    blogLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const blogCard = this.closest('.blog-card');
            const title = blogCard.querySelector('h3').textContent;

            alert(`Opening blog post: ${title}\n\nThis would typically navigate to the full blog article.`);
        });
    });

    // Apple-style card hover effects
    const cards = document.querySelectorAll('.card, .project-card, .work-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        });
    });

    // Apple-style smooth transitions for tab content
    const tabContentElements = document.querySelectorAll('.tab-content, .content-tab-content');
    tabContentElements.forEach(content => {
        content.style.transition = 'opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    // Initialize Apple-style loading state
    document.body.classList.add('loaded');

    console.log('🍎 Apple-style Portfolio initialized successfully!');
});