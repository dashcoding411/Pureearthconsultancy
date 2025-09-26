// Navbar toggle for mobile
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar shrink
    const navbar = document.querySelector('.navbar');
    if(scrollY > 50) {
        navbar.style.transform = 'scaleY(0.95)';
        navbar.style.background = 'rgba(255,255,255,0.95)';
    } else {
        navbar.style.transform = 'scaleY(1)';
        navbar.style.background = 'rgba(255,255,255,0.85)';
    }

    // Parallax backgrounds
    document.querySelectorAll('.parallax-section').forEach(section => {
        const speed = section.dataset.speed;
        section.style.backgroundPositionY = `${-(scrollY * speed)}px`;
    });

    // Animate cards
    document.querySelectorAll('.scroll-animate').forEach(el => {
        const top = el.getBoundingClientRect().top;
        if(top < window.innerHeight * 0.85) {
            el.classList.add('active');
        }
    });

    // Optional: tilt effect for cards
    document.querySelectorAll('.service-card, .project-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (window.innerWidth/2 - centerX) / 50;
        const deltaY = (window.innerHeight/2 - centerY) / 50;
        card.style.transform = `rotateX(${deltaY}deg) rotateY(${deltaX}deg) scale(1)`;
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    const animatedElements = document.querySelectorAll('.scroll-animate');
    const heroContent = document.querySelector('.hero-content');

    // Parallax and shrink on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Parallax backgrounds
        parallaxSections.forEach(section => {
            const speed = parseFloat(section.dataset.speed);
            section.style.backgroundPositionY = `${-(scrollY * speed)}px`;
        });

        // Shrink hero content slightly
        if(heroContent){
            const scale = Math.max(0.9, 1 - scrollY / 2000);
            heroContent.style.transform = `scale(${scale})`;
        }

        // Scroll-triggered animations
        animatedElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight * 0.85) {
                el.classList.add('active');
            }
        });
    });
});
