import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "antd";
import Header from "../../components/Header";

import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import Template5 from "./Template5";
import Template6 from "./Template6";

function Templates() {
  const componentRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "ResuMatch_Resume",
  });

  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("download") === "true") {
      // Small delay to ensure template is rendered
      setTimeout(() => {
        handlePrint();
      }, 1000);
    }
  }, [location.search, handlePrint]);

  /* TEMPLATE MAP (cleaner than switch) */
  const templateMap = {
    1: <Template1 />,
    2: <Template2 />,
    3: <Template3 />,
    4: <Template4 />,
    5: <Template5 />,
    6: <Template6 />,
  };

  const selectedTemplate = templateMap[id] || (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h3>No template found</h3>
      <Button onClick={() => navigate("/template")}>Go Back</Button>
    </div>
  );

  return (
    <div>
      <Header />

      {/* ACTION BAR */}
      <div
        className="d-flex justify-content-end"
        style={{ margin: "80px 40px 20px" }}
      >
        <Button onClick={() => navigate("/template")}>Back to Templates</Button>

        <Button
          type="primary"
          style={{ marginLeft: "10px" }}
          onClick={handlePrint}
        >
          Download Resume
        </Button>
      </div>

      {/* FLOATING ACTION BUTTON FOR MOBILE/EASY ACCESS */}
      <div 
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
        className="no-print"
      >
         <Button
          type="primary"
          shape="round"
          size="large"
          icon={<span>📥</span>}
          onClick={handlePrint}
          style={{ 
            height: "50px", 
            boxShadow: "0 4px 15px rgba(99,102,241,0.5)",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            border: "none",
            fontWeight: "bold"
          }}
        >
          Download PDF
        </Button>
      </div>

      {/* TEMPLATE PREVIEW */}
      <div ref={componentRef}>{selectedTemplate}</div>
    </div>
  );
}

export default Templates;
