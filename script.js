// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled-nav');
    } else {
        navbar.classList.remove('scrolled-nav');
    }
});

// Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
const mobileLinks = menu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');
    });
});

// AJAX Form Submission
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('success-message');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // يمنع مغادرة الصفحة نهائياً

    // تغيير شكل الزر
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الإرسال...';
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

    const formData = new FormData(contactForm);

    // استخدام الرابط الخاص بتقنية AJAX
    fetch('https://formsubmit.co/ajax/hamdihajiali76@gmail.com', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            successMessage.classList.remove('hidden'); // إظهار شاشة النجاح
            contactForm.reset(); // إفراغ البيانات
        } else {
            alert('عذراً، حدثت مشكلة أثناء الإرسال.');
        }
    })
    .catch(error => {
        alert('تأكد من اتصالك بالإنترنت وحاول مجدداً.');
    })
    .finally(() => {
        // إعادة الزر لشكله الطبيعي
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
    });
});
