const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', ()=>{
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show')
    }
});

scrollTopBtn.addEventListener('click', () =>{
    window.scrollTo({ top: 0, behavior: 'smooth'});

});

const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.15});

revealEls.forEach(el => observer.observe(el));

const sections = document.querySelectorAll('section[id');
const navLinks = document.querySelectorAll('nav ul li a')

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting){
            const id = entry.target.getAttribute('id');

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.4});

sections.forEach(section => navObserver.observe(section));


navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.slice(1);
            const targetEl= document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start'});
            }
        }
    });
});