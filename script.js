// 6. نموذج التواصل (الإرسال الطبيعي والاحترافي داخل نفس الصفحة)
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('success-message');
const submitBtn = document.getElementById('submitBtn');
const successSound = document.getElementById('success-sound');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // هذا السطر يمنع المتصفح من الانتقال لأي صفحة ثانية

        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الإرسال...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        // الإرسال في الخلفية (AJAX)
        fetch('https://formsubmit.co/ajax/hamdihajiali76@gmail.com', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // إظهار رسالة النجاح داخل الموقع
                if (successSound) successSound.play().catch(err => {});
                if (successMessage) successMessage.classList.remove('hidden');
                contactForm.reset();
            } else {
                alert('عذراً، حدثت مشكلة أثناء الإرسال.');
            }
        })
        .catch(error => {
            alert('حدث خطأ، تأكد من اتصالك بالإنترنت.');
        })
        .finally(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}
