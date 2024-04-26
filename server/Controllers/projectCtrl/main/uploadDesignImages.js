const { configuredCloudinary } = require("../../../config/cloudinaryConfig");
const errGen = require("../../../config/errGen");
const projectModel = require("../../../Models/projectModel");
 
module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectModel.findById(id);
    if (!project) {
      return next(errGen("brief does not exist", 404));
    }
    const { files } = req;
    if (!files || !files.length) {
      return next(errGen("images must be uploaded"));
    }
    // size check
    const sizeLimit = process.env.FILE_SIZE_LIMIT;
    files.forEach((file) => {
      if (file.size > sizeLimit) {
        return next(
          errGen(`The size for ${file.originalname} image is greater than 2MB`)
        );
      }
    });
    const imagePromises = files.map(async (file) => {
      return await configuredCloudinary.uploader.upload(file.path, {
        folder: "chiral/designImages",
      });
    });
    const result = await Promise.allSettled(imagePromises);
    const final = result.map((item) => {
      return { public_id: item.value.public_id, url: item.value.secure_url };
    });
    project.designs = final;
    await project.save();
    res.json({ data: "images uploaded", err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
