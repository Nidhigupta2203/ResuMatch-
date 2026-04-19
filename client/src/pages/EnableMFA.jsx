import React, { useEffect, useState } from "react";
import { Button, Input, message, Spin, Card, Typography } from "antd";
import axios from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

function EnableMFA() {
  const [qrCode, setQrCode] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (!username) {
      message.error("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    const getQRCode = async () => {
      try {
        const { data } = await axios.post("/api/user/enable-mfa", {
          username,
        });

        setQrCode(data.qrCode);
      } catch (err) {
        message.error("Unable to initialize MFA setup");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    getQRCode();
  }, [navigate]);

  const handleVerify = async () => {
        const username = localStorage.getItem("username");
    if (!otp || otp.length !== 6) {
      return message.warning("Enter valid 6-digit code");
    }

    setVerifying(true);

    try {
      await axios.post("/api/user/verify-mfa", {
        username,
        token: otp,
      });

      message.success("MFA activated successfully 🎉");

      localStorage.removeItem("username");
      navigate("/login");
    } catch (err) {
      message.error("Invalid code. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        {loading ? (
          <Spin size="large" />
        ) : (
          <Card
            style={{
              maxWidth: 420,
              margin: "auto",
              textAlign: "center",
              borderRadius: "16px",
            }}
            bordered={false}
          >
            <Title level={3}>🔐 ResuMatch Security Setup</Title>

            <Paragraph>
              Secure your account with multi-factor authentication. Scan the QR
              code using Google Authenticator and enter the code below.
            </Paragraph>

            <img
              src={qrCode}
              alt="QR Code"
              style={{
                width: 200,
                margin: "1rem auto",
                display: "block",
                borderRadius: "10px",
              }}
            />

            <Input
              placeholder="Enter OTP"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{
                marginBottom: "1rem",
                textAlign: "center",
                fontSize: "16px",
              }}
            />

            <Button
              type="primary"
              block
              size="large"
              onClick={handleVerify}
              loading={verifying}
              disabled={otp.length !== 6}
            >
              Verify & Continue
            </Button>

            <p
              style={{ marginTop: "10px", fontSize: "12px", color: "#94a3b8" }}
            >
              This adds an extra layer of security to your account.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

export default EnableMFA;
