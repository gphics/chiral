const { configuredCloudinary } = require("../../../config/cloudinaryConfig");
const errGen = require("../../../config/errGen");
const projectModel = require("../../../Models/projectModel");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { image_id } = req.query;
    const project = await projectModel.findById(id);

    if (!project) {
      return next(errGen("brief does not exist", 404));
    }
    if (!image_id) {
      return next(errGen("image id must be provided"));
    }
    // console.log(image_id);
    const checkImageId = project.designs.find(
      (elem) => elem.public_id === image_id
    );
    if (!checkImageId) {
      return next(errGen("Image does not exist"));
    }
    await configuredCloudinary.uploader.destroy(image_id);
    const filtered = project.designs.filter(
      (elem) => elem.public_id !== image_id
    );
    project.designs = filtered;
    await project.save();
    res.json({ data: "image deleted", err: null });

    res.json({});
  } catch (error) {
    return next(errGen(error.message));
  }
};
