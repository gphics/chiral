const errGen = require("../../../config/errGen");
const briefModel = require("../../../Models/briefModel");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return next(errGen("id must be provided"));
    }
    const obj = await briefModel.findById(id);
    if (!obj) {
      return next(errGen("brief does not exist"));
    }
    res.render("brief", {obj});
  } catch (error) {
    return next(errGen(error.message || "something went wrong"));
  }
};
