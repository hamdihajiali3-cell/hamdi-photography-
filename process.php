<?php
require_once 'db_connect.php';
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // تنظيف البيانات لحماية قاعدة البيانات من الثغرات (SQL Injection)
    $name = $conn->real_escape_string(trim($_POST['name']));
    $email = $conn->real_escape_string(trim($_POST['email']));
    $service = $conn->real_escape_string(trim($_POST['service']));
    $message = $conn->real_escape_string(trim($_POST['message']));

    // إدخال البيانات في الجدول
    $sql = "INSERT INTO messages (name, email, service, message) 
            VALUES ('$name', '$email', '$service', '$message')";
    
    if ($conn->query($sql) === TRUE) {
        // إعدادات البريد الإلكتروني
        $to = 'hamdihajiali76@gmail.com';
        $subject = "طلب تصوير جديد: $service";
        $headers = "From: " . $email . "\r\n" . 
                   "Reply-To: " . $email . "\r\n" .
                   "Content-Type: text/plain; charset=UTF-8";
                   
        $body = "تلقيت طلباً جديداً من موقعك:\n\n";
        $body .= "الاسم: $name\n";
        $body .= "البريد: $email\n";
        $body .= "نوع الجلسة: $service\n";
        $body .= "الرسالة:\n$message\n";
        
        // إرسال البريد
        mail($to, $subject, $body, $headers);
        
        // إرجاع رسالة نجاح للمتصفح
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'لم نتمكن من حفظ البيانات']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'طلب غير صالح']);
}

$conn->close();
?>
<?php
require_once 'db_connect.php';
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // تنظيف البيانات لحماية قاعدة البيانات من الثغرات (SQL Injection)
    $name = $conn->real_escape_string(trim($_POST['name']));
    $email = $conn->real_escape_string(trim($_POST['email']));
    $service = $conn->real_escape_string(trim($_POST['service']));
    $message = $conn->real_escape_string(trim($_POST['message']));

    // إدخال البيانات في الجدول
    $sql = "INSERT INTO messages (name, email, service, message) 
            VALUES ('$name', '$email', '$service', '$message')";
    
    if ($conn->query($sql) === TRUE) {
        // إعدادات البريد الإلكتروني
        $to = 'hamdihajiali76@gmail.com';
        $subject = "طلب تصوير جديد: $service";
        $headers = "From: " . $email . "\r\n" . 
                   "Reply-To: " . $email . "\r\n" .
                   "Content-Type: text/plain; charset=UTF-8";
                   
        $body = "تلقيت طلباً جديداً من موقعك:\n\n";
        $body .= "الاسم: $name\n";
        $body .= "البريد: $email\n";
        $body .= "نوع الجلسة: $service\n";
        $body .= "الرسالة:\n$message\n";
        
        // إرسال البريد
        mail($to, $subject, $body, $headers);
        
        // إرجاع رسالة نجاح للمتصفح
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'لم نتمكن من حفظ البيانات']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'طلب غير صالح']);
}

$conn->close();
?>
