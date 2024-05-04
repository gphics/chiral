const errGen = require("../../../config/errGen");
const briefModel = require("../../../Models/briefModel");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brief = await briefModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.json({ data: {_id: brief._id}, err:null});
  } catch (error) {
    return next(errGen(error.message));
  }
};
 