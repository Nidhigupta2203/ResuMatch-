const User = require("../models/usermodel");
const { encrypt, decrypt } = require("../utils/encryption");

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const body = { ...req.body };

    // Map frontend field names → DB field names
    if (body.firstName !== undefined) { body.firstname = body.firstName; delete body.firstName; }
    if (body.lastName !== undefined)  { body.lastname  = body.lastName;  delete body.lastName;  }
    if (body.phone !== undefined)     { body.mobileNumber = body.phone;  delete body.phone;     }
    if (body.summary !== undefined)   { body.objective  = body.summary;  delete body.summary;   }
    if (body.location !== undefined)  { body.address    = body.location; delete body.location;  }

    // Encrypt sensitive fields
    if (body.email)        body.email        = encrypt(body.email);
    if (body.mobileNumber) body.mobileNumber = encrypt(body.mobileNumber);
    if (body.address)      body.address      = encrypt(body.address);

    // Prevent overwriting password/auth fields
    delete body.password;
    delete body.username;
    delete body.mfaSecret;
    delete body.mfaEnabled;

    const user = await User.findByIdAndUpdate(req.user.userId, body, {
      new: true,
      runValidators: false,
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ success: true, message: "Profile updated" });
  } catch (err) {
    console.error("Update profile error:", err.message);
    res.status(400).json({ message: err.message });
  }
};

// safe decrypt helper
const safeDecrypt = (val) => {
  if (!val || typeof val !== "string" || !val.includes(":")) return val || "";
  try { return decrypt(val); } catch { return ""; }
};

// GET PROFILE
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).lean();

    if (!user) return res.status(404).json({ message: "User not found" });

    const data = {
      ...user,
      // Map DB field names → frontend field names
      firstName: user.firstname || "",
      lastName:  user.lastname  || "",
      phone:     safeDecrypt(user.mobileNumber),
      summary:   safeDecrypt(user.objective),
      location:  safeDecrypt(user.address),
      email:     safeDecrypt(user.email),
    };

    res.json(data);
  } catch (err) {
    console.error("Get profile error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { updateProfile, getProfile };
