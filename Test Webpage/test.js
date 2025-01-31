/* script.js */
function adjustUI() {
    if (window.innerWidth <= 500) {
        document.getElementById("fullUI").style.display = "none";
        document.getElementById("notificationUI").style.display = "block";
    } else {
        document.getElementById("fullUI").style.display = "block";
        document.getElementById("notificationUI").style.display = "none";
    }
}

window.onload = adjustUI;
window.onresize = adjustUI;


// เรียกใช้เมื่อโหลดหน้าเว็บ
window.onload = adjustUI;
// เรียกใช้เมื่อมีการเปลี่ยนขนาดหน้าจอ
window.onresize = adjustUI;

// ฟังก์ชันค้นหาข่าว
function searchNews() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let newsItems = document.querySelectorAll('.news-item');

    newsItems.forEach(item => {
        let title = item.querySelector('h3').innerText.toLowerCase();
        let content = item.querySelector('p') ? item.querySelector('p').innerText.toLowerCase() : "";

        if (title.includes(input) || content.includes(input)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

function toggleSidebar() {
    document.getElementById("sidebarUI").style.display = "none";
}