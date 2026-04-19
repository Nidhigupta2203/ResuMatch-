import React from "react";
import {
  MailOutlined,
  MobileOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "../../resources/templates.css";
import { useProfile } from "../../utils/useProfile";

function Template5() {
  const { user, loading } = useProfile();

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading your resume...</div>;

  if (!user) return null;

  const fullName =
    `${user.firstname || ""} ${user.lastname || ""}`.toUpperCase();

  return (
    <div className="template5-parent">
      {/* HEADER */}
      <div className="text-center mb-2" style={{ borderBottom: "1px dashed #3f3f46", paddingBottom: "5px" }}>
        <h2 className="mb-0" style={{ fontSize: "1.8rem" }}>_{fullName}_</h2>

        <div className="d-flex justify-content-center flex-wrap gap-2 small mt-1" style={{ fontSize: "0.8rem", rowGap: "0" }}>
          {user.email && (
            <span className="d-flex align-items-center">
              <MailOutlined className="me-1" style={{color: '#a855f7'}}/> {user.email}
            </span>
          )}
          {user.mobileNumber && (
            <span className="d-flex align-items-center">
              <MobileOutlined className="me-1" style={{color: '#a855f7'}}/> {user.mobileNumber}
            </span>
          )}
          {user.portfolio && (
            <span className="d-flex align-items-center">
              <LinkedinOutlined className="me-1" style={{color: '#a855f7'}}/> 
              <a href={user.portfolio.startsWith('http') ? user.portfolio : `https://${user.portfolio}`} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>LinkedIn</a>
            </span>
          )}
          {user.address && <span className="d-flex align-items-center">{user.address}</span>}
        </div>
      </div>

      {user.objective && (
        <section className="mb-2">
          <h4>// PROFESSIONAL_SUMMARY</h4>
          <p className="mt-3">> {user.objective}</p>
        </section>
      )}

      <div className="content5 d-flex w-100">
        {/* LEFT */}
        <div className="divone pe-4">
          {user.experience?.length > 0 && (
            <section className="mb-2">
              <h4>// EXPERIENCE.exe</h4>
              {user.experience.map((exp, i) => (
                <div key={i} className="cyber-box">
                  <h6 className="fw-bold mb-1 text-white">{exp.designation} <span style={{color: '#a1a1aa'}}>@ {exp.company}</span></h6>
                  <p className="mb-0 small" style={{color: '#ec4899'}}>[ {exp.range} ]</p>
                  <p className="mb-0">> {exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {user.education?.length > 0 && (
            <section className="mb-2">
              <h4>// EDUCATION</h4>
              {user.education.map((edu, i) => (
                <div key={i} className="cyber-box">
                  <h6 className="fw-bold mb-1 text-white">{edu.qualification} - {edu.institution}</h6>
                  <p className="small mb-1" style={{color: '#ec4899'}}>[ {edu.range} ]</p>
                  <p className="mb-0">> {edu.course} • {edu.percentage}</p>
                </div>
              ))}
            </section>
          )}

          {user.skills?.length > 0 && (
            <section className="mb-2">
              <h4>// SKILLS_SYSX</h4>
              <div className="cyber-box">
                {user.skills.map((s, i) => (
                  <p key={i} className="mb-1">
                    <span style={{color: '#22d3ee'}}>{s.technology}</span>
                  </p>
                ))}
              </div>
            </section>
          )}

          {user.certificates?.length > 0 && (
            <section className="mb-2">
              <h4>// CERTIFICATES</h4>
              {user.certificates.map((c, i) => (
                <div key={i} className="cyber-box">
                  <h6 className="fw-bold mb-1 text-white">{c.name}</h6>
                  <p className="small mb-0">> 
                    {c.credential && c.credential.startsWith("http") ? (
                      <a href={c.credential} target="_blank" rel="noopener noreferrer" style={{ color: "#22d3ee" }}>View Credential</a>
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
            <section className="mb-2">
              <h4>// SEC_PROJECTS</h4>
              {user.projects.map((p, i) => (
                <div key={i} className="cyber-box">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h6 className="fw-bold mb-0 text-white">{p.title}</h6>
                    {p.link && (
                      <a href={p.link.startsWith('http') ? p.link : `https://${p.link}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", color: "#22d3ee", textDecoration: "none", fontWeight: "600" }}>Project Link</a>
                    )}
                  </div>
                  {p.techstack && <div style={{ fontSize: "0.85rem", color: "#a855f7", fontStyle: "italic" }}><b>Tech Stack:</b> {p.techstack}</div>}
                  <ul className="mb-0 ps-3 mt-1" style={{ listStyleType: "square" }}>
                    {(p.description || "").split("\n").map((line, idx) => (
                      line.trim() ? <li key={idx} className="mb-0 small">{line}</li> : null
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {user.interests?.length > 0 && (
            <section className="mb-2">
              <h4>// INTERESTS / MODULES</h4>
              <div className="cyber-box">
                {user.interests.map((i, idx) => (
                  <p key={idx} className="mb-1">> {i.interests}</p>
                ))}
              </div>
            </section>
          )}



          {user.courses?.length > 0 && (
            <section className="mb-2">
              <h4>// COURSES</h4>
              <div className="cyber-box">
                {user.courses?.map((c, i) => (
                  <p key={`c-${i}`} className="mb-1">> {c.name} – {c.organization}</p>
                ))}
              </div>
            </section>
          )}
          {user.cocurricular?.length > 0 && (
            <section className="mb-2">
              <h4>// EXTRACURRICULAR_ACTIVITIES</h4>
              <div className="cyber-box">
                {user.cocurricular?.map((a, i) => (
                  <p key={`a-${i}`} className="mb-1">> {a.description}</p>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default Template5;
