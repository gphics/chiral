const errGen = require("../../../config/errGen");
const briefModel = require("../../../Models/briefModel");
const projectModel = require("../../../Models/projectModel");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id)
    const { jobType} = req.body;
    // const brief = await briefModel.findByIdAndUpdate(
    //   id,
    //   { ...req.body },
    //   { new: true }
    // );
    const brief =  await briefModel.findById(id)
    if (!brief) {
      return res.json({data:null, err:{message:"brief does not exist"}})
    }
    if (jobType) {
      await projectModel.findOneAndUpdate({ brief: id }, { type: jobType });
    }
    return res.json({ data: { _id: brief._id }, err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
