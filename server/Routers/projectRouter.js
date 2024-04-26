const express = require("express");
const projectCtrl = require("../Controllers/projectCtrl");

const projectRouter = express.Router();
projectCtrl.forEach(({ method, url, action, mid }) => {
  if (mid) {
    projectRouter[method](url, ...mid, action);
  } else {
    projectRouter[method](url, action);
  }
});

module.exports = projectRouter;
