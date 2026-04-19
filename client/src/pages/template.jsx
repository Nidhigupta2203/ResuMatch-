import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import templateimg1 from "../resources/templateImages/Template-1.png";
import templateimg2 from "../resources/templateImages/Template-2.png";
import templateimg3 from "../resources/templateImages/Template-3.png";
import templateimg4 from "../resources/templateImages/Template-4.png";
import templateimg5 from "../resources/templateImages/Template-5.png";
import templateimg6 from "../resources/templateImages/Template-6.png";

const templates = [
  { title: "Professional", image: templateimg1 },
  { title: "Student", image: templateimg2 },
  { title: "Minimal", image: templateimg3 },
  { title: "Creative", image: templateimg4 },
  { title: "Executive", image: templateimg5 },
  { title: "Modern", image: templateimg6 },
];

function Template() {
  const navigate = useNavigate();

  return (
    <div className="row home">
      <Header />

      <div style={{ marginTop: "80px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Choose a Resume Template
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "40px",
          }}
        >
          Select a template to build your ResuMatch resume
        </p>

        <div className="row home">
          {templates.map((template, index) => (
            <div key={index} className="col-md-4 d-flex justify-content-center">
              <div className="template">
                <img
                  src={template.image}
                  height="380"
                  alt={template.title}
                  loading="lazy"
                />

                <div className="text">
                  <h5>{template.title}</h5>

                  <div className="d-flex gap-2">
                    <button onClick={() => navigate(`/templates/${index + 1}`)}>
                      Use Template
                    </button>
                    <button 
                      onClick={() => navigate(`/templates/${index + 1}?download=true`)}
                      style={{ background: "#334155" }}
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Template;
