const errGen = require("../../../config/errGen");
const toPdf = require("../../../Utils/toPdf");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
      const state = await toPdf(id);
      return res.json({state})
  } catch (error) {
    return next(errGen(error.message || "something went wrong"));
  }
};
