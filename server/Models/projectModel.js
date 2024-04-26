const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    brief: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "brief",
    },
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ["design", "webApp"] },
    cost: { type: Number, default: 0 },
    webUrl: { type: Array },
    designs: { type: Array },
    techStacks: { type: Array },
    deploymentPlatforms: { type: Array },
  },
  { timestamps: true }
);

const projectModel = mongoose.model("project", schema);

module.exports = projectModel;
