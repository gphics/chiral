const errGen = require("../../../config/errGen");
const userModel = require("../../../Models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.find();
    const data = user[0] ? user[0] : null;
    const err = data ? null : { message: "mgt user does not exist" };
    return res.json({ data, err });
  } catch (error) {
    return next(errGen(error.message));
  }
};
