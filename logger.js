// logger.js
require("dotenv").config();
const winston = require("winston");
require("winston-mongodb");

// 1. Define custom logging levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// 2. Define color codes for console output
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
};

winston.addColors(colors); // Enable colorization in Winston

// 3. Create main Winston logger instance
const logger = winston.createLogger({
  levels, // use custom levels
  level: "debug", // log everything from debug and up
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    // Log only errors to error.log file
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),

    // Log everything to combined.log
    new winston.transports.File({ filename: "logs/combined.log" }),

    // Log to MongoDB (collection: logs)
    // Wrapped in try/catch — if MongoDB transport loses connection it should
    // not crash the server process (ECONNRESET guard)
    (() => {
      try {
        const mongoTransport = new winston.transports.MongoDB({
          level: "http",
          db: process.env.MONGODB_URI,
          collection: "logs",
          tryReconnect: true,
        });
        // Swallow transport-level errors so the process doesn't crash
        mongoTransport.on("error", (err) => {
          console.error("[winston-mongodb] transport error (non-fatal):", err.message);
        });
        return mongoTransport;
      } catch (err) {
        console.error("[winston-mongodb] failed to init (non-fatal):", err.message);
        return null;
      }
    })(),

    // Log to console with color and formatting
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ level, message, timestamp }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
    }),
  ],
});

// 4. Stream for Morgan to write request logs into Winston
const stream = {
  write: (message) => {
    logger.http(message.trim());
  },
};

// Global safety net — prevent ECONNRESET or any other uncaught transport error
// from bringing down the entire server.
process.on("uncaughtException", (err) => {
  if (err.code === "ECONNRESET" || err.syscall === "read") {
    console.error("[uncaughtException] Suppressed non-fatal error:", err.message);
  } else {
    // Re-throw real errors so they are not silently swallowed
    console.error("[uncaughtException] Fatal error — server may be unstable:", err);
  }
});

process.on("unhandledRejection", (reason) => {
  console.error("[unhandledRejection] Non-fatal:", reason);
});

module.exports = logger;
module.exports.stream = stream;
