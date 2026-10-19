// 1. إخفاء شاشة الترحيب (Splash Screen) بعد ثانية واحدة
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.style.opacity = '0';
            setTimeout(() => splash.style.display = 'none', 500); 
        }
    }, 1000); 
});

// 2. تفعيل التفاعل الحركي ثلاثي الأبعاد (3D Tilt)
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

// 5. تحديث سنة التذييل تلقائياً
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// 6. نموذج التواصل (النسخة الخارقة السرعة - بدون أي تأخير)
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('success-message');
const submitBtn = document.getElementById('submitBtn');
const successSound = document.getElementById('success-sound');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الإرسال...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        // إرسال البيانات بهدوء وسرعة فائقة بدون حظر الواجهة
        fetch('https://formsubmit.co/ajax/hamdihajiali76@gmail.com', {
            method: 'POST',
            body: formData
        }).catch(err => {});

        // إظهار رسالة النجاح فوراً في أقل من ثانية واحدة ليكون الموقع طلقة
        setTimeout(() => {
            if (successSound) successSound.play().catch(e => {});
            if (successMessage) successMessage.classList.remove('hidden');
            contactForm.reset();
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }, 800); // استجابة فورية خلال أقل من ثانية
    });
}
