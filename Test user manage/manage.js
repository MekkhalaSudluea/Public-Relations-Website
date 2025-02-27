//ID ที่ล็อกอินเข้ามา
document.addEventListener("DOMContentLoaded", function () {
  const userName = "Mekkhala Sudluea";
  const userEmail = "64200xxx@kmitl.ac.th";

  // สร้างชื่อย่อจากชื่อและนามสกุล
  const userInitials = userName.split(" ").map(name => name[0].toUpperCase()).join("");

  // แสดงชื่อย่อในวงกลม
  document.getElementById("userInitials").innerText = userInitials;
  document.getElementById("userName").innerText = userName;
  document.getElementById("userEmail").innerText = userEmail;

  // ฟังก์ชันสำหรับการเลือกลิงก์ใน Sidebar
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ตัวอย่างข้อมูลผู้ใช้
  const users = [
    { id: 1, fullname: 'John Doe', email: 'johndoe@example.com', username: 'john', password: 'password123', role: 'Admin' },
    { id: 2, fullname: 'Jane Smith', email: 'janesmith@example.com', username: 'jane', password: 'password456', role: 'Editor' },
    { id: 3, fullname: 'Mek S', email: 'Mek@example.com', username: 'MekS', password: 'password888', role: 'Admin' },
    { id: 4, fullname: 'ไก่แจ้', email: 'kai@example.com', username: 'kukkuk', password: 'password999', role: 'Editor' },
  ];

  // ฟังก์ชันแสดง Main Content พร้อมระบบค้นหา
  function renderUserTable(filterText = "") {
    console.log("Rendering user table...");
    let tableHTML = `
      <h1 class="title-link">User</h1>
      <hr>
      <label for="searchUser" class="visually-hidden">Search Users</label>
      <input type="text" id="searchUser" class="form-control mb-3" placeholder="ค้นหาผู้ใช้...">

      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    users.filter(user => 
        user.fullname.toLowerCase().includes(filterText.toLowerCase()) || 
        user.email.toLowerCase().includes(filterText.toLowerCase())
    ).forEach((user, index) => {
        tableHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${user.fullname}</td>
            <td>${user.email}</td>
            <td>
              <button class="btn btn-outline-warning btn-sm edit-btn" data-id="${user.id}">
                <i class="fas fa-edit"></i> Edit
              </button>
              <button class="btn btn-danger btn-sm delete-btn" data-id="${user.id}">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </td>
          </tr>
        `;
    });
    tableHTML += `</tbody></table>`;
    document.getElementById("pageContent").innerHTML = tableHTML;

    // Event Listener สำหรับการค้นหา
    document.getElementById("searchUser").addEventListener("input", function () {
        renderUserTable(this.value);
    });
  }

  // ฟังก์ชันสำหรับแสดงตารางผู้ใช้
  function renderUserTable() {

    //สร้างตาราง
    let tableHTML = `
        <h1 Class = "title-link"> User </h1>
        <hr>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
      `;

    // เพิ่มข้อมูลผู้ใช้ลงในตาราง
    users.forEach((user, index) => {
      tableHTML += `
            <tr>
              <td>${index + 1}</td>
              <td>${user.fullname}</td>
              <td>${user.email}</td>
              <td>
                <button class="btn btn-outline-warning btn-sm edit-btn" data-id="${user.id}">
                  <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${user.id}">
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </td>
            </tr>
          `;
    });

    tableHTML += `</tbody></table>`;
    document.getElementById("pageContent").innerHTML = tableHTML;

    // ฟังก์ชั่น Edit
    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', function () {
        const userId = this.getAttribute('data-id');
        const user = users.find(user => user.id == userId);

        document.getElementById("editFullname").value = user.fullname;
        document.getElementById("editEmail").value = user.email;
        document.getElementById("editUsername").value = user.username;
        document.getElementById("editPassword").value = user.password;

        if (user.role === "Admin") {
          document.getElementById("roleAdmin").checked = true;
        } else {
          document.getElementById("roleEditor").checked = true;
        }

        const editModal = new bootstrap.Modal(document.getElementById('editUserModal'));
        editModal.show();
      });
    });

    // ฟังก์ชั่น Delete
    // ปุ่ม Delete User
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', function () {
        const userId = this.getAttribute('data-id');
        const userIndex = users.findIndex(user => user.id == userId);
        if (userIndex === -1) return;

          // แสดง Modal การลบ
          const modalHTML = `
          <div class="modal fade" id="confirmDeleteModal" tabindex="-1" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered"> 
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="confirmDeleteModalLabel">ยืนยันการลบ</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  คุณแน่ใจว่าต้องการลบผู้ใช้รายนี้หรือไม่?
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Delete</button>
                </div>
              </div>
            </div>
          </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const confirmModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
        confirmModal.show();

        document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
            users.splice(userIndex, 1);
            renderUserTable();
            confirmModal.hide();
            document.getElementById('confirmDeleteModal').remove();
        });
      
        document.getElementById('confirmDeleteModal').addEventListener('hidden.bs.modal', function () {
            document.getElementById('confirmDeleteModal').remove();
        });
      });
    });

  }

  document.getElementById("userManagementBtn").addEventListener("click", renderUserTable);

  // ฟังก์ชันสำหรับ Add User
  document.getElementById("addUserBtn").addEventListener("click", function () {
    document.getElementById("pageContent").innerHTML = `
        <h1 Class = "title-link">Add User</h1>
        <hr>
        <form id="addUserForm">
          <div class="mb-3">
            <label for="newFullname" class="form-label">Full Name</label>
            <input type="text" class="form-control" id="newFullname" placeholder="Firstname Lastname" required>
          </div>
          <div class="mb-3">
            <label for="newEmail" class="form-label">Email</label>
            <input type="email" class="form-control" id="newEmail" placeholder="Enter email" required>
          </div>
          <div class="mb-3">
            <label for="newUsername" class="form-label">Username</label>
            <input type="text" class="form-control" id="newUsername" placeholder="Enter username" required>
          </div>
          <div class="mb-3">
            <label for="newPassword" class="form-label">Password</label>
            <input type="text" class="form-control" id="newPassword" placeholder="Enter Password" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Role</label><br>
            <input type="radio" id="newRoleAdmin" name="role" value="Admin"  required> Admin
            <input type="radio" id="newRoleEditor" name="role" value="Editor" required> Editor
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary me-2" id="cancelAddUserBtn">Cancel</button>
              <button type="reset" class="btn btn-warning me-2">Reset</button>
              <button type="submit" class="btn btn-success">Add User</button>
          </div>
        </form>
      `;

    // ฟังก์ชันแสดง Modal แจ้งเตือน
    function showPopupMessage(message, type) {
      const modalHTML = `
      <div class="modal fade" id="popupModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header ${type === 'error' ? 'bg-danger' : 'bg-success'} text-white">
              <h5 class="modal-title">${type === 'error' ? 'Error' : 'Success'}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
              ${message}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">OK</button>
            </div>
          </div>
        </div>
      </div>
    `;

      document.body.insertAdjacentHTML('beforeend', modalHTML);
      const popupModal = new bootstrap.Modal(document.getElementById('popupModal'));
      popupModal.show();

      document.getElementById('popupModal').addEventListener('hidden.bs.modal', function () {
        document.getElementById('popupModal').remove();
      });
    }

    // ฟังก์ชันเพิ่มผู้ใช้ใหม่
    document.getElementById("addUserForm").addEventListener("submit", function (e) {
      e.preventDefault();

      // ตรวจสอบอีเมลและชื่อผู้ใช้ซ้ำ
      const newEmail = document.getElementById("newEmail").value;
      const newUsername = document.getElementById("newUsername").value;

      if (users.some(user => user.email === newEmail || user.username === newUsername )) {
        showPopupMessage("อีเมลหรือชื่อผู้ใช้มีอยู่แล้ว" , "error")
        return;
      }

      // เพิ่มผู้ใช้ใหม่ใน array
      users.push({
        id: user.length + 1,
        fullname: document.getElementById("newFullname").value,
        email: newEmail,
        userName: newUsername,
        password: document.getElementById("newPassword").value,
        role: document.querySelector('input[name="role"]:checked').value
      });

      showPopupMessage("เพิ่มผู้ใช้สำเร็จ" , "success");
      renderUserTable(); // กลับไปยังหน้าตารางผู้ใช้
    });
  });

  // ฟังก์ชันการแสดง/ซ่อนรหัสผ่าน
  function togglePasswordVisibility() {
    const passwordField = document.getElementById('editPassword');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
  }

  // ตั้งค่าให้ไอคอนตาใช้ฟังก์ชัน toggle
  document.getElementById('togglePassword').addEventListener('click', togglePasswordVisibility);


  document.getElementById("logoutBtn").addEventListener("click", function () {
    fetch("/logout", { method: "POST", credentials: "include" })
          .then(response => {
              if (response.ok) {
                  window.location.href = "login.html";
              } else {
                  alert("Logout failed!");
              }
          })
          .catch(error => console.error("Logout error:", error));
  });
});
