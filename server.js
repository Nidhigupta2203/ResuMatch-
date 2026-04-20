require("dotenv").config();
const express = require("express");
const dbConnect = require("./dbConnect");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const morgan = require("morgan");
const { morganStream } = require("./morganLogger");

// ROUTES
const collegeRoutes = require("./routes/collegeRoutes"); 
const resumeRoutes = require("./routes/resumeRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARE =================

// logging
app.use(morgan("combined", { stream: morganStream }));

// security
app.use(helmet());
app.disable("x-powered-by");

// sanitize inputs
app.use(mongoSanitize());

// body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));


// cookies
app.use(cookieParser());

// CORS (simplified but clean)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  }),
);

// ================= DB =================
dbConnect();

// ================= ROUTES =================
app.use("/api/colleges", require("./routes/collegeRoutes"));
app.use("/api/resume", require("./routes/resumeRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

 // ✅ NEW API

// test route
app.get("/", (req, res) => {
  res.send("🚀 API running...");
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});

