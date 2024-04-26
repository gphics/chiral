const errGen = require("../../../config/errGen");
const briefModel = require("../../../Models/briefModel");
const passcodeModel = require("../../../Models/passcodeModel");
const projectModel = require("../../../Models/projectModel");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBrief = await briefModel.findByIdAndDelete(id);
    if (!deletedBrief) {
      return next(errGen("brief does not exist"));
    }
    const deletedProject = await projectModel.findOneAndDelete({ brief: id });
    await passcodeModel.findOneAndDelete({ projectId: deletedProject._id });
    return res.json({ data: "brief deleted", err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
