const errGen = require("../../../config/errGen");
const userModel = require("../../../Models/userModel");

module.exports = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) {
      return next(errGen("password must be provided"));
    }
    const user = await userModel.find();
    if (!user.length) {
      return next(errGen("user does not exist"));
    }
    if (password !== user[0].password) {
      return next(errGen("incorrect password"));
    }
    return res.json({ data: user[0]._id , err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
