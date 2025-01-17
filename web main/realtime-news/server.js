const WebSocket = require('ws');
const express = require('express');
const app = express();

// สร้าง WebSocket Server
const wss = new WebSocket.Server({ noServer: true });

// เมื่อมีการเชื่อมต่อ WebSocket
wss.on('connection', (ws) => {
  console.log('Client connected');

  // ส่งข้อมูลข่าวไปยัง client
  ws.send(JSON.stringify({
    title: 'ข่าวใหม่',
    url: 'https://www.example.com',
    image: 'https://www.example.com/image.jpg',
    date: '2024-11-10'
  }));

  // ถ้ามีข้อความจาก client
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });
});

// กำหนดพอร์ตสำหรับ Express server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
