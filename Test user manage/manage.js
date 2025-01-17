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

  // ฟังก์ชันสำหรับแสดงตารางผู้ใช้
  function renderUserTable() {

      //สร้างตาราง
      let tableHTML = `
        <h1 Class = "title link"> User </h1>
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
      document.querySelectorAll('.delete-btn').forEach(button => {
          button.addEventListener('click', function () {
              const userId = this.getAttribute('data-id');
              const userIndex = users.findIndex(user => user.id == userId);
              if (userIndex !== -1) {
                  users.splice(userIndex, 1);
                  renderUserTable();
              }
          });
      });
  }

  document.getElementById("userManagementBtn").addEventListener("click", renderUserTable);

   // ฟังก์ชันสำหรับ Add User
  document.getElementById("addUserBtn").addEventListener("click", function () {
      document.getElementById("pageContent").innerHTML = `
        <h1 Class = "title link">Add User</h1>
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
            <input type="radio" id="newRoleAdmin" name="role" value="Admin" required> Admin
            <input type="radio" id="newRoleEditor" name="role" value="Editor" required> Editor
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary me-2" id="cancelAddUserBtn">Cancel</button>
              <button type="reset" class="btn btn-warning me-2">Reset</button>
              <button type="submit" class="btn btn-success">Add User</button>
          </div>
        </form>
      `;

      // ฟังก์ชันเพิ่มผู้ใช้ใหม่
      document.getElementById("addUserForm").addEventListener("submit", function (e) {
          e.preventDefault();

          // เพิ่มผู้ใช้ใหม่ใน array
          const newUser = {
              id: users.length + 1, // กำหนด ID ใหม่
              fullname: document.getElementById("newFullname").value,
              email: document.getElementById("newEmail").value,
              username: document.getElementById("newUsername").value,
              password: document.getElementById("newPassword").value,
              role: document.querySelector('input[name="role"]:checked').value
          };

          users.push(newUser);
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
      window.location.href = "login.html";
  });
});
