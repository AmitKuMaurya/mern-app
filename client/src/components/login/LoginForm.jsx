import React, { useState, useEffect } from "react";
import "./index.css";
import { Form, Input, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user/action.user";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../redux/product/action.product";
const LoginForm = () => {
  const [email, setEmail] = useState();

  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(login(email, password));
    dispatch(getProducts(JSON.parse(localStorage.getItem("token") || null)))
    navigate('/');
  };

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem("token") || null);
    if(token) return navigate('/');
    console.log(token);
  },[navigate,dispatch])

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            onChange={(e) => setEmail(e.target.value)}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            onChange={(e) => setPassword(e.target.value)}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a
            style={{ color: "#F0F01A" }}
            className="login-form-forgot"
            href="/login"
          >
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <button
            style={{
              padding: "10px 15px",
              border: "0px",
              fontSize: "17px",
              backgroundColor: "#f7f663",
              cursor: "pointer",
            }}
            onClick={() => handleLogin()}
            type="submit"
            className="login-form-button"
          >
            Log in
          </button>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
