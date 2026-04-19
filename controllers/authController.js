const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const { encrypt, decrypt } = require("../utils/encryption");
const logger = require("../logger");

const SECRET_KEY = process.env.SECRET_KEY;

// ================= LOGIN =================
const loginUser = async (req, res) => {
  try {
    const { username, password, otp } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // MFA check
    if (user.mfaEnabled) {
      if (!otp) {
        return res.status(400).json({ message: "OTP required" });
      }

      const secret = decrypt(user.mfaSecret);

      const isValid = speakeasy.totp.verify({
        secret,
        encoding: "base32",
        token: otp,
        window: 1,
      });

      if (!isValid) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" },
    );

    res.cookie("token", token, { httpOnly: true });

    logger.info("User login success", { username });

    res.json({ message: "Login success", username, token });
  } catch (err) {
    logger.error("Login error", { err });
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
};

// ================= REGISTER =================
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Username taken" });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = new User({ username, password: hashed });
    await user.save();

    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
};

// ================= MFA =================
const enableMFA = async (req, res) => {
  const { username } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });

  const secret = speakeasy.generateSecret({
    name: `App (${username})`,
  });

  user.mfaSecret = encrypt(secret.base32);
  user.mfaEnabled = true;
  await user.save();

  const qrCode = await QRCode.toDataURL(secret.otpauth_url);

  res.json({ qrCode });
};

const verifyMFA = async (req, res) => {
  const { username, token } = req.body;

  const user = await User.findOne({ username });

  const secret = decrypt(user.mfaSecret);

  const verified = speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
    window: 1,
  });

  if (!verified) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  res.json({ message: "MFA verified" });
};

module.exports = {
  loginUser,
  registerUser,
  enableMFA,
  verifyMFA,
};
