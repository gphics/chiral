const errGen = require("../../../config/errGen");
const passcodeModel = require("../../../Models/passcodeModel");
const projectModel = require("../../../Models/projectModel");

module.exports = async (req, res, next) => {
  try {
    const { key } = req.params;
    if (!key) {
      return next("id param must be provided");
    }
    const passcode = await passcodeModel.findOne({ key });
    const project = await projectModel
      .findById(passcode.projectId)
      .populate("brief");
    const { brief: prevBrief } = project;
    const des = JSON.parse(JSON.stringify(prevBrief));
    const brief = { ...des, jobType: project.type };
    // console.log(brief);

    if (!passcode) {
      return next(errGen("passcode does not exist", 404));
    }
    return res.json({ data: { passcode, brief }, err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
