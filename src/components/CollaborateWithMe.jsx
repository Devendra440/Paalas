import React, { useState } from "react";

const CollaborateWithMe = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    collabType: "",
    startDate: "",
    portfolio: "",
    hoursPerWeek: "",
    sampleLink: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/collaborations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Submission failed");

      const result = await response.json();
      alert(`🎵 Thanks, ${result.name}! We'll be in touch soon.`);
      setShowForm(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        collabType: "",
        startDate: "",
        portfolio: "",
        hoursPerWeek: "",
        sampleLink: "",
        message: "",
      });
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.7rem",
    marginBottom: "1rem",
    borderRadius: "6px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    fontSize: "1rem",
    background: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    backdropFilter: "blur(8px)",
  };

  return (
    <>
      <section style={{
        textAlign: "center",
        padding: "3rem 1.5rem",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        margin: "3rem auto",
        maxWidth: "1000px",
        boxShadow: "0 0 25px rgba(0, 247, 255, 0.2)",
        color: "#fff",
        animation: "fadeInUp 1s ease forwards",
      }}>
        <h2 style={{ fontSize: "2.2rem", color: "#00f7ff", marginBottom: "1.2rem" }}>
          🎤 Collaborate With Me
        </h2>
        <p style={{ fontSize: "1rem", color: "#e0e0e0", maxWidth: "750px", margin: "auto" }}>
          Are you a singer, lyricist, or music producer? Let's create something magical together!
        </p>
        <blockquote style={{
          fontStyle: "italic",
          fontSize: "1.05rem",
          color: "#dcdcdc",
          marginTop: "2rem",
          padding: "1rem",
          borderLeft: "4px solid #00f7ff",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "10px",
        }}>
          “When great artists connect, their combined voices create harmony beyond measure.”
        </blockquote>
        <button
          onClick={() => setShowForm(true)}
          style={{
            marginTop: "2rem",
            padding: "0.8rem 1.6rem",
            background: "linear-gradient(135deg, #00f7ff, #0077ff)",
            border: "none",
            borderRadius: "30px",
            fontSize: "1rem",
            color: "#000",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 0 12px #00f7ffaa",
          }}
        >
          🎧 Let's Collaborate
        </button>
      </section>

      {showForm && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.7)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(4px)",
        }}
          onClick={() => setShowForm(false)}
        >
          <div
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              color: "#fff",
              borderRadius: "15px",
              padding: "2rem",
              width: "90%",
              maxWidth: "450px",
              position: "relative",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 0 30px rgba(0, 247, 255, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              onClick={() => setShowForm(false)}
              style={{ position: "absolute", top: "10px", right: "15px", fontSize: "1.5rem", cursor: "pointer" }}
            >
              &times;
            </span>
            <h3 style={{ marginBottom: "1rem", textAlign: "center", color: "#00f7ff" }}>
              🎶 Collaboration Request
            </h3>
            <form onSubmit={handleSubmit}>
              <input style={inputStyle} name="name" type="text" placeholder="Your Name" required value={formData.name} onChange={handleChange} />
              <input style={inputStyle} name="email" type="email" placeholder="Your Email" required value={formData.email} onChange={handleChange} />
              <input style={inputStyle} name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
              <select name="collabType" style={inputStyle} required value={formData.collabType} onChange={handleChange}>
                <option value="">Select Collaboration Type</option>
                <option value="Singing">Singing</option>
                <option value="Lyrics Writing">Lyrics Writing</option>
                <option value="Music Production">Music Production</option>
                <option value="Video Editing">Video Editing</option>
              </select>
              <input style={inputStyle} name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
              <input style={inputStyle} name="portfolio" type="url" placeholder="Portfolio URL" value={formData.portfolio} onChange={handleChange} />
              <input style={inputStyle} name="hoursPerWeek" type="number" placeholder="Hours per Week" value={formData.hoursPerWeek} onChange={handleChange} />
              <input style={inputStyle} name="sampleLink" type="url" placeholder="Sample Link (Google Drive, YouTube)" required value={formData.sampleLink} onChange={handleChange} />
              <textarea style={{ ...inputStyle, height: "100px" }} name="message" placeholder="Tell me about your idea..." value={formData.message} onChange={handleChange}></textarea>
              <button type="submit" style={{
                background: "#00f7ff", color: "#000", fontWeight: "bold",
                border: "none", padding: "0.6rem", width: "100%",
                borderRadius: "6px", cursor: "pointer",
                boxShadow: "0 0 10px #00f7ffaa",
              }}>
                Submit Request 💡
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CollaborateWithMe;
