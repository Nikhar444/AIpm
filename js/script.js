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
     