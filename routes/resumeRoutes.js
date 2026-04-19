const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { uploadResume, getResumeResult } = require("../controllers/resumeController");
const verifyAuth = require("../middlewares/authMiddleware");

// ================= MULTER SETUP =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./resume-parser-master/resumeFiles/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and DOCX allowed"), false);
    }
  },
});

// ================= ROUTES =================

// Upload resume — protected, links to logged-in user
router.post("/upload", verifyAuth, upload.single("resume"), uploadResume);

// Get latest analysis result — protected, returns user's own resume data
router.get("/result", verifyAuth, getResumeResult);

module.exports = router;
