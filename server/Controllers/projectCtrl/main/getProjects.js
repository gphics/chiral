const errGen = require("../../../config/errGen");
const projectModel = require("../../../Models/projectModel");

module.exports = async (req, res, next) => {
  try {
    const projects = await projectModel.find().populate("brief").sort({createdAt:-1});
    return res.json({ data: projects, err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
