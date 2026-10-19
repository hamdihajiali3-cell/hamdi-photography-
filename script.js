// 1. إخفاء شاشة الترحيب بعد ثانية واحدة
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.style.opacity = '0';
            setTimeout(() => splash.style.display = 'none', 500); 
        }
    }, 1000); 
});

// 2. تفعيل التفاعل الحركي 3D
document.addEventListener("DOMContentLoaded", () => {
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".portfolio-item, .service-card"), {
            max: 18,
            speed: 350,
            glare: true,
            "max-glare": 0.3,
            scale: 1.04
        });
    }
});

// 3. تظليل القائمة العلوية عند التمرير
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled-nav');
    } else {
        navbar.classList.remove('scrolled-nav');
    }
});

// 4. قائمة الهاتف المحمول
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
if (btn && menu) {
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });
}

// 5. تحديث سنة التذييل
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// 6. حل مشكلة الإرسال النهائي
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', function() {
        // نغير النص فقط، ونسمح للمتصفح بالانتقال لصفحة التفعيل الطبيعية
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الإرسال...';
        contactForm.action = "https://formsubmit.co/hamdihajiali76@gmail.com";
    });
}
