const errGen = require("../../../config/errGen");
const userModel = require("../../../Models/userModel");

module.exports = async (req, res, next) => {
  try {
    const { fullname, password } = req.body;
    if (!password) {
      return next(errGen("password must be provided"));
    }
    if (password.length < 6) {
      return next(errGen("password length must be greater than 5"));
    }
    if (!fullname) {
      return next(errGen("fullname must be provided"));
    }
    const checkUser = await userModel.find();
    if (checkUser.length) {
      return next(errGen("admin user already exist"));
    }
    const user = await userModel.create({ fullname, password });
    return res.json({ data: user, err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
