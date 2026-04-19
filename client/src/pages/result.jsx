import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Analytics, Description } from "@mui/icons-material";
import { CheckCircle, AlertTriangle, User, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import "../resources/result.css";
import axios from "../utils/axiosConfig";

function Result() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [grade, setGrade] = useState("");
  const [gradeMsg, setGradeMsg] = useState("");
  const [positives, setPositives] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [parsedFields, setParsedFields] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get("/api/resume/result");

      setScore(data.score || 0);
      setGrade(data.grade || "");
      setGradeMsg(data.gradeMsg || "");
      setPositives(data.positives || []);
      setSuggestions(data.suggestions || []);
      setParsedFields(data.parsedFields || null);

      setShowResult(true);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to analyze resume. Please upload your resume first.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const scoreColor =
    score >= 85 ? "#22c55e" : score >= 65 ? "#6366f1" : score >= 45 ? "#f59e0b" : "#ef4444";

  return (
    <div className="result-page">
      <Header />

      <Container className="mt-5 pt-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Button
              variant="link"
              className="back-button mb-4"
              onClick={() => navigate("/upload")}
            >
              <ArrowLeft className="me-2" />
              Back to Upload
            </Button>

            <AnimatePresence>
              {!showResult ? (
                <motion.div
                  className="result-content text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="mb-3" style={{ color: "#e2e8f0" }}>
                    Resume Analysis
                  </h2>
                  <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
                    Click below to analyze your uploaded resume and receive a
                    detailed ATS score with personalized suggestions.
                  </p>
                  <Button
                    size="lg"
                    className="get-results-button"
                    onClick={handleAnalyze}
                    disabled={loading}
                  >
                    <Analytics className="me-2" />
                    {loading ? "Analyzing with ResuMatch AI..." : "Analyze Resume"}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  className="score-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="score-content">

                    {/* SCORE CIRCLE */}
                    <div className="score-circle-wrapper">
                      <motion.div
                        className="score-circle"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <svg viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            className="score-background"
                          />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            className="score-indicator"
                            style={{ stroke: scoreColor }}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: score / 100 }}
                            transition={{ duration: 1.5 }}
                          />
                        </svg>
                        <div className="score-value" style={{ color: scoreColor }}>
                          {score}%
                        </div>
                      </motion.div>

                      <h2>ResuMatch ATS Score</h2>
                      <p style={{ color: "#94a3b8" }}>{gradeMsg}</p>

                      {/* Grade Badge */}
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 18px",
                          borderRadius: "20px",
                          background: scoreColor,
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          marginBottom: "1rem",
                        }}
                      >
                        {grade}
                      </span>
                    </div>

                    {/* PARSED FIELDS — extracted from resume */}
                    {parsedFields && (parsedFields.name || parsedFields.email || parsedFields.phone) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          background: "rgba(99,102,241,0.08)",
                          borderRadius: "12px",
                          padding: "1rem 1.5rem",
                          marginBottom: "1.5rem",
                          border: "1px solid rgba(99,102,241,0.2)",
                        }}
                      >
                        <h5 style={{ color: "#a5b4fc", marginBottom: "0.75rem" }}>
                          📋 Extracted from your Resume
                        </h5>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                          {parsedFields.name && (
                            <span style={{ color: "#e2e8f0", display: "flex", alignItems: "center", gap: "6px" }}>
                              <User size={14} /> {parsedFields.name}
                            </span>
                          )}
                          {parsedFields.email && (
                            <span style={{ color: "#e2e8f0", display: "flex", alignItems: "center", gap: "6px" }}>
                              <Mail size={14} /> {parsedFields.email}
                            </span>
                          )}
                          {parsedFields.phone && (
                            <span style={{ color: "#e2e8f0", display: "flex", alignItems: "center", gap: "6px" }}>
                              <Phone size={14} /> {parsedFields.phone}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* POSITIVES */}
                    {positives.length > 0 && (
                      <div>
                        <h5 style={{ color: "#22c55e", marginBottom: "0.75rem" }}>✅ Strengths</h5>
                        <div className="suggestions-grid">
                          {positives.map((p, i) => (
                            <motion.div
                              key={i}
                              className="suggestion-card success"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08 }}
                            >
                              <CheckCircle />
                              <p>{p}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* SUGGESTIONS */}
                    {suggestions.length > 0 && (
                      <div style={{ marginTop: "1.5rem" }}>
                        <h5 style={{ color: "#f59e0b", marginBottom: "0.75rem" }}>💡 Improve This</h5>
                        <div className="suggestions-grid">
                          {suggestions.map((s, i) => (
                            <motion.div
                              key={i}
                              className="suggestion-card warning"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08 }}
                            >
                              <AlertTriangle />
                              <p>{s}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ACTIONS */}
                    <div className="action-buttons" style={{ marginTop: "2rem" }}>
                      <Button
                        variant="outline-primary"
                        onClick={() => navigate("/upload")}
                      >
                        Analyze Another Resume
                      </Button>

                      {/* ✅ End-to-end: navigate to template generation */}
                      <Button
                        variant="primary"
                        onClick={() => navigate("/template")}
                        style={{
                          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Description style={{ fontSize: "18px" }} />
                        Generate Resume Template
                      </Button>

                      <Button
                        variant="outline-secondary"
                        onClick={() => window.print()}
                      >
                        Download Report
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Result;
