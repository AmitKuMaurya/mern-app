import React, { useEffect, useState } from "react";
import "../login/index.css";
import { Form, Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { register } from "../../redux/user/action.user";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phone, setPhone] = useState();
  const [name, setName] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const registerObj = {
    email : email,
    password : password,
    confirmPassword : confirmPassword,
    phone : phone,
    name : name,
    dateOfBirth : dateOfBirth,
  };

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem("token") || null);
    if(token) return navigate('/');
  },[navigate]);

  const handleSignup = () => {
    dispatch(register(registerObj));
  };



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
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input
            onChange={(e) => setName(e.target.value)}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>

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
            prefix={<MailOutlined className="site-form-item-icon" />}
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

        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please input your Confirm Password!",
            },
          ]}
        >
          <Input
            onChange={(e) => setConfirmPassword(e.target.value)}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Enter password to confirm."
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your Confirm Password!",
            },
          ]}
        >
          <Input
            onChange={(e) => setPhone(e.target.value)}
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            type="number"
            placeholder="Enter phone number."
          />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          rules={[
            {
              required: true,
              message: "Please input your Confirm Password!",
            },
          ]}
        >
          <Input
            onChange={(e) => setDateOfBirth(e.target.value)}
            prefix={<ClockCircleOutlined className="site-form-item-icon" />}
            type="date"
            placeholder="Enter date of birth"
          />
        </Form.Item>

        <Form.Item>
          <button
            style={{
              borderRadius : "10px",
              padding: "10px 15px",
              border: "0px",
              fontSize: "17px",
              backgroundColor: "#f7f663",
              cursor: "pointer",
            }}
            onClick={() => handleSignup()}
            type="submit"
            className="login-form-button"
          >
            Register
          </button>
          Or <a href="/register">Login now!</a>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignupForm;
