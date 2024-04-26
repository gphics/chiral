const errGen = require("../../../config/errGen");
const passcodeModel = require("../../../Models/passcodeModel");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next("id param must be provided");
    }
    const passcode = await passcodeModel.findById(id);
    if (!passcode) {
      return next(errGen("passcode does not exist", 404));
    }
    return res.json({ data: passcode, err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
