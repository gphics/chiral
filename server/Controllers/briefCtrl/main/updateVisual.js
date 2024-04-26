const briefModel = require("../../../Models/briefModel");
const { configuredCloudinary } = require("../../../config/cloudinaryConfig");
const errGen = require("../../../config/errGen");

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
    const { file } = req;
    if (!file) {
      return next(errGen("new image must be uploaded"));
    }
    // size check
    const sizeLimit = process.env.FILE_SIZE_LIMIT;
    if (file.size > sizeLimit) {
      return next(
        errGen(`The size for ${file.originalname} image is greater than 2MB`)
      );
    }
    await configuredCloudinary.uploader.destroy(image_id);
    const first = await configuredCloudinary.uploader.upload(file.path, {
      folder: "chiral/brandvisuals",
    });
    const { public_id, secure_url: url } = first;
    const filtered = brief.brandVisuals.filter(
      (elem) => elem.public_id !== image_id
    );
    brief.brandVisuals = [...filtered, { url, public_id }];
    await brief.save();
    res.json({ data: "image updated", err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
