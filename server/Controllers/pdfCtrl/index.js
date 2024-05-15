const briefPage = require("./main/briefPage");
const createBriefPdf = require("./main/createBriefPdf");


module.exports = [
  {
    action: briefPage,
    mid: null,
    url: "/brief",
    method: "get",
  },
  {
    action: createBriefPdf,
    mid: null,
    url: "/:id",
    method: "get",
  },
];