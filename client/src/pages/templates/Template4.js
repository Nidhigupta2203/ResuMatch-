import React from "react";
import {
  LinkedinOutlined,
  MailOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import "../../resources/templates.css";
import { useProfile } from "../../utils/useProfile";

function Template4() {
  const { user, loading } = useProfile();

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading your resume...</div>;

  if (!user) return null;

  return (
    <div className="template4-parent">
      {/* HEADER */}
      <div className="glass-card text-center mb-2" style={{ padding: "8px 15px", marginBottom: "10px" }}>
        <h2 className="mb-0" style={{ fontSize: "1.6rem" }}>
          {user.firstname?.toUpperCase()} {user.lastname?.toUpperCase()}
        </h2>

        <div className="d-flex justify-content-center flex-wrap gap-3 mt-1" style={{ fontSize: "0.85rem", rowGap: "0" }}>
          {user.email && (
            <span className="d-flex align-items-center">
              <MailOutlined className="me-1" style={{color: '#6366f1'}}/> {user.email}
            </span>
          )}
          {user.mobileNumber && (
            <span className="d-flex align-items-center">
              <MobileOutlined className="me-1" style={{color: '#6366f1'}}/> {user.mobileNumber}
            </span>
          )}
          {user.portfolio && (
            <span className="d-flex align-items-center">
              <LinkedinOutlined className="me-1" style={{color: '#6366f1'}}/>
              <a href={user.portfolio.startsWith('http') ? user.portfolio : `https://${user.portfolio}`} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>LinkedIn</a>
            </span>
          )}
          {user.address && <span className="d-flex align-items-center">{user.address}</span>}
        </div>
      </div>

      {/* OBJECTIVE */}
      {user.objective && (
        <div className="glass-card mb-2">
          <h4>Profile</h4>
          <p>{user.objective}</p>
        </div>
      )}

      <div className="content4 d-flex w-100">
        {/* LEFT */}
        <div className="divone pe-3">
          {user.experience?.length > 0 && (
            <div className="glass-card mb-2">
              <h4>Experience</h4>
              {user.experience.map((exp, i) => (
                <div key={i} className="mb-2">
                  <h6 className="fw-bold mb-0">{exp.designation} <span className="fw-normal" style={{color: '#6b7280'}}>@ {exp.company}</span></h6>
                  <p className="small mb-1 text-muted" style={{fontSize: "0.8rem"}}>{exp.range}</p>
                  <p className="mb-0">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {user.education?.length > 0 && (
            <div className="glass-card mb-2">
              <h4>Education</h4>
              {user.education.map((edu, i) => (
                <div key={i} className="mb-2">
                  <h6 className="fw-bold mb-0">{edu.qualification} - {edu.course}</h6>
                  <p className="mb-0 text-muted" style={{fontSize: "0.85rem"}}>{edu.institution}</p>
                  <p className="small mb-0" style={{fontSize: "0.8rem"}}>{edu.range} | {edu.percentage}</p>
                </div>
              ))}
            </div>
          )}

          {user.skills?.length > 0 && (
            <div className="glass-card mb-2">
              <h4>Skills</h4>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {user.skills.map((s, i) => (
                  <span key={i} style={{background: "rgba(255,255,255,0.7)", padding: "5px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.9)", fontSize: "0.9rem"}}>
                    {s.technology}
                  </span>
                ))}
              </div>
            </div>
          )}
          {user.certificates?.length > 0 && (
            <div className="glass-card mb-2">
              <h4>Certificates</h4>
              {user.certificates.map((c, i) => (
                <div key={i} className="mb-2">
                  <h6 className="fw-bold mb-1 text-sm">{c.name}</h6>
                  <p className="small mb-0">
                    {c.credential && c.credential.startsWith("http") ? (
                      <a href={c.credential} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>View Credential</a>
                    ) : (
                      c.credential
                    )}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="divtwo ps-3">
          {user.projects?.length > 0 && (
            <div className="glass-card mb-2">
              <h4>Projects</h4>
              {user.projects.map((p, i) => (
                <div key={i} className="mb-1">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h6 className="fw-bold mb-0" style={{ color: "#4f46e5" }}>{p.title}</h6>
                    {p.link && (
                      <a href={p.link.startsWith('http') ? p.link : `https://${p.link}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", fontWeight: "600", color: "#4f46e5", textDecoration: "none" }}>Project Link</a>
                    )}
                  </div>
                  {p.techstack && <div style={{ fontSize: "0.85rem", color: "#4b5563", fontStyle: "italic" }}><b>Tech Stack:</b> {p.techstack}</div>}
                  <ul className="mb-0 ps-3 mt-1">
                    {(p.description || "").split("\n").map((line, idx) => (
                      line.trim() ? <li key={idx} className="mb-0">{line}</li> : null
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {user.cocurricular?.length > 0 && (
            <div className="glass-card mb-2">
              <h4>Extracurricular Activities</h4>
              <ul className="mb-0 ps-3">
                {user.cocurricular.map((a, i) => (
                  <li key={i} className="mb-1">
                    {a.description}
                  </li>
                ))}
              </ul>
            </div>
          )}



          {user.courses?.length > 0 && (
            <div className="glass-card mb-2">
              <h4>Courses</h4>
              {user.courses.map((c, i) => (
                <div key={i} className="mb-2">
                  <b>{c.name}</b> <p className="small mb-0">{c.organization}</p>
                </div>
              ))}
            </div>
          )}

          {user.interests?.length > 0 && (
            <div className="glass-card mb-2">
              <h4>Interests</h4>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {user.interests.map((i, index) => (
                  <span key={index} style={{background: "rgba(255,255,255,0.5)", padding: "4px 10px", borderRadius: "4px", fontSize: "0.9rem"}}>
                    {i.interests}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Template4;
