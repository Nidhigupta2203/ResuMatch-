const ResumeParser = require("../resume-parser-master/src");
const path = require("path");
const resumeData = require("../models/resume");
const { encrypt, decrypt } = require("../utils/encryption");

// ================= UPLOAD & PARSE =================
const { PDFParse } = require("pdf-parse");
const mammoth = require("mammoth");
const fs = require("fs");

// ─────────────────────────────────────────────
// Helper: extract structured fields from raw text
// ─────────────────────────────────────────────
function extractStructuredData(rawText) {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  // EMAIL
  const emailMatch = rawText.match(
    /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/
  );
  const email = emailMatch ? emailMatch[0] : "";

  // PHONE
  const phoneMatch = rawText.match(
    /(\+?\d[\d\s\-().]{8,14}\d)/
  );
  const phone = phoneMatch ? phoneMatch[0].replace(/\s+/g, "") : "";

  // NAME — first non-empty line that doesn't look like a heading/section label
  const skipWords = /^(education|experience|skills|projects|summary|objective|certifications?|interests?|profile|contact|phone|email|address|linkedin|github)\b/i;
  let name = "";
  for (const line of lines) {
    if (line.length > 2 && line.length < 60 && !skipWords.test(line) && !/\d/.test(line.slice(0, 10))) {
      name = line;
      break;
    }
  }

  // SUMMARY / OBJECTIVE
  const summaryKeywords = /summary|objective|profile|about me/i;
  const experienceKeywords = /experience|employment|work history|internship/i;
  const educationKeywords = /education|academic|qualification/i;
  const skillsKeywords = /skills|technologies|technical/i;
  const projectsKeywords = /projects?|work sample/i;
  const certKeywords = /certif|award|achievement/i;

  const extractSection = (startRx, endRxList) => {
    let capture = false;
    const collected = [];
    for (const line of lines) {
      if (startRx.test(line)) { capture = true; continue; }
      if (capture) {
        if (endRxList.some((rx) => rx.test(line))) break;
        collected.push(line);
      }
    }
    return collected.join(" ").trim();
  };

  const summary = extractSection(summaryKeywords, [
    experienceKeywords, educationKeywords, skillsKeywords, projectsKeywords,
  ]);

  const experience = extractSection(experienceKeywords, [
    educationKeywords, skillsKeywords, projectsKeywords, summaryKeywords,
  ]);

  const education = extractSection(educationKeywords, [
    experienceKeywords, skillsKeywords, projectsKeywords, summaryKeywords,
  ]);

  const skills = extractSection(skillsKeywords, [
    experienceKeywords, educationKeywords, projectsKeywords, summaryKeywords,
  ]);

  const projects = extractSection(projectsKeywords, [
    experienceKeywords, educationKeywords, skillsKeywords, summaryKeywords, certKeywords,
  ]);

  const certification = extractSection(certKeywords, [
    projectsKeywords, experienceKeywords, educationKeywords, skillsKeywords,
  ]);

  return { name, email, phone, summary, experience, education, skills, projects, certification };
}

// ─────────────────────────────────────────────
// UPLOAD RESUME
// ─────────────────────────────────────────────
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const outputPath = `./resume-parser-master/resumeFiles/compiled`;
    const fileType = req.file.mimetype;
    const userId = req.user ? req.user.userId : null;

    let resume = {};

    // ================= PDF =================
    if (fileType.includes("pdf")) {
      try {
        const dataBuffer = fs.readFileSync(filePath);

        // pdf-parse v2: instantiate PDFParse with { data, verbosity }
        const parser = new PDFParse({ data: dataBuffer, verbosity: 0 });
        const result = await parser.getText();

        // result.text may be an array of page objects or a string
        let rawText = "";
        if (Array.isArray(result.text)) {
          rawText = result.text.map((p) => (typeof p === "string" ? p : p.text || "")).join("\n");
        } else {
          rawText = result.text || "";
        }

        console.log("PDF text extracted, length:", rawText.length);

        // Use structured extractor
        resume = extractStructuredData(rawText);

        console.log("Structured PDF data:", {
          name: resume.name,
          email: resume.email,
          phone: resume.phone,
          skillsLen: resume.skills?.length,
          expLen: resume.experience?.length,
        });
      } catch (pdfErr) {
        console.error("PDF parse error:", pdfErr.message);
        return res.status(500).json({
          success: false,
          message: "Error reading PDF file: " + pdfErr.message,
        });
      }
    }

    // ================= DOCX =================
    else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      try {
        // Try native mammoth plain text first for structured extraction
        const { value: rawText } = await mammoth.extractRawText({ path: filePath });

        if (rawText && rawText.length > 50) {
          resume = extractStructuredData(rawText);
        } else {
          // Fall back to resume-parser JSON
          await ResumeParser.parseResumeFile(filePath, outputPath);
          const jsonPath = `${outputPath}/${req.file.filename}.json`;

          if (!fs.existsSync(jsonPath)) {
            return res.status(500).json({ message: "DOCX parsing failed: JSON not generated" });
          }

          const resumeJson = fs.readFileSync(jsonPath);
          resume = JSON.parse(resumeJson);
        }
      } catch (docxErr) {
        console.error("DOCX parse error:", docxErr.message);
        return res.status(500).json({
          success: false,
          message: "Error reading DOCX file: " + docxErr.message,
        });
      }
    }

    // ================= INVALID =================
    else {
      return res.status(400).json({ success: false, message: "Unsupported file type" });
    }

    // ================= SAVE TO DB =================
    const newResume = new resumeData({
      userId,
      name:          resume.name          ? encrypt(resume.name)                    : "",
      email:         resume.email         ? encrypt(resume.email)                   : "",
      phone:         resume.phone         ? encrypt(resume.phone)                   : "",
      skills:        resume.skills        ? encrypt(JSON.stringify(resume.skills))  : "",
      experience:    resume.experience    ? encrypt(resume.experience)              : "",
      education:     resume.education     ? encrypt(resume.education)               : "",
      projects:      resume.projects      ? encrypt(resume.projects)                : "",
      interests:     resume.interests     ? encrypt(resume.interests)               : "",
      certification: resume.certification ? encrypt(resume.certification)           : "",
      objective:     resume.objective     ? encrypt(resume.objective)               : "",
      summary:       resume.summary       ? encrypt(resume.summary)                 : "",
      technology:    resume.technology    ? encrypt(resume.technology)              : "",
      languages:     resume.languages     ? encrypt(resume.languages)               : "",
      links:         resume.links         ? encrypt(resume.links)                   : "",
      contacts:      resume.contacts      ? encrypt(resume.contacts)                : "",
      positions:     resume.positions     ? encrypt(resume.positions)               : "",
      profiles:      resume.profiles      ? encrypt(resume.profiles)                : "",
      awards:        resume.awards        ? encrypt(resume.awards)                  : "",
      honors:        resume.honors        ? encrypt(resume.honors)                  : "",
      additional:    resume.additional    ? encrypt(resume.additional)              : "",
      courses:       resume.courses       ? encrypt(resume.courses)                 : "",
    });

    await newResume.save();

    res.json({
      success: true,
      message: "Resume uploaded & parsed successfully",
      parsed: {
        hasName:    !!resume.name,
        hasEmail:   !!resume.email,
        hasPhone:   !!resume.phone,
        hasSkills:  !!resume.skills,
        hasExp:     !!resume.experience,
        hasEdu:     !!resume.education,
        hasProjects:!!resume.projects,
      },
    });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};

// ─────────────────────────────────────────────
// GET RESUME RESULT (per authenticated user)
// ─────────────────────────────────────────────
const safeDecrypt = (val) => {
  if (!val || typeof val !== "string") return "";
  try { return decrypt(val); } catch { return val; }
};

const getResumeResult = async (req, res) => {
  try {
    const userId = req.user ? req.user.userId : null;

    // Prefer user's own latest resume; fall back to global latest
    const query = userId ? { userId } : {};
    const latestResume = await resumeData.findOne(query).sort({ createdAt: -1 });

    if (!latestResume) {
      return res.status(404).json({ message: "No resume found. Please upload your resume first." });
    }

    const resume = latestResume.toObject();

    // Decrypt all string fields
    const decrypted = {};
    Object.keys(resume).forEach((key) => {
      if (typeof resume[key] === "string" && resume[key].includes(":")) {
        decrypted[key] = safeDecrypt(resume[key]);
      } else {
        decrypted[key] = resume[key];
      }
    });

    // ================= SCORE LOGIC =================
    let score = 0;
    const positives = [];
    const suggestions = [];

    const has = (field) => field && field.toString().trim().length > 5;
    const hasRich = (field) => field && field.toString().trim().length > 30;

    // Contact Info (Name + Email + Phone) — 15 pts
    if (has(decrypted.name)) {
      score += 5;
      positives.push("Your name is clearly identified");
    } else {
      suggestions.push("Make sure your full name is at the top of the resume");
    }

    if (has(decrypted.email)) {
      score += 5;
      positives.push("Professional email address is present");
    } else {
      suggestions.push("Add a professional email address");
    }

    if (has(decrypted.phone)) {
      score += 5;
      positives.push("Phone number is included");
    } else {
      suggestions.push("Add a contact phone number");
    }

    // Skills — 20 pts
    if (hasRich(decrypted.skills)) {
      score += 20;
      positives.push("Strong skills section with relevant technologies");
    } else {
      suggestions.push("Add more relevant technical and soft skills");
    }

    // Experience — 20 pts
    if (hasRich(decrypted.experience)) {
      score += 20;
      positives.push("Work experience section is well structured");
    } else {
      suggestions.push("Include work experience, internships, or roles");
    }

    // Education — 15 pts
    if (hasRich(decrypted.education)) {
      score += 15;
      positives.push("Education background is clearly documented");
    } else {
      suggestions.push("Add your educational qualifications and institution");
    }

    // Projects — 15 pts
    if (hasRich(decrypted.projects)) {
      score += 15;
      positives.push("Projects section showcases your practical skills");
    } else {
      suggestions.push("Add 1–3 strong projects with descriptions and tech used");
    }

    // Summary / Objective — 10 pts
    if (hasRich(decrypted.summary) || hasRich(decrypted.objective)) {
      score += 10;
      positives.push("Professional summary gives a strong first impression");
    } else {
      suggestions.push("Write a 2–3 sentence professional summary or objective");
    }

    // Certifications — bonus 5 pts (capped at 100)
    if (has(decrypted.certification)) {
      score += 5;
      positives.push("Certifications add credibility to your profile");
    } else {
      suggestions.push("Consider adding certifications (e.g., AWS, Google, Coursera)");
    }

    score = Math.min(100, score);

    // Grade label
    let grade, gradeMsg;
    if (score >= 85)      { grade = "Excellent"; gradeMsg = "Your resume is highly ATS-optimized!"; }
    else if (score >= 65) { grade = "Good";      gradeMsg = "A few improvements can boost your chances significantly."; }
    else if (score >= 45) { grade = "Average";   gradeMsg = "Work on the suggestions below to improve your score."; }
    else                  { grade = "Needs Work"; gradeMsg = "Focus on completing all key resume sections."; }

    // ================= RESPONSE =================
    res.json({
      score,
      grade,
      gradeMsg,
      positives,
      suggestions,
      parsedFields: {
        name:    decrypted.name    || "",
        email:   decrypted.email   || "",
        phone:   decrypted.phone   || "",
      },
    });
  } catch (err) {
    console.error("Result error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  uploadResume,
  getResumeResult,
};
