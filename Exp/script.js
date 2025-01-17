// script.js
function loadNews(category) {
    fetch(`/api/news/${category}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const newsContainer = document.getElementById("news-container");
            // ล้างข้อมูลข่าวเก่าก่อน
            newsContainer.innerHTML = ''; 
            
            // ตรวจสอบว่ามีข่าวหรือไม่
            if (data.length === 0) {
                newsContainer.innerHTML = '<p>ไม่พบข่าวในหมวดหมู่นี้</p>';
                return;
            }

            // แสดงข่าว
            data.forEach(newsItem => {
                const newsDiv = document.createElement('div');
                newsDiv.classList.add('news-item');

                const link = document.createElement('a');
                link.href = newsItem.url;
                link.target = '_blank';

                const img = document.createElement('img');
                img.src = newsItem.img;
                img.alt = newsItem.title;

                const title = document.createElement('h3');
                title.textContent = newsItem.title;

                const date = document.createElement('p');
                date.classList.add('news-date');
                date.innerHTML = `<i class="fas fa-clock"></i> ${newsItem.date}`;

                link.appendChild(img);
                link.appendChild(title);
                newsDiv.appendChild(link);
                newsDiv.appendChild(date);
                newsContainer.appendChild(newsDiv);
            });
        })
        .catch(error => {
            console.error("Error fetching news:", error);
            document.getElementById("news-container").innerHTML = "<p>ไม่สามารถโหลดข่าวได้</p>";
        });
}

// เรียกข้อมูลหมวดหมู่ kmitl เมื่อโหลดหน้าเว็บ
document.addEventListener("DOMContentLoaded", () => {
    loadNews('kmitl');
});
