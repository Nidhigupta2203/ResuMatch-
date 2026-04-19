import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../resources/header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Reactive auth state — re-checks whenever route changes
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");
    setIsLoggedIn(!!token);
    setUsername(user || "");
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("resume-user");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  const handleNav = (path) => navigate(path);

  return (
    <header className="custom-header">
      {/* LEFT — Brand */}
      <div className="brand-section" onClick={() => handleNav("/")}>
        <img
          src={require("../pages/images/navlogo.jpeg")}
          alt="logo"
          className="brand-logo"
        />
        <span className="brand-name">ResuMatch</span>
      </div>

      {/* CENTER — Navigation */}
      <nav className="nav-center">
        <p onClick={() => handleNav("/")}>Home</p>
        <p onClick={() => handleNav("/template")}>Templates</p>
        <p onClick={() => handleNav("/upload")}>Review</p>
        <p onClick={() => handleNav("/profile")}>Profile</p>
      </nav>

      {/* RIGHT — Auth button */}
      <div className="auth-area">
        {isLoggedIn ? (
          <div className="user-info">
            <span className="user-greeting">
              👋 {username}
            </span>
            <button className="auth-btn logout-btn" onClick={handleLogout}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        ) : (
          <button className="auth-btn login-btn" onClick={() => handleNav("/login")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
