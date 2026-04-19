import React from "react";
import { Row, Col } from "react-bootstrap";
import {
  MailOutlined,
  MobileOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "../../resources/templates.css";
import { useProfile } from "../../utils/useProfile";

function Template3() {
  const { user, loading } = useProfile();

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading your resume...</div>;

  if (!user) return null;

  return (
    <div className="template3-parent">
      {/* HEADER */}
      <div className="header3 mb-1" style={{ borderBottom: "1px solid #e5e5e5", paddingBottom: "4px" }}>
        <h2 className="mb-0" style={{ fontSize: "1.7rem", color: "#0a0a0a" }}>{user.firstname} {user.lastname}</h2>


        <div className="header-info mt-1" style={{ fontSize: "0.85rem", gap: "12px", rowGap: "0" }}>
          {user.email && (
            <span className="d-flex align-items-center"><MailOutlined className="me-1" />{user.email}</span>
          )}
          {user.mobileNumber && (
            <span className="d-flex align-items-center"><MobileOutlined className="me-1" />{user.mobileNumber}</span>
          )}
          {user.portfolio && (
            <span className="d-flex align-items-center"><LinkedinOutlined className="me-1" /><a href={user.portfolio.startsWith('http') ? user.portfolio : `https://${user.portfolio}`} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>LinkedIn</a></span>
          )}
          {user.address && <span className="d-flex align-items-center">{user.address}</span>}
        </div>
      </div>

      {/* OBJECTIVE */}
      {user.objective && (
        <section className="mb-2">
          <p style={{fontSize: "0.9rem", lineHeight: "1.3", margin: 0}}>{user.objective}</p>
        </section>
      )}

      <div className="content3 d-flex w-100">
        {/* LEFT */}
        <div className="divone pe-4">
          {user.experience?.length > 0 && (
            <section className="mb-1">
              <h4>Experience</h4>
              {user.experience.map((exp, i) => (
                <div key={i} className="mb-1">
                  <h6 className="mb-1 fw-bold fs-5">{exp.designation}</h6>
                  <p className="mb-1" style={{color: "#f59e0b", fontWeight: "600"}}>@ {exp.company}</p>
                  <p className="small mb-2 text-muted">{exp.range}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {user.education?.length > 0 && (
            <section className="mb-1">
              <h4>Education</h4>
              {user.education.map((edu, i) => (
                <div key={i} className="mb-1">
                  <h6 className="mb-1 fw-bold fs-5">{edu.qualification}</h6>
                  <p className="mb-1">{edu.institution}</p>
                  <p className="small text-muted">{edu.range}</p>
                  <p className="small">{edu.course} — {edu.percentage}</p>
                </div>
              ))}
            </section>
          )}

          {user.skills?.length > 0 && (
            <section className="mb-1">
              <h4>Skills</h4>
              <div className="d-flex flex-wrap gap-2">
                {user.skills.map((s, i) => (
                  <span key={i} style={{background: "#f3f4f6", padding: "5px 12px", borderRadius: "20px", fontSize: "0.9rem"}}>
                    {s.technology}
                  </span>
                ))}
              </div>
            </section>
          )}
          {user.certificates?.length > 0 && (
            <section className="mb-1">
              <h4>Certificates</h4>
              {user.certificates.map((c, i) => (
                <div key={i} className="mb-1">
                  <h6 className="mb-1 fw-bold fs-6">{c.name}</h6>
                  <p className="small">
                    {c.credential && c.credential.startsWith("http") ? (
                      <a href={c.credential} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>View Credential</a>
                    ) : (
                      c.credential
                    )}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* RIGHT */}
        <div className="divtwo ps-4">
          {user.projects?.length > 0 && (
            <section className="mb-1">
              <h4>Projects</h4>
              {user.projects.map((p, i) => (
                <div key={i} className="mb-1">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h6 className="mb-0 fw-bold fs-5" style={{ color: "#0a0a0a" }}>{p.title}</h6>
                    {p.link && (
                      <a href={p.link.startsWith('http') ? p.link : `https://${p.link}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", fontWeight: "600", color: "#2563eb", textDecoration: "none" }}>Project Link</a>
                    )}
                  </div>
                  {p.techstack && <div className="mb-1" style={{ fontSize: "0.85rem", color: "#404040", fontStyle: "italic" }}><b>Tech Stack:</b> {p.techstack}</div>}
                  <ul className="mt-1 ps-3 mb-1">
                    {(p.description || "").split("\n").map((line, idx) => (
                      line.trim() ? <li key={idx} className="mb-1" style={{ color: "#525252" }}>{line}</li> : null
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {user.courses?.length > 0 && (
            <section className="mb-1">
              <h4>Courses</h4>
              {user.courses.map((c, i) => (
                <div key={i} className="mb-1">
                  <b>{c.name}</b> <span className="text-muted">— {c.organization}</span>
                </div>
              ))}
            </section>
          )}

          {user.interests?.length > 0 && (
            <section className="mb-1">
              <h4>Interests</h4>
              <div className="d-flex flex-wrap gap-2">
                {user.interests.map((i, index) => (
                  <span key={index} style={{border: "1px solid #e5e5e5", padding: "4px 10px", borderRadius: "4px"}}>
                    {i.interests}
                  </span>
                ))}
              </div>
            </section>
          )}

          {user.cocurricular?.length > 0 && (
            <section>
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
      </div>
    </div>
  );
}

export default Template3;
