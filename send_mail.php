<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    // إيميلك الذي ستصله الرسائل
    $to = 'hamdihajiali76@gmail.com'; 
    $subject = 'رسالة جديدة من موقع HAMDI PHOTOGRAPHY';
    $headers = "From: " . $email . "\r\n" . "Reply-To: " . $email;
    
    $body = "الاسم: $name\nالبريد: $email\nالرسالة:\n$message";
    
    // إرسال الرسالة
    mail($to, $subject, $body, $headers);
    
    // إرجاع المستخدم فوراً إلى الموقع بعد الإرسال
    header("Location: index.html");
    exit();
}
?>
