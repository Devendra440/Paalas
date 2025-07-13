const express = require("express");
const router = express.Router();
const {
  createCollaboration,
  getCollaborations,
  updateCollaborationStatus,
} = require("../controllers/collaborationController");

// Routes
router.post("/", createCollaboration);       // Create a new collaboration
router.get("/", getCollaborations);          // Get all collaborations
router.put("/:id", updateCollaborationStatus); // Update collaboration status

module.exports = router;
