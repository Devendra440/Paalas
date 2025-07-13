import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Show scroll button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerStyle = {
    textAlign: "center",
    padding: "2rem 1rem",
    background: "rgba(255, 255, 255, 0.06)",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    color: "#ccc",
    fontSize: "0.95rem",
    marginTop: "3rem",
    position: "relative",
  };

  const iconStyle = {
    fontSize: "1.5rem",
    margin: "0 1rem",
    color: "#00f7ff",
    transition: "transform 0.3s ease, color 0.3s ease",
    cursor: "pointer",
  };

  const scrollBtnStyle = {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    backgroundColor: "#00f7ff",
    color: "#000",
    borderRadius: "50%",
    padding: "12px",
    fontSize: "1.4rem",
    boxShadow: "0 0 14px #00f7ff",
    border: "none",
    cursor: "pointer",
    zIndex: 1000,
    transition: "background 0.3s ease",
  };

  const quoteStyle = {
    fontStyle: "italic",
    margin: "1.5rem auto 1rem",
    maxWidth: "700px",
    color: "#eee",
    fontSize: "1rem",
    lineHeight: "1.6",
  };

  return (
    <footer style={footerStyle}>
      <div>
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub
            style={iconStyle}
            onMouseOver={(e) => (e.target.style.color = "#ccc")}
            onMouseOut={(e) => (e.target.style.color = "#00f7ff")}
          />
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin
            style={iconStyle}
            onMouseOver={(e) => (e.target.style.color = "#ccc")}
            onMouseOut={(e) => (e.target.style.color = "#00f7ff")}
          />
        </a>
        <a href="mailto:your-email@example.com">
          <FaEnvelope
            style={iconStyle}
            onMouseOver={(e) => (e.target.style.color = "#ccc")}
            onMouseOut={(e) => (e.target.style.color = "#00f7ff")}
          />
        </a>
      </div>


      <p style={{ color: "#aaa", marginTop: "1rem" }}>
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </p>

      {showScroll && (
        <button onClick={scrollToTop} style={scrollBtnStyle}>
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
