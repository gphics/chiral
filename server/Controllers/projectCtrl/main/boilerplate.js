const errGen = require("../../../config/errGen");
const briefModel = require("../../../Models/briefModel");
const passcodeModel = require("../../../Models/passcodeModel");
const projectModel = require("../../../Models/projectModel");

module.exports = async (req, res, next) => {
  try {
  } catch (error) {
    return next(errGen(error.message));
  }
};
