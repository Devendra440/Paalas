const express = require('express');
const router = express.Router();
const {
  createVideo,
  getVideos,
  updateVideo,
  deleteVideo,
} = require('../controllers/videoController');

// Routes
router.post('/', createVideo);      // POST /api/videos
router.get('/', getVideos);         // GET /api/videos
router.put('/:id', updateVideo);    // PUT /api/videos/:id
router.delete('/:id', deleteVideo); // DELETE /api/videos/:id

module.exports = router;
