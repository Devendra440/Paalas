const Video = require('../models/VideoModel');

// POST: Create new video
exports.createVideo = async (req, res) => {
  try {
    const video = new Video(req.body);
    const saved = await video.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to create video", details: err.message });
  }
};

// GET: Get all videos
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

// PUT: Update video by ID
exports.updateVideo = async (req, res) => {
  try {
    const updated = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update video" });
  }
};

// DELETE: Delete video by ID
exports.deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete video" });
  }
};
