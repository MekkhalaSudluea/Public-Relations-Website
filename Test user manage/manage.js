document.addEventListener("DOMContentLoaded", function () {
  const userName = "Mekkhala Sudluea";
  const userEmail = "64200xxx@kmitl.ac.th";

  // สร้างชื่อย่อจากชื่อและนามสกุล
  const userInitials = userName.split(" ").map(name => name[0].toUpperCase()).join("");

  // แสดงชื่อย่อและข้อมูลผู้ใช้
  document.getElementById("userInitials").innerText = userInitials;
  document.getElementById("userName").innerText = userName;
  document.getElementById("userEmail").innerText = userEmail;

  // ตั้งค่า Sidebar Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function () {
          document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
          this.classList.add('active');
      });
  });

  // ตัวอย่างข้อมูลผู้ใช้
  let users = [
      { id: 1, fullname: 'John Doe', email: 'johndoe@example.com', username: 'john', password: 'password123', role: 'Admin' },
      { id: 2, fullname: 'Jane Smith', email: 'janesmith@example.com', username: 'jane', password: 'password456', role: 'Editor' },
      { id: 3, fullname: 'Mek S', email: 'Mek@example.com', username: 'MekS', password: 'password888', role: 'Admin' },
      { id: 4, fullname: 'ไก่แจ้', email: 'kai@example.com', username: 'kukkuk', password: 'password999', role: 'Editor' },
  ];

  function togglePasswordVisibility() {
    const passwordField = document.getElementById("editPassword");
    const toggleButton = document.getElementById("togglePassword");

    if (passwordField && toggleButton) {
      if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleButton.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
      } else {
        passwordField.type = "password";
        toggleButton.innerHTML = '<i class="fa-regular fa-eye"></i>';
      }
    }
  }

  function renderUserTable(filterText = "") {
      let tableHTML = `
          <h1 class="title-link">User</h1>
          <hr>
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

      const filteredUsers = users.filter(user => 
          user.fullname.toLowerCase().includes(filterText.toLowerCase()) || 
          user.email.toLowerCase().includes(filterText.toLowerCase())
      );

      if (filteredUsers.length === 0) {
          tableHTML += `<tr><td colspan="4" class="text-center">ไม่พบผู้ใช้</td></tr>`;
      }

      filteredUsers.forEach((user, index) => {
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

      document.getElementById("searchUser").value = filterText;
      document.getElementById("searchUser").addEventListener("input", function () {
          renderUserTable(this.value);
      });

      addEditDeleteListeners();
  }

  function addEditDeleteListeners() {
      document.querySelectorAll('.edit-btn').forEach(button => {
          button.addEventListener('click', function () {
              const userId = this.getAttribute('data-id');
              const user = users.find(user => user.id == userId);
              
              if (user) {
                  document.getElementById("editFullname").value = user.fullname;
                  document.getElementById("editEmail").value = user.email;
                  document.getElementById("editUsername").value = user.username;
                  document.getElementById("editPassword").value = user.password;
                  
                  if (user.role === "Admin") {
                      document.getElementById("roleAdmin").checked = true;
                  } else {
                      document.getElementById("roleEditor").checked = true;
                  }

                  new bootstrap.Modal(document.getElementById('editUserModal')).show();

                  document.getElementById("togglePassword").addEventListener("click", togglePasswordVisibility);
              
                  document.getElementById("saveEditBtn").addEventListener("click", function () {
                    user.fullname = document.getElementById("editFullname").value;
                    user.email = document.getElementById("editEmail").value;
                    user.username = document.getElementById("editUsername").value;
                    user.password = document.getElementById("editPassword").value;
                    user.role = document.querySelector('input[name="editRole"]:checked').value;
                    
                    alert("แก้ไขข้อมูลสำเร็จ");
                    renderUserTable();
                });
              }
          });
      });

      document.querySelectorAll('.delete-btn').forEach(button => {
          button.addEventListener('click', function () {
              const userId = this.getAttribute('data-id');
              const userIndex = users.findIndex(user => user.id == userId);
              
              if (userIndex !== -1 && confirm("คุณแน่ใจว่าต้องการลบผู้ใช้รายนี้?")) {
                  users.splice(userIndex, 1);
                  renderUserTable();
              }
          });
      });
  }

  document.getElementById("userManagementBtn").addEventListener("click", () => renderUserTable());

  // ฟังก์ชันสำหรับเพิ่มผู้ใช้ใหม่
  document.getElementById("addUserBtn").addEventListener("click", function () {
    document.getElementById("pageContent").innerHTML = `
        <h1 class="title-link">Add User</h1>
        <hr>
        <form id="addUserForm">
            <div class="mb-3">
                <label for="newFullname" class="form-label">Full Name</label>
                <input type="text" class="form-control" id="newFullname" required>
            </div>
            <div class="mb-3">
                <label for="newEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="newEmail" required>
            </div>
            <div class="mb-3">
                <label for="newUsername" class="form-label">Username</label>
                <input type="text" class="form-control" id="newUsername" required>
            </div>
            <div class="mb-3">
                <label for="newPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="newPassword" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Role</label><br>
                <input type="radio" id="newRoleAdmin" name="role" value="Admin" required> Admin
                <input type="radio" id="newRoleEditor" name="role" value="Editor" required> Editor
            </div>
            <div class="d-flex justify-content-end">
                <button type="reset" class="btn btn-secondary me-2">Clear</button>
                <button type="submit" class="btn btn-success">Add User</button>
          </div>
        </form>
    `;

    document.getElementById("addUserForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const newUsername = document.getElementById("newUsername").value;
          if (users.some(user => user.username === newUsername)) {
              alert("Username นี้มีอยู่แล้ว กรุณาใช้ชื่ออื่น");
              return;
          }
          
        users.push({
            id: users.length + 1,
            fullname: document.getElementById("newFullname").value,
            email: document.getElementById("newEmail").value,
            username: newUsername,
            password: document.getElementById("newPassword").value,
            role: document.querySelector('input[name="role"]:checked').value
        });
        alert("เพิ่มข้อมูลผู้ใช้เรียบร้อยแล้ว");
        renderUserTable();
    });
});

  document.getElementById("logoutBtn")?.addEventListener("click", function () {
      fetch("/logout", { method: "POST", credentials: "include" }).then(response => {
          if (response.ok) window.location.href = "login.html";
          else alert("Logout failed!");
      });
  });
});
