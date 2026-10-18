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

// 5. المساعد الذكي المفتوح وغير المحدود (Gemini API)
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
        chatToggle.classList.remove('hidden'); 
    });
}

function addChatMessage(text, isUser) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `p-3 rounded-lg w-10/12 text-sm leading-relaxed border ${isUser ? 'bg-gold-500 text-dark-900 rounded-tl-none self-end border-gold-400 font-semibold' : 'bg-dark-700 text-gray-200 rounded-tr-none self-start border-dark-600'}`;
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function callGeminiAPI(userText) {
    // المفتاح الجديد الخاص بك
    const apiKey = "AQ.Ab8RN6IwBn3AKLVzZGw3BJuJyilggAGKXMcJ-ICvymg6l742Fw"; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const prompt = `أنت مساعد ذكي شخصي وممثل رسمي لموقع المصور المحترف حمدي في غازي عنتاب. يمكنك الإجابة على أي سؤال يطرحه الزائر بحرية تامة وذكاء شامل (سواء عن أعمال حمدي في التصوير، البورتريه، التخرج، التلوين السينمائي، أو أي مواضيع عامة أخرى يطرحها المستخدم). كن ودوداً، ذكياً، ومرناً في إجاباتك. سؤال المستخدم: ${userText}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            return data.candidates[0].content.parts[0].text;
        } else if (data.error) {
            return "عذراً، خطأ في المفتاح: " + data.error.message;
        } else {
            return "أنا جاهز للإجابة على أي سؤال تطرحه، تفضل!";
        }
    } catch (error) {
        return "عذراً، أواجه مشكلة مؤقتة في الاتصال بالشبكة.";
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
        typingDiv.innerHTML = '<i class="fas fa-ellipsis-h animate-pulse"></i> الذكاء الاصطناعي يفكر...';
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
