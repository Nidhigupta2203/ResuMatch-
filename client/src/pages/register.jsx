import React, { useEffect, useState } from "react";
import "./../resources/authentication.css";
import { Button, Checkbox, Form, Input, message, Modal, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";

function Register() {
  const [loading, setLoading] = useState(false);
  const [showMfaModal, setShowMfaModal] = useState(false);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (values) => {
    setLoading(true);

    try {
      await axios.post("/api/user/register", {
        username: values.username,
        password: values.password,
      });

      message.success("Account created successfully 🎉");

      setUsername(values.username);
      setShowMfaModal(true);
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
     const token = localStorage.getItem("token");
     if (token) navigate("/");
  }, [navigate]);

  return (
    <div className="login-page">
      <div className="login-box">
        {loading && <Spin size="large" />}

        <Form onFinish={handleRegister}>
          <p className="form-title">Create ResuMatch Account</p>
          <p className="subtitle">Start analyzing your resume smarter 🚀</p>

          <Form.Item
            name="username"
            rules={[{ required: true, message: "Enter username" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Enter password" },
              {
                pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?]).{8,}$/,
                message:
                  "Min 8 chars, include uppercase, number & special character",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Confirm password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match");
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={loading}>
              Create Account
            </Button>

            <div style={{ marginTop: "10px" }}>
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </Form.Item>
        </Form>

        {/* MFA MODAL */}
        <Modal
          open={showMfaModal}
          title="🔐 Secure Your Account"
          onCancel={() => navigate("/login")}
          footer={[
            <Button key="skip" onClick={() => navigate("/login")}>
              Skip
            </Button>,
            <Button
              key="enable"
              type="primary"
              onClick={() => {
                localStorage.setItem("username", username);
                navigate("/enable-mfa");
              }}
            >
              Enable MFA
            </Button>,
          ]}
        >
          <p>
            Add an extra layer of security by enabling Multi-Factor
            Authentication. You’ll need a 6-digit code from an authenticator app
            while logging in.
          </p>
        </Modal>
      </div>
    </div>
  );
}

export default Register;
