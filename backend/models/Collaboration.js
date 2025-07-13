const mongoose = require("mongoose");

const collaborationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  collabType: { type: String, required: true },
  startDate: String,
  portfolio: String,
  hoursPerWeek: Number,
  sampleLink: { type: String, required: true },
  message: String,
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending"
  },
}, { timestamps: true });

module.exports = mongoose.model("Collaboration", collaborationSchema);
