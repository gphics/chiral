const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    isUsed: { type: Boolean, default: false },
    isLocked: { type: Boolean, default: false },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "project" },
  }, 
  { timestamps: true }
);

const passcodeModel = mongoose.model("passcode", schema);
passcodeModel.un;
module.exports = passcodeModel;
