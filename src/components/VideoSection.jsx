import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import likeSound from "./LikeButton.mp3";
import "./VideoSection.css";

const VideoSection = () => {
  const [videos, setVideos] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [visibleDesc, setVisibleDesc] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);

  const navigate = useNavigate();
  const clickSound = new Audio(likeSound);
  clickSound.volume = 0.4;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/videos");
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);

  const getYouTubeId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleLike = async (index, id) => {
    clickSound.play();
    const updated = [...videos];
    updated[index].likes++;
    setVideos(updated);

    try {
      await fetch(`http://localhost:5000/api/videos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: updated[index].likes }),
      });
    } catch {
      alert("Failed to update likes.");
    }
  };

  const handleDislike = async (index, id) => {
    clickSound.play();
    const updated = [...videos];
    updated[index].dislikes++;
    setVideos(updated);

    try {
      await fetch(`http://localhost:5000/api/videos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dislikes: updated[index].dislikes }),
      });
    } catch {
      alert("Failed to update dislikes.");
    }
  };

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "admin@deva") {
      alert("Login successful!");
      setShowLogin(false);
      setEmail("");
      setPassword("");
      setError("");
      navigate("/form");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <>
      <section className="video-section">
        <h2 className="video-title">🎬 My Videos</h2>
        <div className="video-container">
          <div className="video-grid">
            {videos.map((video, index) => {
              const videoId = getYouTubeId(video.url);
              const thumbnailUrl = videoId
                ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                : null;

              return (
                <div key={video._id} className="video-card">
                  <div className="video-thumbnail">
                    {thumbnailUrl ? (
                      <img src={thumbnailUrl} alt={`Thumbnail for ${video.title}`} />
                    ) : (
                      <div className="invalid-thumbnail">Invalid Thumbnail</div>
                    )}
                  </div>
                  <div className="video-info">
                    <h3>{video.title}</h3>
                    <div className="button-group">
                      <button
                        className="like-btn"
                        onClick={() => handleLike(index, video._id)}
                      >
                        👍 {video.likes}
                      </button>
                      <button
                        className="dislike-btn"
                        onClick={() => handleDislike(index, video._id)}
                      >
                        👎 {video.dislikes}
                      </button>
                    </div>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="youtube-link"
                    >
                      🔗 Watch on YouTube
                    </a>
                    <button
                      className="story-btn"
                      onClick={() =>
                        setSelectedStory({
                          title: video.title,
                          description: video.description,
                          url: video.url,
                        })
                      }
                    >
                      📖 Dive Into Story
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <button className="add-button" onClick={() => setShowLogin(true)}>+</button>

      {showLogin && (
        <div className="lightbox-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <span className="lightbox-close" onClick={() => setShowLogin(false)}>×</span>
            <h3>Login</h3>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error-text">{error}</p>}
            <button className="login-btn" onClick={handleLogin}>Login</button>
          </div>
        </div>
      )}

      {/* Story Modal */}
      {selectedStory && (
        <div className="story-popup-overlay" onClick={() => setSelectedStory(null)}>
          <div className="story-popup" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setSelectedStory(null)}>×</button>
            <h2 className="story-popup-title">{selectedStory.title}</h2>
            <p className="story-popup-desc">{selectedStory.description}</p>
            <a
              href={selectedStory.url}
              target="_blank"
              rel="noopener noreferrer"
              className="story-popup-link"
            >
              🔗 Watch on YouTube
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoSection;
