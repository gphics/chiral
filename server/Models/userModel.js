const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    fullname: String,
    password: String,
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", schema);

module.exports = userModel;
