const createPasscode = require("./main/createPasscode");
const deletePasscode = require("./main/deletePasscode");
const getPasscode = require("./main/getPasscode");
const getPasscodes = require("./main/getPasscodes");
const updatePasscode = require("./main/updatePasscode");

const passcodeCtrl = [
  {
    action: createPasscode,
    mid: null,
    url: "/create-passcode",
    method: "get",
  },
  {
    action: updatePasscode,
    mid: null,
    url: "/update-passcode/:id",
    method: "put",
  },
  ,
  {
    action: getPasscodes,
    mid: null,
    url: "",
    method: "get",
  },
  {
    action: getPasscode,
    mid: null,
    url: "/:key",
    method: "get",
  },
  {
    action: deletePasscode,
    mid: null,
    url: "/:id",
    method: "delete",
  },
];
module.exports = passcodeCtrl;
