const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    brief: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brief",
    },
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ["design", "software"] },
    cost: { type: Number, default: 0 },
    webUrls: { type: Array },
    status: {
      type: String,
      default: "ongoing",
      enum: ["completed", "ongoing"],
    },
    designs: { type: Array },
    techStacks: { type: Array },
    deploymentPlatforms: { type: Array },
  },
  { timestamps: true }
);

const projectModel = mongoose.model("project", schema);

module.exports = projectModel;
