import React, { useState } from "react";
async function Score() {
  let score = 0;
  let positives = [];
  let suggestions = [];

  try {
    const [value, setValue] = useState("");
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const res = await fetch(
      `${apiUrl}/api/colleges?query=${value}`,
    );
    const data = await res.json();

    const has = (field) => field && field.toString().trim().length > 0;

    /* OBJECTIVE */
    if (has(data.objective)) {
      score += 8;
      positives.push("Strong objective statement present");
    } else {
      suggestions.push("Add a clear career objective to define your goals");
    }

    /* SKILLS */
    if (has(data.skills)) {
      score += 12;
      positives.push("Skills section is well defined");
    } else {
      suggestions.push("Include key technical and soft skills");
    }

    /* PROJECTS */
    if (has(data.projects)) {
      score += 18;
      positives.push("Projects showcase practical experience");
    } else {
      suggestions.push("Add 1-2 strong projects with description");
    }

    /* EXPERIENCE */
    if (has(data.experience || data.workexperience)) {
      score += 20;
      positives.push("Work experience adds strong credibility");
    } else {
      suggestions.push("Include internships or work experience");
    }

    /* EDUCATION */
    if (has(data.education || data.Education)) {
      score += 8;
      positives.push("Education details are included");
    } else {
      suggestions.push("Mention your education background clearly");
    }

    /* CERTIFICATIONS */
    if (
      has(data.courses) ||
      has(data.certifications) ||
      has(data.certification)
    ) {
      score += 6;
      positives.push("Certifications strengthen your profile");
    } else {
      suggestions.push("Add relevant certifications or courses");
    }

    /* CONTACT INFO */
    if (has(data.email)) {
      score += 5;
      positives.push("Contact email is provided");
    } else {
      suggestions.push("Add a professional email address");
    }

    /* PROFILE LINKS */
    if (has(data.profiles || data.profile)) {
      score += 10;
      positives.push("Professional profile links included");
    } else {
      suggestions.push("Add LinkedIn or portfolio links");
    }

    /* EXTRA SECTIONS */
    if (has(data.interests) || has(data.achievements) || has(data.activities)) {
      score += 5;
      positives.push("Extra sections add personality to resume");
    } else {
      suggestions.push("Include interests or achievements");
    }

    /* FINAL SCORE NORMALIZATION */
    const maxScore = 92;
    score = Math.min(100, Math.floor((score / maxScore) * 100));

    return {
      score,
      positives,
      suggestions,
    };
  } catch (err) {
    console.error("Score Error:", err);

    return {
      score: 0,
      positives: [],
      suggestions: ["Unable to analyze resume. Try again."],
    };
  }
}

export default Score;
