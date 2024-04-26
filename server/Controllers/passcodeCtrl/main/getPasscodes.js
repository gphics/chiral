const passcodeModel = require("../../../Models/passcodeModel");

module.exports = async (req, res, next) => {
  const passcodes = await passcodeModel.find();
  return res.json({ data: passcodes, err: null });
};
