const errGen = require("../../../config/errGen");
const projectModel = require("../../../Models/projectModel");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectModel.findById(id).populate("brief");
    if (!project) {
      return next(errGen("project does not exist"));
    }
    return res.json({ data: project, err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
