const errGen = require("../../../config/errGen");
const userModel = require("../../../Models/userModel");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!updatedUser) {
      return next(errGen("user does not exist"));
    }

    return res.json({ data: updatedUser, err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
