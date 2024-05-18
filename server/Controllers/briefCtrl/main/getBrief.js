const { configuredCloudinary } = require("../../../config/cloudinaryConfig");
const errGen = require("../../../config/errGen");
const briefModel = require("../../../Models/briefModel");
const pdfModel = require("../../../Models/pdfModel");
const toDate = require("../../../Utils/toDate");
const toPdf = require("../../../Utils/toPdf");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brief = await briefModel.findById(id);
    return res.json({data:brief, err:null})
    if (!brief) {
      return next(errGen("brief does not exist"));
    }
    let pdf = await pdfModel.findOne({ briefId: id });
    let isUpdated = false;
    {
      if (pdf && toDate(brief.updatedAt) > toDate(pdf.updatedAt)) {
        isUpdated = true;
      }
    }
   
    if (isUpdated) {
      await configuredCloudinary.uploader.destroy(pdf.public_id);
    }
    if (isUpdated || !pdf) {
      const result = await toPdf(id);
      if (result) {
        const cloud = await configuredCloudinary.uploader.upload(
          "public/uploads/brief.pdf",
          { folder: "chiral/briefPdf" }
        );
        const { public_id, secure_url: url } = cloud;
        pdf = await pdfModel.create({ briefId: id, public_id, url });
      }
    }

    return res.json({ data: {brief, pdf}, err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
