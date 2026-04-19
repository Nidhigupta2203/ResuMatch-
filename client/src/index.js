import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// 🌟 Set app title dynamically (ResuMatch branding)
document.title = "ResuMatch AI";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
