const express = require("express");
const briefCtrl = require("../Controllers/briefCtrl");

const briefRouter = express.Router();
briefCtrl.forEach(({ method, url, action, mid }) => {
  if (mid) {
    briefRouter[method](url, ...mid, action);
  } else {
    briefRouter[method](url, action);
  }
});

module.exports = briefRouter;
