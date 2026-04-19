import React from "react";
import {
  MailOutlined,
  MobileOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "../../resources/templates.css";
import { useProfile } from "../../utils/useProfile";

const Template2 = () => {
  const { user, loading } = useProfile();

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading your resume...</div>;

  if (!user) return null;

  return (
    <div className="template2-parent">
      {/* LEFT SIDEBAR */}
      <div className="t2-sidebar">
        <h2 className="mb-0 text-white">{user.firstname?.toUpperCase()} {user.lastname?.toUpperCase()}</h2>

        <div className="mt-3 mb-4" style={{ fontSize: "0.85rem" }}>
          {user.email && (
            <p className="mb-1"><MailOutlined className="me-2" /> {user.email}</p>
          )}
          {user.mobileNumber && (
            <p className="mb-1"><MobileOutlined className="me-2" /> {user.mobileNumber}</p>
          )}
          {user.portfolio && (
            <p className="mb-1"><LinkedinOutlined className="me-2" /> 
              <a href={user.portfolio.startsWith('http') ? user.portfolio : `https://${user.portfolio}`} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>LinkedIn</a>
            </p>
          )}
          {user.address && <p className="mb-1">{user.address}</p>}
        </div>

        {/* SKILLS */}
        {user.skills?.length > 0 && (
          <section className="mb-2">
            <h4>SKILLS</h4>
            {user.skills.map((s, i) => (
              <p key={i} className="mb-1">{s.technology}</p>
            ))}
          </section>
        )}

        {/* CERTIFICATES */}
        {user.certificates?.length > 0 && (
          <section className="mb-2">
            <h4>CERTIFICATES</h4>
            {user.certificates.map((c, i) => (
              <div key={i} className="mb-2">
                <b>{c.name}</b>
                <p className="mb-0" style={{fontSize: "0.85rem"}}>
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

        {/* INTERESTS */}
        {user.interests?.length > 0 && (
          <section className="mb-2">
            <h4>INTERESTS</h4>
            {user.interests.map((i, idx) => (
              <p key={idx} className="mb-1">{i.interests}</p>
            ))}
          </section>
        )}
      </div>

      {/* RIGHT MAIN */}
      <div className="t2-main">
        {/* OBJECTIVE */}
        {user.objective && (
          <section className="mb-2">
            <h4>PROFILE</h4>
            <p className="mt-3">{user.objective}</p>
          </section>
        )}

        {/* EXPERIENCE */}
        {user.experience?.length > 0 && (
          <section className="mb-2">
            <h4>EXPERIENCE</h4>
            <div className="mt-3">
              {user.experience.map((exp, i) => (
                <div key={i} className="mb-2">
                  <h6 className="mb-0 fw-bold">{exp.designation}</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <b>{exp.company}</b>
                    <span>{exp.range}</span>
                  </div>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {user.education?.length > 0 && (
          <section className="mb-2">
            <h4>EDUCATION</h4>
            <div className="mt-3">
              {user.education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <h6 className="mb-0 fw-bold">{edu.qualification} in {edu.course}</h6>
                  <div className="d-flex justify-content-between">
                    <b>{edu.institution}</b>
                    <span>{edu.year || edu.range} | {edu.percentage}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {user.projects?.length > 0 && (
          <section className="mb-2">
            <h4>PROJECTS</h4>
            <div className="mt-3">
              {user.projects.map((proj, i) => (
                <div key={i} className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h6 className="mb-0 fw-bold" style={{ color: "#0f172a" }}>{proj.title}</h6>
                    {proj.link && (
                      <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", fontWeight: "600", color: "#2563eb", textDecoration: "none" }}>Project Link</a>
                    )}
                  </div>
                  {proj.techstack && <div style={{ fontSize: "0.85rem", color: "#64748b", fontStyle: "italic" }}><b>Tech Stack:</b> {proj.techstack}</div>}
                  <ul className="mt-1 ps-3 mb-1" style={{ color: "#475569" }}>
                    {(proj.description || "").split("\n").map((line, idx) => (
                      line.trim() ? <li key={idx} className="mb-0">{line}</li> : null
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* COURSES & ACTIVITIES */}
        {user.courses?.length > 0 && (
          <section className="mb-2">
            <h4>COURSES</h4>
            <div className="mt-3">
              {user.courses.map((c, i) => (
                <p key={`course-${i}`} className="mb-1"><b>Course:</b> {c.name} - {c.organization}</p>
              ))}
            </div>
          </section>
        )}
        {user.cocurricular?.length > 0 && (
          <section className="mb-2">
            <h4>EXTRACURRICULAR ACTIVITIES</h4>
            <ul className="mt-3 ps-3 mb-1" style={{ color: "#475569" }}>
              {user.cocurricular.map((a, i) => (
                <li key={`act-${i}`} className="mb-1">{a.description}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default Template2;
