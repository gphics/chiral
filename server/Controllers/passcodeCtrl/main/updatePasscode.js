const errGen = require("../../../config/errGen");
const passcodeModel = require("../../../Models/passcodeModel");

/**
 *
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * @description The req.body can have the following optional params(isLocked:Boolean, isUsed:Boolean, projectId:String)
 * @returns {object}
 */
 
module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const { isLocked, projectId, isUsed } = req.body;
    console.log(req.body)
    
    const passcode = await passcodeModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    console.log(passcode)
    if (!passcode) {
      return next(errGen("invalid passcode", 404));
    }
    return res.json({ passcode });
    
  } catch (error) {
    //   console.log("I AM THE ERROR", error)
    return next(errGen(error.message));
  }
};
