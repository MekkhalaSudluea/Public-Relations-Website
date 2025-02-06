// ฟังก์ชันเปลี่ยนหมวดหมู่ในหน้าจอใหญ่
function loadNews(category, isNotification = false) {
    let container = isNotification ? document.getElementById('news-container-noti') : document.getElementById('news-container');
    let fbContainer = isNotification ? document.getElementById('facebook-container-noti') : document.getElementById('facebook-container');

    // อัปเดตปุ่มที่ถูกเลือก
    let categoryTabs = isNotification ? document.querySelectorAll("#categoryTabsNoti .nav-link") : document.querySelectorAll("#categoryTabs .nav-link");
    categoryTabs.forEach(btn => btn.classList.remove("active"));
    
    if (category === "news") {
        document.getElementById(isNotification ? "pills-home-tab-noti" : "pills-home-tab").classList.add("active");
        container.style.display = "block";
        fbContainer.style.display = "none";
    } else {
        document.getElementById(isNotification ? "pills-profile-tab-noti" : "pills-profile-tab").classList.add("active");
        container.style.display = "none";
        fbContainer.style.display = "block";
    }

    // โหลดข้อมูลข่าว
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

// โหลด Facebook และอัปเดตปุ่มที่เลือก
function loadFacebook(isNotification = false) {
    let container = isNotification ? document.getElementById('news-container-noti') : document.getElementById('news-container');
    let fbContainer = isNotification ? document.getElementById('facebook-container-noti') : document.getElementById('facebook-container');

    let categoryTabs = isNotification ? document.querySelectorAll("#categoryTabsNoti .nav-link") : document.querySelectorAll("#categoryTabs .nav-link");
    categoryTabs.forEach(btn => btn.classList.remove("active"));
    document.getElementById(isNotification ? "pills-profile-tab-noti" : "pills-profile-tab").classList.add("active");

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
