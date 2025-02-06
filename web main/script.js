function adjustUI() {
    let fullUI = document.getElementById("fullUI");
    let notificationUI = document.getElementById("notificationUI");

    if (window.innerWidth <= 500) {
        fullUI.style.display = "none";
        notificationUI.style.display = "block";
    } else {
        fullUI.style.display = "block";
        notificationUI.style.display = "none";
    }
}

// โหลดข่าวและซ่อน Facebook ในหน้าจอเล็ก
function loadNews(category, isNotification = false) {
    let container = isNotification ? document.getElementById('news-container-noti') : document.getElementById('news-container');
    let fbContainer = isNotification ? document.getElementById('facebook-container-noti') : document.getElementById('facebook-container');

    container.style.display = "block";
    fbContainer.style.display = "none";

    fetch('fetch_news.php?category=' + category)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = '';
            data.forEach(news => {
                const picture = news.ns_picture ? news.ns_picture : '/image/image_b.png';

                let newsHTML = `
                    <div class="news-item">
                        <a href="${news.link_url}" target="_blank">
                            <img src="${picture}" alt="${news.ns_head}">
                            <h3>${news.ns_head}</h3>
                        </a>
                        <p class="news-date">
                            <i class="fas fa-clock"></i> ${new Date(news.ns_date).toLocaleDateString()}
                            <button class="btn btn-primary btn-sm">${news.nsg_name}</button>
                        </p>
                    </div>
                `;
                container.innerHTML += newsHTML;
            });
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            container.innerHTML = '<p>ไม่สามารถโหลดข่าวได้</p>';
        });
}

// โหลด Facebook และซ่อนข่าว
function loadFacebook(isNotification = false) {
    let container = isNotification ? document.getElementById('news-container-noti') : document.getElementById('news-container');
    let fbContainer = isNotification ? document.getElementById('facebook-container-noti') : document.getElementById('facebook-container');

    container.style.display = "none";
    fbContainer.style.display = "block";
}

// ตั้งค่าเริ่มต้นเมื่อโหลดหน้าเว็บ
window.onload = function () {
    adjustUI();
    loadNews('news'); // โหลดข่าว KMITL News เป็นค่าเริ่มต้น
    loadNews('news', true); // โหลดข่าว KMITL News ในหน้าจอเล็ก
};

// เรียกใช้เมื่อมีการเปลี่ยนขนาดหน้าจอ
window.onresize = adjustUI;