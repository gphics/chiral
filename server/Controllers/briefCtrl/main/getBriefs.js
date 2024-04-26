const errGen = require("../../../config/errGen");
const briefModel = require("../../../Models/briefModel");

module.exports = async (req, res, next) => {
  try {
    const briefs = await briefModel.find();
    return res.json({ data: briefs, err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
