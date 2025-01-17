// ฟังก์ชันสำหรับแสดงวันที่ปัจจุบัน
var currentDate = new Date();
var formattedDate = currentDate.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

// แสดงวันที่ใน HTML
document.getElementById('news-date').innerText = formattedDate;

// สร้าง WebSocket Connection ไปยังเซิร์ฟเวอร์
const socket = new WebSocket('ws://localhost:3000');

// เมื่อเชื่อมต่อได้แล้ว
socket.onopen = function(event) {
  console.log('Connected to WebSocket server');
};

// เมื่อได้รับข้อความจากเซิร์ฟเวอร์
socket.onmessage = function(event) {
  console.log('Message from server: ', event.data);
  
  // ตัวอย่างการแสดงข่าวจากข้อความที่ได้รับ
  const newsContainer = document.querySelector('.news-carousel');
  const newNewsItem = document.createElement('div');
  newNewsItem.classList.add('news-item');
  
  newNewsItem.innerHTML = `
    <a href="${event.data.url}" target="_blank">
      <img src="${event.data.image}" alt="ข่าวใหม่">
      <h3>${event.data.title}</h3>
    </a>
    <p class="news-date"> <i class="fas fa-clock"></i> <span class="news-date-value">${event.data.date}</span></p>
  `;
  newsContainer.appendChild(newNewsItem);
};

// ถ้ามีการเชื่อมต่อผิดพลาด
socket.onerror = function(error) {
  console.error('WebSocket Error: ', error);
};

// เมื่อ WebSocket ปิดการเชื่อมต่อ
socket.onclose = function(event) {
  console.log('Disconnected from WebSocket server');
};