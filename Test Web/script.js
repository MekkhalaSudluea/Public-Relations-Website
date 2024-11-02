// ฟังก์ชันสำหรับแสดงวันที่ปัจจุบัน
var currentDate = new Date();
var formattedDate = currentDate.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

// แสดงวันที่ใน HTML
document.getElementById('news-date').innerText = formattedDate;
