<?php
$host = "localhost";
$username = "root"; // اسم مستخدم قاعدة البيانات في استضافتك
$password = ""; // كلمة مرور قاعدة البيانات
$dbname = "hamdi_photography_db"; // اسم قاعدة البيانات التي أنشأتها

$conn = new mysqli($host, $username, $password, $dbname);
$conn->set_charset("utf8");

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'فشل الاتصال بقاعدة البيانات']));
}

?>
