// == YONGO 1 - Main Script (ES6+) ==
// waiting for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('YONGO 1 - Main Script Loaded');

    // 1. VARIABLES & ELEMENTS
    const navtoggle = document.querySelector('.nav-toggle');
    const navlinks = document.querySelectorAll('.nav__link');
    const navMenu = document.querySelector('.nav-menu') || document.querySelector('.nav'); // fallback selector
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const header = document.querySelector('header') || document.querySelector('.header');
    const herotext = document.querySelector('.hero__text');
    const backToTopBtn = document.getElementById('back-to-top');

    // 2. MOBILE MENU TOGGLE
    if (navtoggle && navMenu) {
        navtoggle.addEventListener('click', () => {
            navMenu.classList.toggle('nav-open');
            navtoggle.classList.toggle('nav-toggle-open');
        });
    }

    // Close mobile menu on link click
    navlinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('nav-open');
            if (navtoggle) navtoggle.classList.remove('nav-toggle-open');
        });
    });

    // 3. SMOOTH SCROLL NAVIGATION
    navlinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. ACTIVE SECTION HIGHLIGHT and header/back-to-top handling inside scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });
        navlinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.substring(1) === current) {
                link.classList.add('active');
            }
        });

        // 5. HEADER BACKGROUND CHANGE ON SCROLL
        if (header) {
            if (window.scrollY > 60) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }

        // 7. BACK TO TOP BUTTON visibility
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    // Back to top click
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 6. TYPEWRITER TEXT EFFECT
    if (herotext) {
        const text = herotext.textContent.trim();
        herotext.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                herotext.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 100);
    }

    // 8. DARK/LIGHT THEME TOGGLE
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
        });
    }

    // Initial theme setup based on user preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-theme');
    }
});
// == END OF YONGO 1 - Main Script ==