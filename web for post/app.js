// ฟังก์ชันสำหรับการแสดงตัวอย่างรูปภาพ
document.getElementById('formFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('imagePreview');
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none';
    }
});

window.onload = function() {
    // ฟังก์ชันสำหรับการตรวจสอบฟอร์มและแสดง Alert
    document.getElementById('submitButton').addEventListener('click', function() {
        console.log("Button clicked!");
        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        const position = document.getElementById('positionSelect').value;

        if (!title || !content || !position) {
            alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
            return;
        }

        // เมื่อข้อมูลครบถ้วน แสดงข้อความแจ้งเตือน
        alert('โพสต์สำเร็จแล้ว!');
        window.location.href = 'index.html'; // กลับไปหน้าหลัก
    });
};

