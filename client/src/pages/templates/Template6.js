import React from "react";
import {
  MailOutlined,
  MobileOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "../../resources/templates.css";
import { useProfile } from "../../utils/useProfile";

function Template6() {
  const { user, loading } = useProfile();

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading your resume...</div>;

  if (!user) return null;

  const fullName =
    `${user.firstname || ""} ${user.lastname || ""}`.toUpperCase();

  return (
    <div className="template6-parent">
      {/* HEADER */}
      <div className="text-center mb-2 mt-1">
        <h2 className="mb-0" style={{ fontSize: "1.8rem" }}>{fullName}</h2>

        <div className="d-flex justify-content-center flex-wrap gap-2 small mt-1" style={{color: '#78716c', fontSize: "0.8rem", rowGap: "0"}}>
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

      {user.objective && (
        <section className="mb-2">
          <h4>Professional Summary</h4>
          <p className="mt-1" style={{lineHeight: "1.4", fontSize: "0.9rem"}}>{user.objective}</p>
        </section>
      )}

      <div className="content6 d-flex w-100 pb-2">
        {/* LEFT */}
        <div className="divone pe-4">
          {user.experience?.length > 0 && (
            <section className="mb-2">
              <h4>Experience</h4>
              <div className="mt-4">
                {user.experience.map((exp, i) => (
                  <div key={i} className="mb-1">
                    <b className="fs-6 d-block mb-1">{exp.designation}</b>
                    <span className="small text-uppercase" style={{color: '#a8a29e', letterSpacing: '1px'}}>{exp.company} | {exp.range}</span>
                    <p className="mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {user.education?.length > 0 && (
            <section className="mb-2">
              <h4>Education</h4>
              <div className="mt-4">
                {user.education.map((edu, i) => (
                  <div key={i} className="mb-1">
                    <b className="fs-6 d-block mb-1">{edu.qualification} in {edu.course}</b>
                    <span className="small text-uppercase" style={{color: '#a8a29e', letterSpacing: '1px'}}>{edu.institution} | {edu.range || edu.year}</span>
                    <p className="mt-1 small mb-0">Percentage: {edu.percentage}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {user.skills?.length > 0 && (
            <section className="mb-2">
              <h4>Skills & Expertise</h4>
              <ul className="mt-4 ps-3" style={{lineHeight: "1.8"}}>
                {user.skills.map((s, i) => (
                  <li key={i}>
                    <b style={{fontWeight: 600}}>{s.technology}</b>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {user.certificates?.length > 0 && (
            <section className="mb-2">
              <h4>Certifications</h4>
              <div className="mt-4">
                {user.certificates.map((c, i) => (
                  <div key={i} className="mb-2">
                    <b className="d-block">{c.name}</b>
                    <p className="small mb-0" style={{color: '#78716c'}}>
                      {c.credential && c.credential.startsWith("http") ? (
                        <a href={c.credential} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>View Credential</a>
                      ) : (
                        c.credential
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT */}
        <div className="divtwo ps-4">
          {user.projects?.length > 0 && (
            <section className="mb-2">
              <h4>Selected Projects</h4>
              <div className="mt-4">
                {user.projects.map((p, i) => (
                  <div key={i} className="mb-1">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <b className="fs-6" style={{ color: "#44403c" }}>{p.title}</b>
                      {p.link && (
                        <a href={p.link.startsWith('http') ? p.link : `https://${p.link}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", fontWeight: "600", color: "#44403c", textDecoration: "underline" }}>Project Link</a>
                      )}
                    </div>
                    {p.techstack && <div style={{ fontSize: "0.85rem", color: "#78716c", fontStyle: "italic" }}><b>Tech Stack:</b> {p.techstack}</div>}
                    <ul className="mb-0 ps-3 mt-1">
                      {(p.description || "").split("\n").map((line, idx) => (
                        line.trim() ? <li key={idx} className="mb-0">{line}</li> : null
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {user.courses?.length > 0 && (
            <section className="mb-2">
              <h4>Courses</h4>
              <div className="mt-4">
                {user.courses.map((c, i) => (
                  <div key={i} className="mb-2">
                    <b className="d-block mb-1">{c.name}</b>
                    <p className="small mb-0" style={{color: '#78716c'}}>{c.organization}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {user.interests?.length > 0 && (
            <section className="mb-2">
              <h4>Interests</h4>
              <p className="mt-4" style={{lineHeight: "1.8"}}>
                {user.interests.map((i, idx) => (
                  <span key={idx}>{i.interests}{idx !== user.interests.length - 1 ? ", " : ""}</span>
                ))}
              </p>
            </section>
          )}

          {user.cocurricular?.length > 0 && (
            <section>
              <h4>Extracurricular Activities</h4>
              <ul className="mt-4 ps-3">
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

export default Template6;
