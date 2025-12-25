// src/login/index.jsx
import React from 'react';
import { Button, Container, Card } from 'react-bootstrap';

const Login = () => {

  const handleFakeLogin = () => {
    // 1. Tạo dữ liệu User giả (Bắt buộc phải có UserId để FormKhaiTu hoạt động)
    const fakeUser = {
      UserId: 1,             // Quan trọng: FormKhaiTu cần cái này
      UserName: "admin_fake",
      Role: "Admin",
      HoTen: "Cán Bộ Giả Lập"
    };

    // 2. Ghi đè vào LocalStorage (Giả lập hành động của AuthContext)
    localStorage.setItem("user", JSON.stringify(fakeUser));

    // 3. Set thời gian hết hạn (30 phút) để AuthContext không tự logout
    const sessionTimeout = 1800000; // 30 phút
    const expirationTime = Date.now() + sessionTimeout;
    localStorage.setItem("expirationTime", expirationTime);

    // 4. Reload lại trang
    // Khi reload, AuthContext sẽ chạy dòng: useState(JSON.parse(localStorage.getItem("user")))
    // Và nó sẽ lấy được dữ liệu fakeUser ở trên => Đăng nhập thành công!
    window.location.reload();
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Card style={{ width: '400px', padding: '30px', textAlign: 'center' }}>
        <h3 className="mb-4">Giả Lập Đăng Nhập</h3>
        <p className="text-muted">
          Backend Login chưa chạy. Bấm nút dưới để nạp dữ liệu Admin giả vào trình duyệt.
        </p>
        
        <Button variant="success" size="lg" onClick={handleFakeLogin}>
          LOGIN NGAY (ADMIN)
        </Button>
      </Card>
    </Container>
  );
};

export default Login;