const express = require("express");
const passcodeCtrl = require("../Controllers/passcodeCtrl");

const passcodeRouter = express.Router();
passcodeCtrl.forEach(({ method, url, action, mid }) => {
  if (mid) {
    passcodeRouter[method](url, ...mid, action);
  } else {
    passcodeRouter[method](url, action);
  }
});

module.exports = passcodeRouter;
