const College = require("../models/colleges");

const searchColleges = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.length < 2) {
      return res.json([]);
    }

    const colleges = await College.find({
      name: { $regex: query, $options: "i" },
    })
      .limit(10)
      .select("name -_id");

    res.json(colleges);
  } catch (err) {
    console.error("College search error:", err.message);
   res.status(500).json({
     message: err.message,
     stack: err.stack,
   });
  }
};

module.exports = { searchColleges };
