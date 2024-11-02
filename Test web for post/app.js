document.getElementById('newsForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').files[0]; // ดึงไฟล์ที่เลือก

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerHTML = '<p>โพสต์ข่าวสำเร็จ!</p>';
        document.getElementById('newsForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('response').innerHTML = '<p>เกิดข้อผิดพลาดในการโพสต์ข่าว</p>';
    });
});
