const errGen = require("../../../config/errGen");
const briefModel = require("../../../Models/briefModel");
const projectModel = require("../../../Models/projectModel");

module.exports = async (req, res, next) => {
  try {
    const { type } = req.body;
    const { id } = req.params;
    const project = await projectModel
      .findByIdAndUpdate(
        id,
        { ...req.body },
        {
          new: true,
        }
      )
      .populate("brief");

    if (!project) {
      return next(errGen("project does not exist"));
    }
    if (type) {
      const { _id: id } = project.brief;
      const x = await briefModel.findByIdAndUpdate(
        id,
        { jobType: type },
        { new: true }
      );
    }
    return res.json({ data: project, err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
