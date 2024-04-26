const errGen = require("../../../config/errGen");
const userModel = require("../../../Models/userModel");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return next(errGen("user does not exist"));
    }
    res.json({ data: "user deleted", err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
