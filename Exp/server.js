// server.js
const express = require('express');
const app = express();
const port = 3001;

app.use(express.static('public'));

// ข้อมูลข่าวประชาสัมพันธ์จำลอง
const newsData = {
  kmitl: [
    {
      title: "บิ๊กต่าย สั่งถอดบทเรียนน้ำท่วมเชียงราย",
      url: "https://www.thairath.co.th/news/crime/2814585",
      img: "https://static.thairath.co.th/media/dFQROr7oWzulq5Fa6rBo8VwuO3SphB21QIqgETZ8BMmfUAmCdknswMWHi1UM0RYfbYf.webp",
      date: "1 ตุลาคม 2024"
    },
    {
      title: "สรุปสถานการณ์สาธารณภัย กระทบ 12 จังหวัด",
      url: "https://www.thairath.co.th/news/local/2814559",
      img: "https://static.thairath.co.th/media/dFQROr7oWzulq5Fa6rBo8U668X6wY5Y1uCZkxPQIPlcIzWpDnRac4voLbxU9XJEkjSG.webp",
      date: "2 ตุลาคม 2024"
    },
    {
      title: "ตำรวจ ภ.4 เปิดพื้นที่ทุกโรงพักเป็นจุดจอดรถ",
      url: "https://www.thairath.co.th/news/crime/2814544",
      img: "https://static.thairath.co.th/media/dFQROr7oWzulq5Fa6rBo8VDXPzDDdYYoqcoQd3ZeEDL7hAOLYNaIOlbtP5ga0vAKJCK.webp",
      date: "3 ตุลาคม 2024"
    }
  ],
  facebook: [
    {
      title: "แอป Google Search บน Android พบปัญหาแอปแครช",
      url: "https://www.blognone.com/node/142007",
      img: "https://www.blognone.com/sites/default/files/externals/e0cf4e4aa9d6ae3ed397cb4692b367d9.jpg"
    },
    {
      title: "พบกล่องทีวีแอนดรอยด์ที่ใช้ AOSP ติดมัลแวร์ราว 1.3 ล้านเครื่อง",
      url: "https://www.blognone.com/node/142006",
      img: "https://www.blognone.com/sites/default/files/externals/4241901c9c081a15c2aa540a5726232b.png"
    },
    {
      title: "Palworld สยบข่าวลือ ไม่หันไปทำเกม Free-to-Play",
      url: "https://www.blognone.com/node/142008",
      img: "https://www.blognone.com/sites/default/files/externals/2d69c0c12eb8adda6846d1e25f532c35.jpg"
    }
  ]
};

// Endpoint สำหรับดึงข้อมูลข่าว
app.get('/api/news/:category', (req, res) => {
  const category = req.params.category;
  res.json(newsData[category] || []);  // ส่งข่าวตามหมวดหมู่ที่ร้องขอ
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
