import React, { useEffect, useState } from "react";
import "./../resources/authentication.css";
import { Button, Form, Input, message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";

function Login() {
  const [loading, setLoading] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState(null);
  const [rateLimitTimer, setRateLimitTimer] = useState(null);
  const [mfaRequired, setMfaRequired] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);

    try {
      const { data } = await axios.post("/api/user/login", {
        username: values.username,
        password: values.password,
        otp: mfaRequired ? otp : undefined,
      });

      message.success("Welcome to ResuMatch 🚀");

      // ✅ Store auth properly
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      // reset MFA state
      setMfaRequired(false);
      setOtp("");

      navigate("/");
    } catch (error) {
      if (!error.response) {
        message.error("Server not responding. Try again later.");
        return;
      }

      const status = error.response.status;
      const msg = error.response.data?.message || "Login failed";

      if (msg === "OTP is required for MFA") {
        setMfaRequired(true);
        message.info("Enter OTP from authenticator app");
        return;
      }

      if (status === 403) {
        const time = parseInt(msg.match(/\d+/)?.[0]) * 60;
        if (!isNaN(time)) setLockoutTimer(time);
        message.error("Account temporarily locked");
      } else if (status === 429) {
        const retry = parseInt(error.response.data?.retryAfter) || 120;
        setRateLimitTimer(retry);
        message.warning("Too many attempts. Try again later.");
      } else {
        message.error("Invalid username or password");
      }
    } finally {
      setLoading(false);
    }
  };

 
  /* Timers */
  useEffect(() => {
    if (!lockoutTimer) return;
    const interval = setInterval(() => {
      setLockoutTimer((prev) => (prev > 1 ? prev - 1 : null));
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  useEffect(() => {
    if (!rateLimitTimer) return;
    const interval = setInterval(() => {
      setRateLimitTimer((prev) => (prev > 1 ? prev - 1 : null));
    }, 1000);
    return () => clearInterval(interval);
  }, [rateLimitTimer]);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const isDisabled = lockoutTimer || rateLimitTimer;

  return (
    <div className="login-page">
      <div className="login-box">
        {loading && <Spin size="large" />}

        <Form name="login-form" onFinish={handleLogin}>
          <p className="form-title">Welcome to ResuMatch</p>
          <p className="subtitle">Login to analyze your resume</p>

          <Form.Item
            name="username"
            rules={[{ required: true, message: "Enter username" }]}
          >
            <Input placeholder="Username" disabled={isDisabled} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Enter password" }]}
          >
            <Input.Password placeholder="Password" disabled={isDisabled} />
          </Form.Item>

          {mfaRequired && (
            <Form.Item
              name="otp"
              rules={[{ required: true, message: "Enter OTP" }]}
            >
              <Input
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Item>
          )}

          {lockoutTimer && (
            <p style={{ color: "red" }}>
              Locked for {Math.floor(lockoutTimer / 60)}:
              {(lockoutTimer % 60).toString().padStart(2, "0")}
            </p>
          )}

          {rateLimitTimer && (
            <p style={{ color: "orange" }}>
              Retry in {Math.floor(rateLimitTimer / 60)}:
              {(rateLimitTimer % 60).toString().padStart(2, "0")}
            </p>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={isDisabled}
            >
              Login
            </Button>

            <div style={{ marginTop: "10px" }}>
              New here? <Link to="/register">Create account</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
