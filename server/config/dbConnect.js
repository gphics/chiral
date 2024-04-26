const mongoose = require("mongoose");
module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB CONNECTED");
  } catch (error) {
    throw new Error(error.message);
  }
};
