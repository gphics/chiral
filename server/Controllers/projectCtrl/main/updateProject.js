const errGen = require("../../../config/errGen");
const projectModel = require("../../../Models/projectModel");

module.exports = async (req, res, next) => {
  try {
    const project = await projectModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!project) {
      return next(errGen("project does not exist"));
    }
    return res.json({ data: project, err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
