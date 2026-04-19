require("dotenv").config();
const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

const College = require("../models/colleges");

// ✅ Connect DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  }
};

// ✅ Seed Function
const seedColleges = async () => {
  try {
    const filePath = path.join(__dirname, "../data/colleges.csv"); // ✅ updated path

    const colleges = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (row.name && row.name.length > 3) {
          // clean unwanted characters
          const cleanName = row.name.replace(/"/g, "").trim();

          // skip junk data
          if (cleanName && !cleanName.toLowerCase().includes("professional")) {
            colleges.push({ name: cleanName });
          }
        }
      })
      .on("end", async () => {
        try {
          // ✅ remove duplicates
          const uniqueColleges = [
            ...new Map(colleges.map((item) => [item.name, item])).values(),
          ];

          // ✅ clear old data
          await College.deleteMany();

          // ✅ insert cleaned data
          await College.insertMany(uniqueColleges);

          console.log(
            `🎉 Successfully inserted ${uniqueColleges.length} colleges`,
          );

          process.exit();
        } catch (err) {
          console.error("❌ Insert error:", err.message);
          process.exit(1);
        }
      })
      .on("error", (err) => {
        console.error("❌ File read error:", err.message);
        process.exit(1);
      });
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

// ✅ Run script
connectDB().then(seedColleges);
