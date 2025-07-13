const Collaboration = require("../models/Collaboration");

// POST a new collaboration
exports.createCollaboration = async (req, res) => {
  try {
    const collab = new Collaboration(req.body);
    await collab.save();
    res.status(201).json(collab);
  } catch (err) {
    res.status(400).json({ error: "Failed to submit collaboration request" });
  }
};

// GET all collaborations
exports.getCollaborations = async (req, res) => {
  try {
    const collaborations = await Collaboration.find().sort({ createdAt: -1 });
    res.json(collaborations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch collaborations" });
  }
};

// PUT - update collaboration status (Accepted / Rejected)
exports.updateCollaborationStatus = async (req, res) => {
  try {
    const updated = await Collaboration.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
};
