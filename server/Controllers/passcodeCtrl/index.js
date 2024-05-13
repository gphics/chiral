const createPasscode = require("./main/createPasscode");
const deletePasscode = require("./main/deletePasscode");
const getPasscode = require("./main/getPasscode");
const getPasscodes = require("./main/getPasscodes");
const updatePasscode = require("./main/updatePasscode");

const passcodeCtrl = [
  {
    action: createPasscode,
    mid: null,
    url: "/create",
    method: "get",
  },
  {
    action: getPasscodes,
    mid: null,
    url: "",
    method: "get",
  },
  {
    action: updatePasscode,
    mid: null,
    url: "/:id",
    method: "put",
  },
  ,
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
