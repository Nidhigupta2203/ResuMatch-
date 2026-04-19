const express = require("express");
const router = express.Router();

const { searchColleges } = require("../controllers/collegeController");

router.get("/", searchColleges);

module.exports = router;
