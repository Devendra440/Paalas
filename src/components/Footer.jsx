import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaYoutube, FaArrowUp } from "react-icons/fa";

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

  return (
    <footer style={footerStyle}>
      <div>
        <a
          href="mailto:palas30413@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope
            style={iconStyle}
            onMouseOver={(e) => (e.target.style.color = "#ccc")}
            onMouseOut={(e) => (e.target.style.color = "#00f7ff")}
          />
        </a>
        <a
          href="https://www.instagram.com/paalas__?igsh=bzZqZDdscWxkMnJq"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram
            style={iconStyle}
            onMouseOver={(e) => (e.target.style.color = "#ccc")}
            onMouseOut={(e) => (e.target.style.color = "#00f7ff")}
          />
        </a>
        <a
          href="https://youtube.com/@paalas_?si=pxHH8CT0O_6BYpnM"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube
            style={iconStyle}
            onMouseOver={(e) => (e.target.style.color = "#ccc")}
            onMouseOut={(e) => (e.target.style.color = "#00f7ff")}
          />
        </a>
      </div>

      <p style={{ color: "#aaa", marginTop: "1rem" }}>
        © {new Date().getFullYear()} All rights reserved. Developed by <strong>Devendra Gupta</strong>.
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
