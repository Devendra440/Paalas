import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const CollaborationsSection = ({ collaborations, fetchCollaborations }) => {
  const [filterStatus, setFilterStatus] = useState("All");

  // Send email with status update
  const sendCollaborationEmail = async (collab, status) => {
    const templateParams = {
      to_name: collab.name,
      email: collab.email,
      project: collab.project || "Your Collaboration Project",
      status,
      message: `Your collaboration request has been ${status.toLowerCase()}.`,
    };

    try {
      const res = await emailjs.send(
        "service_ke3q9km",        // ✅ Your EmailJS Service ID
        "template_4qosxr1",       // ✅ Your Template ID
        templateParams,
        "86oI41ZB2nFQAV4ZD"       // ✅ Your PUBLIC key
      );

      if (res.status === 200) {
        console.log("✅ Email sent:", res.text);
      } else {
        throw new Error("Email sending failed");
      }
    } catch (err) {
      console.error("❌ Failed to send email:", err);
    }
  };

  // Update status in backend
  const updateStatus = async (id, newStatus, collab) => {
    try {
      const res = await fetch(`https://paalas-backend.onrender.com/api/collaborations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      await sendCollaborationEmail(collab, newStatus);
      alert(`✅ Collaboration marked as ${newStatus}`);
      fetchCollaborations(); // Refresh list
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update status");
    }
  };

  const filtered = collaborations.filter((collab) =>
    filterStatus === "All" ? true : collab.status === filterStatus
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "2rem", color: "#00f7ff", marginBottom: "1rem" }}>
          🤝 Collaboration Requests
        </h1>
        <div>
          <button onClick={() => setFilterStatus("Accepted")} style={filterButtonStyle}>
            ✅ Accepted
          </button>
          <button onClick={() => setFilterStatus("Rejected")} style={{ ...filterButtonStyle, background: "#ff4b4b", color: "#fff" }}>
            ❌ Rejected
          </button>
          <button onClick={() => setFilterStatus("All")} style={{ ...filterButtonStyle, background: "#888", color: "#fff" }}>
            📄 All
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: "#ccc" }}>No collaborations found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filtered.map((collab) => (
            <div
              key={collab._id}
              style={{
                border: "1px solid #333",
                padding: "1rem",
                borderRadius: "8px",
                background: "#1e1e1e",
                color: "#fff",
              }}
            >
              <h3 style={{ color: "#00f7ff" }}>{collab.name}</h3>
              <p><strong>Email:</strong> {collab.email}</p>
              <p><strong>Phone:</strong> {collab.phone}</p>
              <p><strong>Type:</strong> {collab.collabType}</p>
              <p><strong>Start Date:</strong> {collab.startDate}</p>
              <p><strong>Portfolio:</strong> <a href={collab.portfolio} target="_blank" rel="noopener noreferrer">{collab.portfolio}</a></p>
              <p><strong>Sample Link:</strong> <a href={collab.sampleLink} target="_blank" rel="noopener noreferrer">{collab.sampleLink}</a></p>
              <p><strong>Hours/Week:</strong> {collab.hoursPerWeek}</p>
              <p><strong>Message:</strong> {collab.message}</p>
              <p><strong>Status:</strong> {collab.status || "Pending"}</p>

              <div style={{ marginTop: "0.8rem", display: "flex", gap: "0.8rem" }}>
                <button
                  onClick={() => updateStatus(collab._id, "Accepted", collab)}
                  style={{ ...buttonStyle, background: "#00f7ff", color: "#000" }}
                >
                  ✅ Accept
                </button>
                <button
                  onClick={() => updateStatus(collab._id, "Rejected", collab)}
                  style={{ ...buttonStyle, background: "#ff4b4b", color: "#fff" }}
                >
                  ❌ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Styles
const filterButtonStyle = {
  marginLeft: "0.5rem",
  padding: "0.4rem 0.9rem",
  fontSize: "0.9rem",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  background: "#00f7ff",
  color: "#000",
  fontWeight: "bold",
};

const buttonStyle = {
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default CollaborationsSection;
