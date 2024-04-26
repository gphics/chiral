const errGen = require("../../../config/errGen");
const briefModel = require("../../../Models/briefModel");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brief = await briefModel.findById(id);
    if (!brief) {
      return next(errGen("brief does not exist"));
    }
    return res.json({ data: brief, err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
