// إخفاء شاشة الترحيب (Splash Screen) بعد تحميل الموقع
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
        }, 1000); 
    }, 2000); 
});

// تأثير تظليل القائمة العلوية
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled-nav');
    } else {
        navbar.classList.remove('scrolled-nav');
    }
});

// فتح وإغلاق قائمة الهاتف
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
if (btn && menu) {
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
}
