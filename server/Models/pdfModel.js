const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    briefId: { ref: "brief", type: mongoose.Schema.Types.ObjectId },
    url: String,
    public_id: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("pdf", schema);
