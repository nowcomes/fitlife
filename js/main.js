/* ============================================
   FitLife - Health & Fitness Website
   Main JavaScript File
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // Preloader
    // ============================================
    const preloader = document.querySelector('.preloader');

    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    });

    // ============================================
    // Navigation Functionality
    // ============================================
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Navigation on Scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ============================================
    // Theme Toggle (Dark/Light Mode)
    // ============================================
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', function() {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // ============================================
    // Scroll Animations (Custom AOS Implementation)
    // ============================================
    const animatedElements = document.querySelectorAll('[data-aos]');

    function checkAOS() {
        const triggerBottom = window.innerHeight * 0.85;

        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('aos-animate');
            }
        });
    }

    // Initial check
    checkAOS();

    // Check on scroll with throttle
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                checkAOS();
                scrollTimeout = null;
            }, 50);
        }
    });

    // ============================================
    // Counter Animation
    // ============================================
    const counters = document.querySelectorAll('[data-count]');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                countersAnimated = true;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
            }
        });
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Initial check

    // ============================================
    // Testimonials Slider
    // ============================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    let currentTestimonial = 0;
    let autoSlideInterval;

    function showTestimonial(index) {
        if (testimonialCards.length === 0) return;

        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentTestimonial = index;
        if (currentTestimonial >= testimonialCards.length) currentTestimonial = 0;
        if (currentTestimonial < 0) currentTestimonial = testimonialCards.length - 1;

        testimonialCards[currentTestimonial].classList.add('active');
        dots[currentTestimonial].classList.add('active');
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonial - 1);
            resetAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonial + 1);
            resetAutoSlide();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
            resetAutoSlide();
        });
    });

    // Start auto-slide
    if (testimonialCards.length > 0) {
        startAutoSlide();
    }

    // ============================================
    // Back to Top Button
    // ============================================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // Newsletter Form Submission
    // ============================================
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            // Simulate form submission
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Subscribing...';
            button.disabled = true;

            setTimeout(() => {
                alert('Thank you for subscribing! You will receive our newsletter at: ' + email);
                this.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, 1500);
        });
    }

    // ============================================
    // Contact Form Submission
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;

            button.textContent = 'Sending...';
            button.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        });
    }

    // ============================================
    // Workout Filter Functionality
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workoutCards = document.querySelectorAll('.workout-card-full');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            workoutCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ============================================
    // Image Lazy Loading
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');

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

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // ============================================
    // Parallax Effect for Hero Section
    // ============================================
    const heroShapes = document.querySelectorAll('.hero-shape');

    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;

        heroShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ============================================
    // Floating Cards Animation Enhancement
    // ============================================
    const floatingCards = document.querySelectorAll('.floating-card');

    window.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        floatingCards.forEach((card, index) => {
            const offsetX = (mouseX - 0.5) * 20 * (index + 1);
            const offsetY = (mouseY - 0.5) * 20 * (index + 1);
            card.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });

    // ============================================
    // Form Input Animation
    // ============================================
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // ============================================
    // Typing Effect for Hero Section
    // ============================================
    function typeWriter(element, text, speed = 100) {
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

    // ============================================
    // Workout Card Hover Effect
    // ============================================
    const workoutCardsHover = document.querySelectorAll('.workout-card, .workout-card-full');

    workoutCardsHover.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ============================================
    // Blog Card Hover Effect
    // ============================================
    const blogCards = document.querySelectorAll('.blog-card');

    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });

    // ============================================
    // BMI Calculator (if present on page)
    // ============================================
    const bmiForm = document.getElementById('bmiForm');

    if (bmiForm) {
        bmiForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const height = parseFloat(document.getElementById('height').value) / 100; // cm to m
            const weight = parseFloat(document.getElementById('weight').value);

            if (height && weight) {
                const bmi = (weight / (height * height)).toFixed(1);
                let category = '';
                let color = '';

                if (bmi < 18.5) {
                    category = 'Underweight';
                    color = '#3498db';
                } else if (bmi < 25) {
                    category = 'Normal weight';
                    color = '#2ecc71';
                } else if (bmi < 30) {
                    category = 'Overweight';
                    color = '#f1c40f';
                } else {
                    category = 'Obese';
                    color = '#e74c3c';
                }

                const resultDiv = document.getElementById('bmiResult');
                if (resultDiv) {
                    resultDiv.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <h3 style="color: ${color}; font-size: 3rem; margin-bottom: 10px;">${bmi}</h3>
                            <p style="font-size: 1.2rem; font-weight: 600;">${category}</p>
                        </div>
                    `;
                }
            }
        });
    }

    // ============================================
    // Active Navigation Link Highlighting
    // ============================================
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }

    setActiveNavLink();

    // ============================================
    // Scroll Progress Bar (optional enhancement)
    // ============================================
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #FF6B35 0%, #7C3AED 100%);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // ============================================
    // Feature Card Icon Rotation on Hover
    // ============================================
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(10deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // ============================================
    // Toast Notification System
    // ============================================
    window.showToast = function(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10002;
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // Add toast animations to head
    const toastStyles = document.createElement('style');
    toastStyles.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(toastStyles);

    // ============================================
    // Cookie Consent Banner
    // ============================================
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    const cookieSettings = document.getElementById('cookieSettings');

    // Check if user has already accepted cookies
    if (cookieConsent) {
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');

        if (!cookiesAccepted) {
            // Show cookie banner after a short delay
            setTimeout(() => {
                cookieConsent.classList.add('show');
            }, 1500);
        }

        // Accept all cookies
        if (acceptCookies) {
            acceptCookies.addEventListener('click', function() {
                localStorage.setItem('cookiesAccepted', 'true');
                localStorage.setItem('cookiePreferences', JSON.stringify({
                    essential: true,
                    analytics: true,
                    marketing: true,
                    preferences: true
                }));
                cookieConsent.classList.remove('show');
                showToast('Cookie preferences saved!', 'success');
            });
        }

        // Cookie settings (simplified - just accept essential only)
        if (cookieSettings) {
            cookieSettings.addEventListener('click', function() {
                localStorage.setItem('cookiesAccepted', 'true');
                localStorage.setItem('cookiePreferences', JSON.stringify({
                    essential: true,
                    analytics: false,
                    marketing: false,
                    preferences: false
                }));
                cookieConsent.classList.remove('show');
                showToast('Only essential cookies enabled', 'info');
            });
        }
    }

    // ============================================
    // Console Welcome Message
    // ============================================
    console.log('%c FitLife - Health & Fitness Website ', 'background: linear-gradient(135deg, #FF6B35, #7C3AED); color: white; font-size: 16px; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Built with HTML, CSS & JavaScript ', 'color: #666; font-size: 12px;');

});
