<?php
// เชื่อมต่อฐานข้อมูล
$conn = new mysqli("localhost", "root", "", "user_management");

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// รับ ID ผู้ใช้จากฟอร์ม
$id = $_POST['id'];

// ลบผู้ใช้จากฐานข้อมูล
$sql = "DELETE FROM users WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    echo "User deleted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

// กลับไปหน้า index.html
header("Location: index.html");
exit();
?>
