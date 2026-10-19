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

// 2. تظليل القائمة العلوية عند التمرير
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled-nav');
    } else {
        navbar.classList.remove('scrolled-nav');
    }
});

// 3. قائمة الهاتف المحمول
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

// 4. تحديث سنة التذييل
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// 5. نموذج التواصل - مع الحل الذكي للتعليق والتفعيل
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
        .then(response => {
            // إذا كان الإيميل غير مفعل بعد، سيفشل الطلب المخفي هنا
            if (!response.ok) throw new Error("Needs Activation");
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // نجاح الإرسال الفاخر المخفي
                if (successSound) successSound.play().catch(err => {});
                if (successMessage) successMessage.classList.remove('hidden');
                contactForm.reset();
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            } else {
                throw new Error('Form Error');
            }
        })
        .catch(error => {
            // الحل الذكي: التحويل التلقائي للإرسال العادي لتظهر لك صفحة تفعيل الإيميل
            contactForm.action = "https://formsubmit.co/hamdihajiali76@gmail.com";
            contactForm.submit();
        });
    });
}
