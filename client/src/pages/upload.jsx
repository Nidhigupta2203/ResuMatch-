import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../resources/upload.css";
import swal from "sweetalert";
import Header from "../components/Header";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { CloudUpload, Assessment } from "@mui/icons-material";

function FileUpload() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  /* FILE SELECT */
  const handleChange = (e) => {
    const selected = e.target.files[0];

    if (
      selected &&
      (selected.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        selected.type === "application/pdf")
    ) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Only .docx and .pdf files are supported");
    }
  };

  /* DRAG EVENTS */
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        droppedFile.type === "application/pdf")
    ) {
      setFile(droppedFile);
      setError("");
    } else {
      setError("Only .docx and .pdf files are supported");
    }
  };

  /* UPLOAD */
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file first");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to upload your resume");
      navigate("/login");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch("http://localhost:5000/api/resume/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        await swal(
          "Uploaded! 🚀",
          "Your resume has been parsed and stored securely. Redirecting to analysis...",
          "success"
        );
        // Auto-navigate to result / analysis page
        navigate("/result");
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err.message);
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Header />

      <Container className="upload-container py-5 mt-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="text-center mb-5">
              <h1 className="display-5 mb-3">ResuMatch Analyzer</h1>
              <p className="lead text-muted">
                Upload your PDF or DOCX resume and get instant ATS insights
              </p>
            </div>

            <Form onSubmit={handleUpload}>
              <div
                className={`upload-area ${isDragging ? "dragging" : ""} ${
                  file ? "has-file" : ""
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Form.Control
                  type="file"
                  onChange={handleChange}
                  accept=".docx,.pdf"
                  className="file-input"
                />

                <div className="upload-content">
                  <CloudUpload className="upload-icon" />

                  <p className="upload-text">
                    {file
                      ? file.name
                      : "Drag & drop your resume or click to upload"}
                  </p>

                  <p className="upload-hint">
                    Supported formats: .pdf, .docx (Max 5MB)
                  </p>
                </div>
              </div>

              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}

              <div className="d-flex justify-content-center gap-3 mt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={!file || uploading}
                >
                  <CloudUpload className="me-2" />
                  {uploading ? "Uploading & Parsing..." : "Upload Resume"}
                </Button>

                <Button
                  variant="outline-primary"
                  size="lg"
                  onClick={() => navigate("/result")}
                >
                  <Assessment className="me-2" />
                  View Last Analysis
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FileUpload;
