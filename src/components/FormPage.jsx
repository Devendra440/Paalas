import React, { useState, useEffect } from "react";
import CollaborationsSection from "./CollaborationsSection";

const API_BASE_URL = "https://paalas-backend.onrender.com";

const FormPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    likes: 0,
    dislikes: 0,
  });

  const [videos, setVideos] = useState([]);
  const [collaborations, setCollaborations] = useState([]);
  const [activeSection, setActiveSection] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchVideos = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/videos`);
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      alert("Error fetching videos");
    }
  };

  const fetchCollaborations = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/collaborations`);
      const data = await res.json();
      setCollaborations(data);
    } catch (err) {
      alert("Error fetching collaborations");
    }
  };

  useEffect(() => {
    fetchVideos();
    fetchCollaborations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "likes" || name === "dislikes" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editMode ? "PUT" : "POST";
    const endpoint = editMode
      ? `${API_BASE_URL}/api/videos/${editId}`
      : `${API_BASE_URL}/api/videos`;

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Submission failed");
      const result = await res.json();
      alert(`✅ Video ${editMode ? "updated" : "added"}:\n${JSON.stringify(result, null, 2)}`);
      setFormData({ title: "", url: "", description: "", likes: 0, dislikes: 0 });
      setEditMode(false);
      setEditId(null);
      fetchVideos();
      setActiveSection("videos");
    } catch (err) {
      alert("❌ Failed to save video.");
    }
  };

  const handleEdit = (video) => {
    setFormData(video);
    setEditMode(true);
    setEditId(video._id);
    setActiveSection("add");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/videos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      alert("✅ Video deleted");
      fetchVideos();
    } catch (err) {
      alert("❌ Failed to delete video.");
    }
  };

  const deleteCollaboration = async (id) => {
    if (!window.confirm("Are you sure you want to delete this collaboration?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/collaborations/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      alert("✅ Collaboration deleted");
      fetchCollaborations();
    } catch (err) {
      alert("❌ Failed to delete collaboration.");
    }
  };

  const getTopVideo = (videos, key) =>
    [...videos].sort((a, b) => b[key] - a[key])[0];

  const OverviewCard = ({ title, value }) => (
    <div
      style={{
        flex: "1 1 250px",
        background: "#1e1e1e",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 0 8px rgba(0, 247, 255, 0.1)",
      }}
    >
      <h3 style={{ color: "#00f7ff", marginBottom: "0.5rem" }}>{title}</h3>
      <p style={{ fontSize: "1.2rem", color: "#fff" }}>{value}</p>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0d0d0d", color: "#fff" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          background: "#111",
          padding: "2rem 1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          boxShadow: "2px 0 10px rgba(0, 247, 255, 0.1)",
        }}
      >
        <h2 style={{ color: "#00f7ff", fontSize: "1.5rem", borderBottom: "1px solid #00f7ff", paddingBottom: "1rem" }}>
          Dashboard
        </h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <button onClick={() => setActiveSection("overview")} style={linkStyle}>📊 Overview</button>
          <button onClick={() => setActiveSection("videos")} style={linkStyle}>🎬 Videos</button>
          <button onClick={() => setActiveSection("add")} style={linkStyle}>➕ Add Video</button>
          <button onClick={() => setActiveSection("collaborations")} style={linkStyle}>🤝 Collaborations</button>
          <a href="/" style={linkStyle}>🚪 Logout</a>
        </nav>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "2rem" }}>
        {activeSection === "overview" && (
          <>
            <h1 style={{ fontSize: "2rem", color: "#00f7ff", marginBottom: "1rem" }}>📊 Admin Overview</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <OverviewCard title="Total Videos" value={videos.length} />
              <OverviewCard title="Total Likes" value={videos.reduce((sum, v) => sum + v.likes, 0)} />
              <OverviewCard title="Total Dislikes" value={videos.reduce((sum, v) => sum + v.dislikes, 0)} />
              {videos.length > 0 && (
                <>
                  <OverviewCard
                    title="Most Liked Video"
                    value={`"${getTopVideo(videos, "likes").title}" (${getTopVideo(videos, "likes").likes} 👍)`}
                  />
                  <OverviewCard
                    title="Most Disliked Video"
                    value={`"${getTopVideo(videos, "dislikes").title}" (${getTopVideo(videos, "dislikes").dislikes} 👎)`}
                  />
                  <OverviewCard
                    title="Latest Added"
                    value={`"${videos[videos.length - 1].title}"`}
                  />
                </>
              )}
            </div>
          </>
        )}

        {activeSection === "videos" && (
          <>
            <h1 style={{ fontSize: "2rem", color: "#00f7ff", marginBottom: "1rem" }}>🎬 All Videos</h1>
            {videos.length === 0 ? (
              <p>No videos found.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {videos.map((video) => {
                  const videoIdMatch = video.url.match(/(?:\/embed\/|watch\?v=|youtu\.be\/)([^?&/]+)/);
                  const videoId = videoIdMatch ? videoIdMatch[1] : null;
                  return (
                    <div key={video._id} style={{ border: "1px solid #333", padding: "1rem", borderRadius: "8px" }}>
                      <h3>{video.title}</h3>
                      <p>{video.description}</p>
                      <p>👍 {video.likes} | 👎 {video.dislikes}</p>

                      {videoId ? (
                        <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                            alt="YouTube thumbnail"
                            style={{ width: "100%", maxWidth: "400px", borderRadius: "8px", marginTop: "0.5rem" }}
                          />
                        </a>
                      ) : (
                        <p style={{ color: "red" }}>Invalid YouTube URL</p>
                      )}

                      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                        <button onClick={() => handleEdit(video)} style={submitStyle}>✏️ Update</button>
                        <button onClick={() => handleDelete(video._id)} style={{ ...submitStyle, background: "#ff4b4b", color: "#fff" }}>🗑️ Delete</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {activeSection === "add" && (
          <>
            <h1 style={{ fontSize: "2rem", color: "#00f7ff", marginBottom: "1rem" }}>
              {editMode ? "✏️ Edit Video" : "➕ Add New Video"}
            </h1>
            <form
              onSubmit={handleSubmit}
              style={{ maxWidth: "500px", display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <input type="text" name="title" placeholder="Video Title" value={formData.title} onChange={handleChange} required style={inputStyle} />
              <input type="text" name="url" placeholder="YouTube Video URL" value={formData.url} onChange={handleChange} required style={inputStyle} />
              <textarea name="description" placeholder="Video Description" value={formData.description} onChange={handleChange} rows="4" required style={{ ...inputStyle, resize: "vertical" }} />
              <div style={{ display: "flex", gap: "1rem" }}>
                <input type="number" name="likes" value={formData.likes} onChange={handleChange} min="0" style={{ ...inputStyle, width: "50%" }} placeholder="👍 Likes" />
                <input type="number" name="dislikes" value={formData.dislikes} onChange={handleChange} min="0" style={{ ...inputStyle, width: "50%" }} placeholder="👎 Dislikes" />
              </div>
              <button type="submit" style={submitStyle}>
                {editMode ? "✅ Update Video" : "✅ Submit Video"}
              </button>
            </form>
          </>
        )}

        {activeSection === "collaborations" && (
          <CollaborationsSection
            collaborations={collaborations}
            handleDelete={deleteCollaboration}
          />
        )}
      </main>
    </div>
  );
};

// Styles
const inputStyle = {
  padding: "0.7rem",
  borderRadius: "8px",
  border: "none",
  background: "#1e1e1e",
  color: "#fff",
  fontSize: "1rem",
};

const submitStyle = {
  padding: "0.8rem",
  background: "#00f7ff",
  color: "#000",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background 0.3s",
};

const linkStyle = {
  background: "none",
  border: "none",
  textAlign: "left",
  padding: "0",
  color: "#ccc",
  textDecoration: "none",
  fontWeight: "500",
  cursor: "pointer",
};

export default FormPage;
