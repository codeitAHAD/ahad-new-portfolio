const header = document.querySelector('.site-header');
const scrollTopBtn = document.getElementById('scroll-top');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
const cursorGlow = document.querySelector('.cursor-glow');
const typing = document.getElementById('typing');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

window.addEventListener('pointermove', (e) => {
    if (window.innerWidth > 900) {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    }
});

const words = ['Software Developer', 'Programmer', 'Problem Solver'];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const word = words[wordIndex];
    typing.textContent = deleting ? word.slice(0, charIndex--) : word.slice(0, charIndex++);

    let delay = deleting ? 55 : 90;

    if (!deleting && charIndex > word.length) {
        deleting = true;
        delay = 1500;
    } else if (deleting && charIndex < 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        charIndex = 0;
        delay = 350;
    }

    setTimeout(typeEffect, delay);
}
typeEffect();

function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 20);
    scrollTopBtn.classList.toggle('show', window.scrollY > 450);
}
window.addEventListener('scroll', updateHeader, {passive:true});
updateHeader();

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
});

menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

navItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {threshold:0.12});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navItems.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === `#${entry.target.id}`
                );
            });
        }
    });
}, {threshold:0.35});

sections.forEach(section => sectionObserver.observe(section));
