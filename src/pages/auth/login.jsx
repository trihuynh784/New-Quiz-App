import { Button, Form, Input, notification, Spin } from "antd";
import { getUser } from "../../services/authService";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "../../store/actions/authActions";
import "./auth.scss";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const rules = [
    {
      required: true,
      message: "Bắt buộc!",
    },
  ];

  const handleSubmit = async (values) => {
    setLoading(!loading);
    const result = await getUser("email", values.email);
    if (result.length > 0 && result[0].password == values.password) {
      setCookie("id", result[0].id);
      setCookie("fullName", result[0].fullName);
      setCookie("email", result[0].email);
      setCookie("token", result[0].token);
      api["success"]({
        message: <h3>Chúc mừng !</h3>,
        description: "Bạn đã đăng nhập thành công !",
      });
      setTimeout(() => {
        dispatch(LOGIN());
        navigate("/");
      }, 1000);
    } else {
      api["error"]({
        message: <h3>Xin lỗi !</h3>,
        description: "Tài khoản hoặc mật khẩu không chính xác !",
      });
    }
    setLoading(!loading);
  };

  return (
    <div className="container">
      {contextHolder}
      <div className="login">
        <Spin spinning={loading}>
          <Form onFinish={handleSubmit} className="login-form">
            <h2>Login</h2>
            <Form.Item name="email" rules={rules}>
              <Input className="login-form__input" placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" rules={rules}>
              <Input
                type="password"
                className="login-form__input"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                className="login-form__btn"
                type="primary"
              >
                Login
              </Button>
            </Form.Item>
            <p>
              Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
            </p>
          </Form>
        </Spin>
      </div>
    </div>
  );
}

export default LoginPage;
