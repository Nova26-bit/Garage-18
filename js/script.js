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

document.querySelectorAll('.image-slider img').forEach(images => {
    images.onclick = () => {
        var src = images.getAttribute('src');
        document.querySelector('.main-home-image').src = src;
    };
});

