const errGen = require("../../../config/errGen");
const briefModel = require("../../../Models/briefModel");
const passcodeModel = require("../../../Models/passcodeModel");
const projectModel = require("../../../Models/projectModel");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProject = await projectModel.findByIdAndDelete(id);
    if (!deletedProject) {
      return next(errGen("project does not exist"));
    }
    await passcodeModel.findOneAndDelete({ projectId: id });
    await briefModel.findByIdAndDelete(deletedProject.brief);
    return res.json({ data: "project deleted successfully", err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
