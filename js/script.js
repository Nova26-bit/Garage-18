let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
    menu.setAttribute('aria-expanded', navbar.classList.contains('active'));
    menu.setAttribute('aria-label', navbar.classList.contains('active') ? 'Tutup menu navigasi' : 'Buka menu navigasi');
};

navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('fa-times');
        navbar.classList.remove('active');
        menu.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-label', 'Buka menu navigasi');
    });
});

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Buka menu navigasi');
};

const mainHomeImage = document.querySelector('.main-home-image');
const imageChoices = document.querySelectorAll('.image-slider img');

imageChoices.forEach((image, index) => {
    image.setAttribute('role', 'button');
    image.setAttribute('tabindex', '0');
    image.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
    if (index === 0) image.classList.add('is-active');

    image.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            image.click();
        }
    });

    image.addEventListener('click', () => {
        imageChoices.forEach(choice => {
            choice.classList.remove('is-active');
            choice.setAttribute('aria-pressed', 'false');
        });

        image.classList.add('is-active');
        image.setAttribute('aria-pressed', 'true');
        mainHomeImage.src = image.src;
        mainHomeImage.alt = `Racikan kopi Garage 18: ${image.alt.replace(/^Pilih /, '')}`;
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            mainHomeImage.animate(
                [
                    { opacity: 0.35, transform: 'translateY(.6rem) scale(.97)' },
                    { opacity: 1, transform: 'translateY(0) scale(1)' }
                ],
                { duration: 380, easing: 'cubic-bezier(.2, .8, .2, 1)' }
            );
        }
    });
});

const initializeRevealAnimations = () => {
    const revealTargets = document.querySelectorAll(
        '.home .row .content, .home .row .image, .home .image-slider, .about .heading, .about .row > *, .about .icons, .about .content > *, .article .heading, .article-content > *, .menu .heading, .menu .box, .book .heading, .book form .field, .book form .btn, .footer .box, .footer .credit'
    );
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    const revealDuration = isSmallScreen ? 460 : 640;
    const revealStagger = isSmallScreen ? 48 : 72;

    revealTargets.forEach((target, index) => {
        target.style.opacity = '0';
        target.dataset.revealIndex = index;
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const delay = (Number(entry.target.dataset.revealIndex) % 5) * revealStagger;
            entry.target.animate(
                [
                    { opacity: 0, transform: `translateY(${isSmallScreen ? 12 : 20}px) scale(.99)` },
                    { opacity: 1, transform: 'translateY(0) scale(1)' }
                ],
                { duration: revealDuration, delay, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
            );
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    revealTargets.forEach(target => revealObserver.observe(target));
};

if (document.visibilityState === 'visible') {
    initializeRevealAnimations();
} else {
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') initializeRevealAnimations();
    }, { once: true });
}

