const { upload } = require("../../config/cloudinaryConfig");
const createBrief = require("./main/createBrief");
const deleteBrief = require("./main/deleteBrief");
const deleteImage = require("./main/deleteImage");
const getBrief = require("./main/getBrief");
const getBriefs = require("./main/getBriefs");
const updateBrief = require("./main/updateBrief");
const updateVisual = require("./main/updateVisual");
const uploadVisuals = require("./main/uploadVisuals");

const briefCtrl = [
  { action: getBriefs, mid: null, url: "", method: "get" },
  { action: createBrief, mid: null, url: "", method: "post" },
  {
    action: uploadVisuals,
    mid: [upload.array("files")],
    url: "/upload-visuals/:id",
    method: "post",
  },
  {
    action: updateVisual,
    mid: [upload.single("file")],
    url: "/update-visual/:id",
    method: "put",
  },
  {
    action: deleteImage,
    mid: null,
    url: "/delete-visual/:id",
    method: "delete",
  },
  { action: getBrief, mid: null, url: "/:id", method: "get" },
  { action: updateBrief, mid: null, url: "/:id", method: "put" },
  { action: deleteBrief, mid: null, url: "/:id", method: "delete" },
];
module.exports = briefCtrl;
