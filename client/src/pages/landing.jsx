import React from "react";
import { Container, Button, Carousel } from "react-bootstrap";
import { ThemeProvider, createTheme } from "@mui/material";
import { MdEmail, MdPhone } from "react-icons/md";
import TypeWriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import "../resources/landing.css";
import Header from "../components/Header";

// ✅ Import images properly
import template1 from "../resources/templateImages/Template-1.png";
import template4 from "../resources/templateImages/Template-4.png";
import template6 from "../resources/templateImages/Template-6.png";
import templateHD from "../resources/templateImages/Template-1_HD.png";

function Home() {
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#6366f1",
      },
    },
  });

  // ✅ Check auth before navigation
  const handleProtectedNavigation = (path) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="home-page bg-dark text-light">
        <Header />

        {/* HERO */}
        <section className="hero vh-100 d-flex align-items-center position-relative">
          <div className="hero-overlay position-absolute w-100 h-100"></div>

          <Container className="position-relative">
            <div className="typewriter-effect">
              <TypeWriter
                options={{
                  strings: [
                    "Welcome to ResuMatch 🚀",
                    "Smart Resume Analysis",
                    "Get ATS Score Instantly",
                    "Build Job-Ready Resume",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>

            <p className="lead mb-5">
              Analyze and improve your resume with ResuMatch. Get smart
              suggestions and increase your chances of getting hired.
            </p>

            <Button
              variant="primary"
              size="lg"
              onClick={() => handleProtectedNavigation("/upload")}
              className="pulse-button"
            >
              Analyze My Resume
            </Button>
          </Container>
        </section>

        {/* TEMPLATES */}
        <section id="templates" className="py-5 bg-dark">
          <Container>
            <h2 className="text-center mb-5">Resume Templates</h2>

            <Carousel className="templates-carousel">
              <Carousel.Item>
                <div
                  className="template-preview"
                  onClick={() => handleProtectedNavigation("/templates/1")}
                >
                  <img src={template1} className="img-fluid" alt="Template 1" />
                  <h3>Professional</h3>
                  <p>Clean layout for all industries</p>
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div
                  className="template-preview"
                  onClick={() => handleProtectedNavigation("/templates/4")}
                >
                  <img src={template4} className="img-fluid" alt="Template 4" />
                  <h3>Creative</h3>
                  <p>Best for designers & creative roles</p>
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div
                  className="template-preview"
                  onClick={() => handleProtectedNavigation("/templates/6")}
                >
                  <img src={template6} className="img-fluid" alt="Template 6" />
                  <h3>Modern</h3>
                  <p>Perfect for experienced professionals</p>
                </div>
              </Carousel.Item>
            </Carousel>

            <div className="text-center mt-4">
              <Button
                variant="outline-light"
                size="lg"
                onClick={() => handleProtectedNavigation("/template")}
              >
                View All Templates
              </Button>
            </div>
          </Container>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-5 bg-darker">
          <Container>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h2 className="mb-4">About ResuMatch</h2>

                <p className="lead mb-4">
                  ResuMatch is a smart resume analysis platform that evaluates
                  your resume and provides actionable insights based on ATS
                  systems.
                </p>

                <h4>Key Features</h4>
                <ul className="list-unstyled">
                  <li>✓ Resume Score Analysis</li>
                  <li>✓ ATS Optimization Tips</li>
                  <li>✓ Multiple Resume Templates</li>
                  <li>✓ Easy-to-Use Interface</li>
                </ul>
              </div>

              <div className="col-lg-6">
                <img src={templateHD} alt="resume" className="w-100" />
              </div>
            </div>
          </Container>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-5 bg-dark">
          <Container className="text-center">
            <h2 className="mb-4">Contact Us</h2>

            <p className="lead mb-4">
              Have questions or feedback? We’d love to hear from you.
            </p>

            <div className="d-flex justify-content-center gap-4 flex-wrap">
              <div className="d-flex align-items-center">
                <MdEmail className="me-2" />
                <span>support@resumatch.com</span>
              </div>

              <div className="d-flex align-items-center">
                <MdPhone className="me-2" />
                <span>+91 9876543210</span>
              </div>
            </div>
          </Container>
        </section>

        {/* FOOTER */}
        <footer className="bg-darker py-4 text-center">
          <Container>
            <p>© {new Date().getFullYear()} ResuMatch. All rights reserved.</p>
          </Container>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default Home;
