const { v4: uuid } = require("uuid");
const passcodeModel = require("../../../Models/passcodeModel");
const errGen = require("../../../config/errGen");

module.exports = async (req, res, next) => {
  try {
    const key = uuid();
    const passcode = await passcodeModel.create({ key });
    return res.json({ data: passcode, err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
