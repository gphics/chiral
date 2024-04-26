const errGen = require("../../../config/errGen");
const briefModel = require("../../../Models/briefModel");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBrief = await briefModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.json({ data: updatedBrief });
  } catch (error) {
    return next(errGen(error.message));
  }
};
