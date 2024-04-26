const errGen = require("../../../config/errGen");
const briefModel = require("../../../Models/briefModel");
const passcodeModel = require("../../../Models/passcodeModel");
const projectModel = require("../../../Models/projectModel");

/*
The following are done in this route:
    creat a brief
    create a project
    update passcode
    ** jobType === design || webApp
*/
module.exports = async (req, res, next) => {
  try {
    const { key } = req.query;
    if (!key) {
      return next(errGen("key must be provided"));
    }
    const passcode = await passcodeModel.findOne({ key });
    if (!passcode) {
      return next(errGen("invalid passcode"));
    }
    if (passcode.isUsed) {
      return next(errGen("passcode is already used"));
    }
    const {
      brandName,
      brandServices,
      brandContact,
      brandEmail,
      brandLocation,
      brandValues,
      brandColors,
      brandDescription,
      jobDescription,
      clientName,
      clientContact,
      clientEmail,
      clientLocation,
      jobType,
    } = req.body;
    const checkArr = [
      { name: "brandName", value: brandName },
      { name: "jobType", value: jobType },
      { name: "brandContact", value: brandContact },
      { name: "brandEmail", value: brandEmail },
      { name: "brandServices", value: brandServices },
      { name: "brandDescription", value: brandDescription },
      { name: "jobDescription", value: jobDescription },
      { name: "brandLocation", value: brandLocation },
      { name: "clientLocation", value: clientLocation },
      { name: "clientName", value: clientName },
      { name: "clientEmail", value: clientEmail },
      { name: "clientContact", value: clientContact },
    ];
    checkArr.forEach(({ name, value }) => {
      if (!value) {
        return next(errGen(`${name} is required`));
      }
    });
    const brief = await briefModel.create({
      brandName,
      brandServices,
      brandContact,
      brandEmail,
      brandLocation,
      brandDescription,
      jobDescription,
      clientName,
      clientContact,
      clientEmail,
      clientLocation,
      brandValues,
      brandColors,
    });
    const project = await projectModel.create({
      brief: brief._id,
      name: `${brandName} project`,
      type: jobType,
    });
    passcode.isLocked = true;
    passcode.isUsed = true;
    passcode.projectId = project._id;
    await passcode.save();
    return res.json({ data: { id: brief._id }, err: null });
  } catch (error) {
    return next(errGen(error.message));
  }
};
