const jwt = require("jsonwebtoken");
const logger = require("../logger");
require("dotenv").config();

const verifyAuth = (req, res, next) => {
  try {
    // Support both cookies and headers (more flexible)
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      logger.warn("Auth failed: token missing", {
        ip: req.ip,
        route: req.originalUrl,
      });

      return res.status(401).json({
        success: false,
        message: "Access denied. Please login first.",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Optional: attach only required data
    req.user = {
      userId: decoded.userId,
      username: decoded.username,
      email: decoded.email,
    };

    next();
  } catch (err) {
    // Handle specific JWT errors differently
    if (err.name === "TokenExpiredError") {
      logger.warn("Expired token attempt", { ip: req.ip });

      return res.status(401).json({
        success: false,
        message: "Session expired. Login again.",
      });
    }

    logger.error("JWT verification failed", {
      error: err.message,
      ip: req.ip,
    });

    return res.status(403).json({
      success: false,
      message: "Invalid authentication token",
    });
  }
};

module.exports = verifyAuth;
