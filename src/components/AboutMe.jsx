import React, { useEffect, useRef } from "react";
import artistImage from "./paalas.jpg"; // Make sure this image is inside the same 'components' folder

const AboutMe = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("parallax-show");
          } else {
            entry.target.classList.remove("parallax-show");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
  }, []);

  return (
    <div
      ref={aboutRef}
      className="about-section parallax-hidden"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "2.5rem auto",
        minHeight: "60vh",
        width: "100%",
        perspective: "1200px",
      }}
    >
      <div
        className="about-container"
        style={{
          maxWidth: "800px",
          width: "90%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap-reverse",
          gap: "1.5rem",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.5rem",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 6px 25px rgba(0, 247, 255, 0.25), 0 0 20px #00f7ff33",
          transition: "transform 0.8s ease, opacity 0.8s ease",
          animation: "floatPulse 2.5s ease-in-out infinite",
        }}
      >
        {/* Image on the Left */}
        <div style={{ flex: "1 1 250px", textAlign: "center" }}>
          <img
            src={artistImage}
            alt="Paalas"
            style={{
              width: "100%",
              maxWidth: "240px",
              borderRadius: "14px",
              boxShadow: "0 0 18px rgba(0, 247, 255, 0.4)",
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.07)";
              e.currentTarget.style.boxShadow = "0 0 35px rgba(0, 247, 255, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 18px rgba(0, 247, 255, 0.4)";
            }}
          />
        </div>

        {/* Info on the Right */}
        <div style={{ flex: "2 1 350px" }}>
          <h2
            style={{
              fontSize: "1.8rem",
              color: "#00f7ff",
              borderBottom: "2px solid #00f7ff",
              display: "inline-block",
              marginBottom: "1rem",
            }}
          >
            About Me
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#e0e0e0", lineHeight: 1.6 }}>
            I’m <strong>PAALAS</strong>, a singer, songwriter, and music producer.
            Whether in the studio or on the stage, I turn emotions into melodies.
            Music is my identity, and here is where I showcase my world — raw,
            real, and full of rhythm.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
