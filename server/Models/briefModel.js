const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    brandName: { type: String, required: true },
    brandServices: { type: String, required: true },
    brandContact: { type: Number, required: true },
    brandColors: { type: String, default: null },
    brandValues: { type: Number, default: null },
    brandEmail: { type: String, required: true },
    brandLocation: { type: String, required: true },
    brandDescription: { type: String, required: true },
    jobDescription: { type: String, required: true },
    brandVisuals: { type: Array },
    // client
    clientContact: { type: Number, required: true },
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientLocation: { type: String, required: true },
  },
  { timestamps: true }
);

const briefModel = mongoose.model("brief", schema);

module.exports = briefModel;
