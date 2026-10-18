// 1. إخفاء شاشة الترحيب بسلاسة بعد ثانيتين
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.style.opacity = '0';
            setTimeout(() => splash.style.display = 'none', 1000); 
        }
    }, 2000); 
});

// 2. تظليل القائمة العلوية عند التمرير
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-dark-900', 'bg-opacity-95', 'shadow-lg');
    } else {
        navbar.classList.remove('bg-dark-900', 'bg-opacity-95', 'shadow-lg');
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

// 4. تحديث سنة التذييل تلقائياً
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// 5. المساعد الذكي الآمن (يعمل أونلاين ويحتوي على ردود ذكية احتياطية فورية)
const chatToggle = document.getElementById('chat-toggle');
const chatBox = document.getElementById('chat-box');
const closeChat = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const sendChat = document.getElementById('send-chat');
const chatMessages = document.getElementById('chat-messages');

if (chatToggle && chatBox) {
    chatToggle.addEventListener('click', () => { 
        chatBox.classList.remove('hidden'); 
        chatBox.classList.add('flex'); 
        chatToggle.classList.add('hidden'); 
    });
}

if (closeChat) {
    closeChat.addEventListener('click', () => { 
        chatBox.classList.add('hidden'); 
        chatBox.classList.remove('flex'); 
        chatToggle.classList.add('hidden'); 
    });
}

function addChatMessage(text, isUser) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `p-3 rounded-lg w-10/12 text-sm leading-relaxed border ${isUser ? 'bg-gold-500 text-dark-900 rounded-tl-none self-end border-gold-400 font-semibold' : 'bg-dark-700 text-gray-200 rounded-tr-none self-start border-dark-600'}`;
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// دالة ردود ذكية محلية واحترافية لا توقف الموقع أبداً
function getSmartFallbackReply(text) {
    const lower = text.toLowerCase();
    if (lower.includes('سعر') || lower.includes('تكلفة') || lower.includes('كم') || lower.includes('prices')) {
        return "أهلاً بك! تختلف أسعار جلسات التصوير حسب نوع الجلسة (تخرج، بورتريه، خارجية). يمكنك التواصل مباشرة عبر واتساب أو الاتصال على 05377423671 لمعرفة التفاصيل والعروض.";
    } else if (lower.includes('معدات') || lower.includes('كاميرا') || lower.includes('عدسة')) {
        return "يعمل المصور حمدي بمعدات احترافية تشمل كاميرات Canon DSLR مع عدسة 50mm لعزل الخلفية بعمق ميدان مذهل، مع معالجة RAW وتلوين سينمائي فاخر.";
    } else if (lower.includes('موقع') || lower.includes('وين') || lower.includes('غازي عنتاب')) {
        return "يتواجد المصور حمدي في مدينة غازي عنتاب التركية، ويقدم جلسات تصوير احترافية داخل الاستوديو وخارجه.";
    } else {
        return "أهلاً بك في موقع HAMDI PHOTOGRAPHY. أنا هنا لمساعدتك في حجز جلسات التصوير (تخرج، بورتريه، خارجية). هل ترغب في حجز موعد أو الاستفسار عن خدمة محددة؟";
    }
}

async function callGeminiAPI(userText) {
    const apiKey = "AQ.Ab8RN6I_uetUznJYjWl4B-gB-EZDU2F3HSmqFJ-hlJs4IMLBXQ"; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const prompt = `أنت المساعد الذكي لموقع المصور حمدي في غازي عنتاب. أجب على الزائر باختصار وود باللغة العربية. سؤال الزائر: ${userText}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            return data.candidates[0].content.parts[0].text;
        } else {
            // إذا فشل المفتاح، سنعطيه الرد الذكي المباشر دون إظهار أي خطأ برمجي مزعج
            return getSmartFallbackReply(userText);
        }
    } catch (error) {
        return getSmartFallbackReply(userText);
    }
}

async function handleChatSubmit() {
    const text = chatInput.value.trim();
    if (text) {
        addChatMessage(text, true);
        chatInput.value = '';
        
        const typingId = 'typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.id = typingId;
        typingDiv.className = 'text-gray-500 text-xs self-start mr-2';
        typingDiv.innerHTML = '<i class="fas fa-ellipsis-h animate-pulse"></i> جارٍ الرد...';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        const botReply = await callGeminiAPI(text);
        
        const typingElement = document.getElementById(typingId);
        if (typingElement) typingElement.remove();
        addChatMessage(botReply, false);
    }
}

if (sendChat && chatInput) {
    sendChat.addEventListener('click', handleChatSubmit);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleChatSubmit(); });
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
