const passcodeModel = require("../../../Models/passcodeModel");

module.exports = async (req, res, next) => {
  const passcodes = await passcodeModel.find().sort({updatedAt:-1});
  return res.json({ data: passcodes, err: null });
};
