const createUser = require("./main/createUser");
const deleteUser = require("./main/deleteUser");
const getUser = require("./main/getUser");
const updateUser = require("./main/updateUser");
const userLogin = require("./main/userLogin");

const userCtrl = [
  { action: createUser, mid: null, url: "", method: "post" },
  { action: getUser, mid: null, url: "", method: "get" },
  { action: userLogin, mid: null, url: "/login", method: "post" },
  { action: deleteUser, mid: null, url: "/:id", method: "delete" },
  { action: updateUser, mid: null, url: "/:id", method: "put" },
];
module.exports = userCtrl;
