//===============================
//YONGO 1 -Main Script (ES6+)
//===============================
//Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    console.log('YONGO 1 ready!');
    //============================
    //1. VARIABLES & ELEMENTS
    //============================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('header');
    const backToTopBtn = document.querySelector('.back-to-top');

    //============================
    //2. MOBILE MENU TOGGLE
    //============================
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('open');
        });
    }

    //Close nav when a link is clicked (on mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('open');
        });
    });

    //============================
    //3. SMOOTH SCROLL  NAVIGATION
    //============================
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                window.scrollTo({
                    top: targetEl.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });

    //============================
    //4. ACTIVE SECTION HIGHLIGHT
    //============================
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        //============================
        //5. HEADER SHADOW ON SCROLL
        if (header) {
            if (window.scrollY > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Back to top button visibility
        if (backToTopBtn) {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    //============================
    //6.TYPEWRITER TEXT EFFECT
    //============================
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        let index = 0;
        const type = () => {
            if (index < text.length) {
                heroText.textContent += text.charAt(index);
                index++;
                setTimeout(type, 80);
            }
        };
        type();
    }

    //============================
    //7. BACK TO TOP BUTTON
    //============================
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    //============================
    // END
    //============================
});