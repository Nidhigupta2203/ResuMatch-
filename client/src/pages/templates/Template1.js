import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  LinkedinOutlined,
  MailOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import "../../resources/templates.css";
import { useProfile } from "../../utils/useProfile";

const Template1 = () => {
  const { user, loading } = useProfile();

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading your resume...</div>;

  if (!user) return null;

  return (
    <div className="template1-parent">
      {/* HEADER */}
      <div className="header1 text-center" style={{ padding: "8px 15px", marginBottom: "10px" }}>
        <h2 className="mb-0" style={{ color: "#f8fafc", fontSize: "1.6rem" }}>
          {user.firstname?.toUpperCase()} {user.lastname?.toUpperCase()}
        </h2>

        <div className="d-flex justify-content-center flex-wrap mt-1 header-contact" style={{ fontSize: "0.85rem", gap: "10px", rowGap: "0" }}>
          {user.email && (
            <span className="d-flex align-items-center">
              <MailOutlined className="me-1"/> {user.email}
            </span>
          )}
          {user.mobileNumber && (
            <span className="d-flex align-items-center">
              <MobileOutlined className="me-1"/> {user.mobileNumber}
            </span>
          )}
          {user.portfolio && (
            <span className="d-flex align-items-center">
              <LinkedinOutlined className="me-1"/> 
              <a href={user.portfolio.startsWith('http') ? user.portfolio : `https://${user.portfolio}`} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>LinkedIn</a>
            </span>
          )}
          {user.address && <span className="d-flex align-items-center">{user.address}</span>}
        </div>
      </div>

      {/* OBJECTIVE */}
      {user.objective && (
        <section className="mb-2">
          <h4>Professional Summary</h4>
          <p>{user.objective}</p>
        </section>
      )}

      {user.experience?.length > 0 && (
        <section className="mb-2">
          <h4>Professional Experience</h4>
          {user.experience.map((exp, i) => (
            <div key={i} className="mb-1">
              <div className="d-flex justify-content-between">
                <b>{exp.designation} — {exp.company}</b>
                <span>{exp.range}</span>
              </div>
              <p className="mt-1">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {user.education?.length > 0 && (
        <section className="mb-2">
          <h4>Education</h4>
          {user.education.map((edu, i) => (
            <div key={i} className="mb-3 d-flex justify-content-between">
              <div>
                <b>{edu.qualification}</b> in {edu.course}
                <br /> {edu.institution}
              </div>
              <div className="text-end">
                <span>{edu.year || edu.range}</span>
                <br /> <span>{edu.percentage}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {user.projects?.length > 0 && (
        <section className="mb-2">
          <h4>Projects</h4>
          {user.projects.map((proj, i) => (
            <div key={i} className="mb-1">
              <div className="d-flex justify-content-between align-items-center">
                <b style={{ color: "#0f172a" }}>{proj.title}</b>
                {proj.link && (
                  <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", fontWeight: "600", color: "#2563eb" }}>Project Link</a>
                )}
              </div>
              {proj.techstack && <div style={{ fontSize: "0.85rem", color: "#475569", fontStyle: "italic" }}><b>Tech Stack:</b> {proj.techstack}</div>}
              <ul className="mt-1 ps-3 mb-1">
                {(proj.description || "").split("\n").map((line, idx) => (
                  line.trim() ? <li key={idx} className="mb-0">{line}</li> : null
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {user.skills?.length > 0 && (
        <section className="mb-2">
          <h4>Skills</h4>
          <div className="d-flex flex-wrap gap-4 mt-2">
            {user.skills.map((s, i) => (
              <span key={i}>
                <b>{s.technology}</b>
              </span>
            ))}
          </div>
        </section>
      )}

      {user.certificates?.length > 0 && (
        <section className="mb-2">
          <h4>Certifications</h4>
          {user.certificates.map((c, i) => (
            <div key={i} className="mb-1">
              <b style={{ color: "#0f172a" }}>{c.name}</b> — <span>
                {c.credential && c.credential.startsWith("http") ? (
                  <a href={c.credential} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", fontWeight: "500" }}>View Credential</a>
                ) : (
                  c.credential
                )}
              </span>
            </div>
          ))}
        </section>
      )}
      
      {user.courses?.length > 0 && (
        <section className="mb-2">
          <h4>Courses</h4>
          <ul className="mb-0 ps-3">
            {user.courses.map((c, i) => (
              <li key={i} className="mb-1">
                <b>{c.name}</b> – {c.organization}
              </li>
            ))}
          </ul>
        </section>
      )}

      {user.interests?.length > 0 && (
        <section className="mb-2">
          <h4>Interests</h4>
          <div className="d-flex flex-wrap gap-3 mt-2">
            {user.interests.map((i, index) => (
              <span key={index}>• {i.interests}</span>
            ))}
          </div>
        </section>
      )}

      {user.cocurricular?.length > 0 && (
        <section className="mb-2">
          <h4>Extracurricular Activities</h4>
          <ul className="mb-0 ps-3">
            {user.cocurricular.map((a, i) => (
              <li key={i} className="mb-1">
                {a.description}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Template1;
