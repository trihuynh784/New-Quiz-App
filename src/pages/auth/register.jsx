import { Button, Form, Input, notification, Spin } from "antd";
import { getUser, register } from "../../services/authService";
import { generateToken } from "../../helpers/cookie";
import { Link, useNavigate } from "react-router-dom";
import "./auth.scss";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
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
    const checkEmail = await getUser("email", values.email);
    if (checkEmail.length > 0) {
      api["error"]({
        message: <h3>Lỗi !</h3>,
        description: "Email này đã được đăng ký !",
      });
    } else {
      const options = {
        ...values,
        token: generateToken(20),
      };
      const result = await register(options);
      if (result) {
        api["success"]({
          message: <h3>Chúc mừng !</h3>,
          description: "Bạn đã đăng ký thành công !",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        api["error"]({
          message: <h3>Xin lỗi !</h3>,
          description: "Vui lòng thử lại trong giây lát !",
        });
      }
    }
    setLoading(!loading);
  };

  return (
    <div className="container">
      {contextHolder}
      <div className="register">
        <Spin spinning={loading}>
          <Form onFinish={handleSubmit} className="register-form">
            <h2>Register</h2>
            <Form.Item name="fullName" rules={rules}>
              <Input className="register-form__input" placeholder="Your name" />
            </Form.Item>
            <Form.Item name="email" rules={rules}>
              <Input
                className="register-form__input"
                placeholder="Your email..."
              />
            </Form.Item>
            <Form.Item name="password" rules={rules}>
              <Input
                type="password"
                className="register-form__input"
                placeholder="Your password..."
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                className="register-form__btn"
                type="primary"
              >
                Register
              </Button>
            </Form.Item>
            <p>
              Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </p>
          </Form>
        </Spin>
      </div>
    </div>
  );
}

export default LoginPage;
