const { configuredCloudinary } = require("../../../config/cloudinaryConfig");
const errGen = require("../../../config/errGen");
const briefModel = require("../../../Models/briefModel");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { image_id } = req.query;
    const brief = await briefModel.findById(id);
    if (!brief) {
      return next(errGen("brief does not exist", 404));
    }
    if (!image_id) {
      return next(errGen("image id must be provided"));
    }
    const checkImageId = brief.brandVisuals.find(
      (elem) => elem.public_id === image_id
    );
    if (!checkImageId) {
      return next(errGen("Image does not exist"));
    }
    await configuredCloudinary.uploader.destroy(image_id);
    const filtered = brief.brandVisuals.filter(
      (elem) => elem.public_id !== image_id
    );
    brief.brandVisuals = filtered;
    await brief.save();
    res.json({ data: "image deleted", err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
