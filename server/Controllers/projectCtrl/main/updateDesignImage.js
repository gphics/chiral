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
    const checkImageId = project.designs.find(
      (elem) => elem.public_id === image_id
    );
    if (!checkImageId) {
      return next(errGen("Image does not exist"));
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
      folder: "chiral/designImages",
    });
    const { public_id, secure_url: url } = first;
    const filtered = project.designs.filter(
      (elem) => elem.public_id !== image_id
    );
    project.designs = [...filtered, { url, public_id }];
    await project.save();
    res.json({ data: "image updated", err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
