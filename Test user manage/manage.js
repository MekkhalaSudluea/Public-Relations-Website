document.addEventListener("DOMContentLoaded", function () {
  // เพิ่มฟังก์ชันการซ่อน/แสดงรหัสผ่าน
  function togglePasswordVisibility() {
    const passwordField = document.getElementById('editPassword');
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
  }

  const users = [
    { id: 1, fullname: "John Doe", email: "johndoe@example.com", username: "johndoe", role: "Admin" },
    { id: 2, fullname: "Jane Smith", email: "janesmith@example.com", username: "janesmith", role: "Editor" },
    { id: 3, fullname: "Mek Sud", email: "Mek@example.com", username: "MekS", role: "Admin" },
    // เพิ่มผู้ใช้ในรูปแบบนี้
  ];

  // ฟังก์ชันสำหรับแสดงตารางผู้ใช้
  function renderUserTable() {
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = ''; // ล้างข้อมูลก่อนแสดงใหม่
    users.forEach((user, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td> <!-- ลำดับ -->
        <td>${user.fullname}</td>
        <td>
          <button class="btn btn-warning btn-sm edit-btn" data-id="${user.id}">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="btn btn-danger btn-sm delete-btn" data-id="${user.id}">
            <i class="fas fa-trash"></i> Delete
          </button>
        </td>
      `;
      userTableBody.appendChild(row);
    });

    // เพิ่ม Event Listener สำหรับปุ่ม Edit
    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', function () {
        const userId = this.getAttribute('data-id');
        const user = users.find(u => u.id == userId);
        openEditModal(user);
      });
    });

    // เพิ่ม Event Listener สำหรับปุ่ม Delete
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', function () {
        const userId = this.getAttribute('data-id');
        deleteUser(userId);
      });
    });
  }

  // ฟังก์ชันเปิด Modal สำหรับแก้ไขข้อมูลผู้ใช้
  function openEditModal(user) {
    document.getElementById('editFullname').value = user.fullname;
    document.getElementById('editEmail').value = user.email;
    document.getElementById('editUsername').value = user.username;
    document.getElementById('editPassword').value = ''; // เคลียร์รหัสผ่าน
    document.getElementById('roleAdmin').checked = user.role === "Admin";
    document.getElementById('roleEditor').checked = user.role === "Editor";

    const editModal = new bootstrap.Modal(document.getElementById('editUserModal'));
    editModal.show();

    // เมื่อบันทึกการแก้ไข
    document.getElementById('saveChangesBtn').addEventListener('click', function () {
      user.fullname = document.getElementById('editFullname').value;
      user.email = document.getElementById('editEmail').value;
      user.username = document.getElementById('editUsername').value;
      user.role = document.querySelector('input[name="role"]:checked').value;
      renderUserTable(); // อัปเดตตารางหลังจากการแก้ไข
      editModal.hide();
    });
  }

  // ฟังก์ชันลบผู้ใช้
  function deleteUser(userId) {
    const userIndex = users.findIndex(user => user.id == userId);
    if (userIndex > -1) {
      users.splice(userIndex, 1); // ลบผู้ใช้
      renderUserTable(); // อัปเดตตารางหลังจากการลบ
    }
  }

  // เรียกใช้ฟังก์ชันเพื่อแสดงตารางผู้ใช้เมื่อเริ่มต้น
  renderUserTable();

  // ฟังก์ชันสำหรับ Add User
  document.getElementById("addUserBtn").addEventListener("click", function () {
    document.getElementById("pageContent").innerHTML = `
        <h1>Add User</h1>
        <form id="addUserForm">
          <div class="mb-3">
            <label for="newFullname" class="form-label">Firstname Lastname</label>
            <input type="text" class="form-control" id="newFullname" placeholder="Enter full name" required>
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
            <input type="text" class="form-control" id="newPassword" placeholder="Enter password" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Role</label>
            <div>
              <input type="radio" id="roleAdmin" name="newRole" value="Admin" required>
              <label for="roleAdmin">Admin</label>
            </div>
            <div>
              <input type="radio" id="roleEditor" name="newRole" value="Editor" required>
              <label for="roleEditor">Editor</label>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-secondary me-2" id="cancelAddUserBtn">Cancel</button>
            <button type="reset" class="btn btn-warning me-2">Reset</button>
            <button type="submit" class="btn btn-success">Add User</button>
          </div>
        </form>
      `;
  
    // ฟังก์ชันยกเลิกการเพิ่มผู้ใช้
    document.getElementById("cancelAddUserBtn").addEventListener("click", function () {
      renderUserTable(); // กลับไปยังหน้าตารางผู้ใช้
    });
  
    // ฟังก์ชันเพิ่มผู้ใช้ใหม่
    document.getElementById("addUserForm").addEventListener("submit", function (event) {
      event.preventDefault();
  
      const fullname = document.getElementById("newFullname").value;
      const email = document.getElementById("newEmail").value;
      const username = document.getElementById("newUsername").value;
      const password = document.getElementById("newPassword").value;
      const role = document.querySelector('input[name="newRole"]:checked').value;
  
      // เพิ่มผู้ใช้ใหม่ใน array
      const newUser = {
        id: users.length + 1, // กำหนด ID ใหม่
        fullname: fullname,
        email: email,
        username: username,
        role: role,
      };
      users.push(newUser);
  
      alert("User added successfully!");
      renderUserTable(); // กลับไปยังหน้าตารางผู้ใช้
    });
  });
  

  // Logout functionality
  document.getElementById("logoutBtn").addEventListener("click", function () {
    window.location.href = "login.html"; // เปลี่ยนเส้นทางไปหน้า login
  });
});
