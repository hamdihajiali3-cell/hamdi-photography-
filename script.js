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

// 2. تفعيل التفاعل الحركي ثلاثي الأبعاد (3D Tilt) على صور المعرض والخدمات
document.addEventListener("DOMContentLoaded", () => {
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".portfolio-item, .service-card"), {
            max: 15,          // زاوية الميلان
            speed: 400,       // سرعة الاستجابة
            glare: true,      // تأثير الإضاءة الساطعة الفاخرة
            "max-glare": 0.2, // نسبة اللمعان
            scale: 1.05       // التقدّم للأمام قليلاً
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

// 6. نموذج التواصل
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

        fetch('https://formsubmit.co/ajax/hamdihajiali76@gmail.com', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                if (successSound) successSound.play().catch(e => {});
                if (successMessage) successMessage.classList.remove('hidden');
                contactForm.reset();
            } else {
                alert('عذراً، حدثت مشكلة أثناء الإرسال.');
            }
        })
        .catch(error => {
            alert('تأكد من اتصالك بالإنترنت وحاول مجدداً.');
        })
        .finally(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}
